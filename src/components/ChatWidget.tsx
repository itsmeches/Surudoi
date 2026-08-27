"use client";

/**
 * ChatWidget
 *
 * Floating "Ask Chester" assistant, bottom-right.
 *
 * UI principles (logic unchanged from previous revision):
 *  - Matches the site design system (.surface, accent, eyebrow, chrome-in).
 *  - Default CLOSED. Never auto-opens.
 *  - Streaming responses via Vercel AI SDK + Groq.
 *  - Plain-text rendering only — markdown is a prompt-injection vector and
 *    adds noise to short answers.
 *  - ESC closes. Focus moves to input on open and back to the trigger on
 *    close. Reduced-motion safe.
 */

import { useChat } from "@ai-sdk/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const SUGGESTIONS = [
  "What's Chester's strongest project?",
  "Is he available for internships?",
  "What ML stack does he use?",
];

const extractText = (parts: unknown): string => {
  if (!Array.isArray(parts)) return "";
  return parts
    .filter(
      (p): p is { type: string; text: string } =>
        typeof p === "object" &&
        p !== null &&
        (p as { type?: unknown }).type === "text" &&
        typeof (p as { text?: unknown }).text === "string"
    )
    .map((p) => p.text)
    .join("");
};

// Small monogram chip — used in the header and beside assistant replies
// to give the conversation an identifiable "speaker".
const Monogram = ({ size = 24 }: { size?: number }) => (
  <span
    aria-hidden
    className="
      inline-flex items-center justify-center rounded-full
      bg-gradient-to-br from-accent to-accent-alt
      text-bg font-semibold tracking-tight
      shadow-[0_4px_14px_-4px_rgb(var(--accent)/0.6)]
    "
    style={{
      width: size,
      height: size,
      fontSize: Math.round(size * 0.42),
    }}
  >
    CA
  </span>
);

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error, stop } = useChat();

  const isBusy = status === "submitted" || status === "streaming";
  const canSend = input.trim().length > 0 && !isBusy;

  const handleSend = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isBusy) return;
      sendMessage({ text: trimmed });
      setInput("");
    },
    [sendMessage, isBusy]
  );

  // ESC closes; restore focus to the trigger.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  // Auto-scroll on new content.
  useLayoutEffect(() => {
    if (!open) return;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  // Auto-grow textarea up to 5 lines.
  useLayoutEffect(() => {
    const ta = inputRef.current;
    if (!ta) return;
    ta.style.height = "0px";
    ta.style.height = `${Math.min(ta.scrollHeight, 132)}px`;
  }, [input]);

  const renderedMessages = useMemo(
    () =>
      messages.map((m) => ({
        id: m.id,
        role: m.role,
        text: extractText((m as { parts?: unknown }).parts),
      })),
    [messages]
  );

  const empty = renderedMessages.length === 0;

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Floating trigger                                                  */}
      {/* ---------------------------------------------------------------- */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Ask Chester"}
        aria-expanded={open}
        aria-controls="chat-panel"
        data-cursor="hover"
        className={`
          group fixed bottom-5 right-5 z-[140]
          sm:bottom-6 sm:right-6
          inline-flex h-14 w-14 items-center justify-center
          rounded-full surface btn-press
          text-fg
          hover:border-fg/25
          focus-visible:outline-none
          motion-safe:animate-chrome-in
          ${open ? "rotate-90" : ""}
          transition-transform duration-300 ease-out
        `}
      >
        {/* Soft accent halo */}
        <span
          aria-hidden
          className={`
            pointer-events-none absolute inset-0 rounded-full
            bg-gradient-to-br from-accent/20 to-accent-alt/10
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          `}
        />

        {open ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="relative h-4 w-4"
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <span className="relative inline-flex">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <path
                d="M21 12a8 8 0 0 1-12.6 6.5L3 20l1.5-5.4A8 8 0 1 1 21 12Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Live dot — signals "this works", aligns with Hero status pill */}
            <span className="absolute -right-1 -top-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
          </span>
        )}
      </button>

      {/* ---------------------------------------------------------------- */}
      {/* Panel                                                             */}
      {/* ---------------------------------------------------------------- */}
      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-label="Ask Chester"
          aria-modal="false"
          className="
            fixed z-[139]
            bottom-24 right-4 left-4
            sm:left-auto sm:right-6 sm:w-[400px]
            max-h-[min(620px,calc(100vh-7.5rem))]
            flex flex-col
            surface
            rounded-2xl
            backdrop-blur-xl
            overflow-hidden
            shadow-[0_40px_90px_-30px_rgb(2_8_20/0.65)]
            motion-safe:animate-chrome-in
          "
        >
          {/* Decorative top accent line — references hero gradient */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          />

          {/* Header ----------------------------------------------------- */}
          <header className="flex items-center justify-between gap-3 border-b border-line/50 px-4 py-3.5">
            <div className="flex items-center gap-3 min-w-0">
              <Monogram size={32} />
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-fg leading-tight truncate">
                  Ask Chester
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-muted leading-tight mt-0.5">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-70 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  AI assistant · trained on this portfolio
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              data-cursor="hover"
              className="
                inline-flex h-8 w-8 items-center justify-center
                rounded-full text-muted
                hover:text-fg hover:bg-subtle/60
                transition-colors duration-150
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-4 w-4"
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          {/* Scroll area ------------------------------------------------ */}
          <div
            ref={scrollerRef}
            className="flex-1 overflow-y-auto px-4 py-5 space-y-5 no-scrollbar"
          >
            {empty && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <span className="eyebrow">Suggested</span>
                  <p className="text-[13.5px] leading-relaxed text-muted">
                    Ask about Chester&apos;s projects, research, stack, or
                    availability. For anything off-topic, email{" "}
                    <a
                      href="mailto:iamchesterandaya@gmail.com"
                      className="text-fg link-underline"
                    >
                      iamchesterandaya@gmail.com
                    </a>
                    .
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSend(s)}
                      data-cursor="hover"
                      className="
                        group flex items-center justify-between gap-3
                        text-left text-[13px] text-fg/90
                        rounded-xl border border-line/60 bg-subtle/40
                        px-3.5 py-2.5
                        hover:border-accent/40 hover:bg-subtle/70 hover:text-fg
                        transition-all duration-200
                      "
                    >
                      <span className="truncate">{s}</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        className="h-3.5 w-3.5 shrink-0 text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent transition-all duration-200"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {renderedMessages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="shrink-0 pt-0.5">
                      <Monogram size={22} />
                    </div>
                  )}
                  <div
                    className={
                      isUser
                        ? "max-w-[82%] rounded-2xl rounded-br-md bg-fg text-bg px-3.5 py-2 text-[13.5px] leading-relaxed whitespace-pre-wrap shadow-[0_2px_8px_-2px_rgb(0_0_0/0.18)]"
                        : "max-w-[85%] text-[13.5px] leading-relaxed text-fg/90 whitespace-pre-wrap pt-0.5"
                    }
                  >
                    {m.text ||
                      (!isUser && isBusy ? (
                        <span className="inline-flex items-center gap-1 pt-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-muted/70 animate-pulse" />
                          <span className="h-1.5 w-1.5 rounded-full bg-muted/70 animate-pulse [animation-delay:140ms]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-muted/70 animate-pulse [animation-delay:280ms]" />
                        </span>
                      ) : null)}
                  </div>
                </div>
              );
            })}

            {error && (
              <div className="rounded-xl border border-line/60 bg-subtle/50 px-3.5 py-2.5 text-[12.5px] text-muted">
                Couldn&apos;t reach the assistant. Please try again, or email{" "}
                <a
                  href="mailto:iamchesterandaya@gmail.com"
                  className="text-fg link-underline"
                >
                  iamchesterandaya@gmail.com
                </a>
                .
              </div>
            )}
          </div>

          {/* Composer --------------------------------------------------- */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="border-t border-line/50 p-3"
          >
            <div
              className="
                flex items-end gap-2
                rounded-xl border border-line/60 bg-subtle/30
                px-3 py-2
                focus-within:border-accent/50 focus-within:bg-subtle/50
                transition-colors duration-200
              "
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                placeholder="Ask anything about Chester…"
                rows={1}
                className="
                  flex-1 resize-none bg-transparent
                  text-[13.5px] leading-relaxed text-fg
                  placeholder:text-muted/70
                  focus:outline-none
                  max-h-[132px]
                "
              />
              {isBusy ? (
                <button
                  type="button"
                  onClick={() => stop()}
                  aria-label="Stop generating"
                  data-cursor="hover"
                  className="
                    inline-flex h-8 w-8 items-center justify-center
                    rounded-lg border border-line/60 text-muted
                    hover:text-fg hover:border-fg/30 hover:bg-subtle/60
                    transition-colors duration-150
                  "
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canSend}
                  aria-label="Send message"
                  data-cursor="hover"
                  className={`
                    inline-flex h-8 w-8 items-center justify-center
                    rounded-lg btn-press
                    transition-all duration-200
                    ${
                      canSend
                        ? "bg-gradient-to-br from-accent to-accent-strong text-bg shadow-[0_4px_14px_-4px_rgb(var(--accent)/0.6)] hover:brightness-110"
                        : "bg-subtle/60 text-muted/50 cursor-not-allowed"
                    }
                  `}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
            <p className="mt-2 px-1 text-[10px] uppercase tracking-[0.18em] text-muted/70">
              AI-generated · may be inaccurate · ⏎ to send · ⇧⏎ for newline
            </p>
          </form>
        </div>
      )}
    </>
  );
};
