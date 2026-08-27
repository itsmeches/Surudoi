"use client";

import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const email = "iamchesterandaya@gmail.com";
  const mailto = useMemo(
    () => `mailto:${email}?subject=${encodeURIComponent("Opportunity")}`,
    [email]
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // no-op
    }
  };

  return (
    <section
      id="contacts"
      className="relative isolate scroll-mt-20 py-20 md:py-28 min-h-[calc(100vh-4rem)] flex flex-col justify-center"
    >
      <div className="container max-w-3xl">
        <SectionHeader
          index="04"
          eyebrow="Get in touch"
          title="Open to ML and SWE internships."
          description="If your team works at the intersection of research-backed ML and product delivery, I&rsquo;d love to talk. Replies within 24 hours."
        />

        <div className="mt-12 flex flex-col gap-8 border border-line/70 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <div className="eyebrow">Email</div>
            <a
              href={mailto}
              className="display mt-2 block font-serif text-2xl text-fg transition-colors hover:text-accent md:text-3xl"
            >
              {email}
            </a>
            <p className="mono mt-3 text-sm text-muted">
              Lipa City, Philippines · GMT+8
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={mailto}
              className="inline-flex h-11 items-center bg-fg px-5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              Send email
            </a>
            <button
              onClick={copyEmail}
              className="inline-flex h-11 items-center border border-line/70 px-5 text-sm font-medium text-fg transition-colors hover:border-fg/50"
            >
              {copied ? "Copied" : "Copy"}
            </button>
            <a
              href="https://www.linkedin.com/in/chester-andaya-8bba4a1b9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center border border-line/70 px-5 text-sm font-medium text-fg transition-colors hover:border-fg/50"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
