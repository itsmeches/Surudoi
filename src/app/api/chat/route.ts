/**
 * POST /api/chat
 *
 * Streaming chat endpoint backed by Groq (Llama 3.3 70B).
 *
 * - Server-only. GROQ_API_KEY must be set in .env.local — NEVER expose it
 *   to the client.
 * - System prompt is injected here so a malicious client cannot replace it.
 * - In-memory IP throttle keeps abuse cheap. Swap for Upstash Redis if you
 *   ever ship multi-instance.
 * - Node runtime (not Edge) so the in-memory rate-limit map persists across
 *   requests on the same instance.
 */

import { NextResponse } from "next/server";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { groq } from "@ai-sdk/groq";
import { PERSONA_SYSTEM_PROMPT } from "@/lib/persona";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// --- Simple per-IP rate limit ----------------------------------------------
// 20 requests per 10-minute window. Generous for a real visitor, painful
// for a scraper. Replace with Upstash Ratelimit before you go viral.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function rateLimit(ip: string) {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_REQUESTS - 1 };
  }
  if (bucket.count >= MAX_REQUESTS) {
    return { ok: false, remaining: 0, retryAfterMs: bucket.resetAt - now };
  }
  bucket.count += 1;
  return { ok: true, remaining: MAX_REQUESTS - bucket.count };
}

// --- Handler ---------------------------------------------------------------
export async function POST(req: Request) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "Chat is not configured. Missing GROQ_API_KEY." },
      { status: 503 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anonymous";

  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many messages. Try again in a few minutes." },
      { status: 429 }
    );
  }

  let payload: { messages?: UIMessage[] };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const messages = payload.messages ?? [];
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }
  // Defensive cap — context never exceeds ~16 turns.
  if (messages.length > 32) {
    return NextResponse.json({ error: "Conversation too long." }, { status: 413 });
  }

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: groq("groq/compound-mini"),
    system: PERSONA_SYSTEM_PROMPT,
    messages: modelMessages,
    temperature: 0.3,
    // Keep replies short. Visitors are skimming, not reading.
    maxOutputTokens: 320,
  });

  return result.toUIMessageStreamResponse();
}
