"use client";

/**
 * Preloader
 *
 * Constraints (deliberate):
 *  - Total visible time: ~500ms cap. Never blocks longer than necessary.
 *  - Skips entirely after the first paint in the session (sessionStorage flag).
 *  - Skips entirely under prefers-reduced-motion.
 *  - Renders above content but never freezes scroll for the user.
 *  - Pure CSS animation. Zero RAF loops. Zero library.
 *
 * It is mounted in the root layout so it covers the first paint of any route,
 * but it self-unmounts after fade-out so it never lingers in the DOM.
 */

import { useEffect, useState } from "react";

const SESSION_KEY = "surudoi:preloader:seen";
const MIN_VISIBLE_MS = 420;

export const Preloader = () => {
  // Render the overlay by default so SSR markup matches the first client paint
  // (no FOUC). We immediately tear it down in the effect if it should be skipped.
  const [mounted, setMounted] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Skip when the user has already seen it this session OR prefers reduced motion.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SESSION_KEY) === "1";
    if (reduced || seen) {
      setMounted(false);
      return;
    }

    // Mark as seen immediately so a navigation race never re-shows it.
    sessionStorage.setItem(SESSION_KEY, "1");

    const start = performance.now();
    const hide = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => setHidden(true), remaining);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }

    return () => window.removeEventListener("load", hide);
  }, []);

  // After the fade-out finishes, unmount so we leave the DOM clean.
  useEffect(() => {
    if (!hidden) return;
    const t = window.setTimeout(() => setMounted(false), 460);
    return () => window.clearTimeout(t);
  }, [hidden]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      data-state={hidden ? "hidden" : "visible"}
      className="
        pointer-events-none fixed inset-0 z-[200]
        flex items-center justify-center
        bg-[rgb(var(--bg))]
        transition-opacity duration-[440ms] ease-out
        data-[state=hidden]:opacity-0
      "
    >
      <div className="flex flex-col items-center gap-5">
        <div className="font-serif text-2xl tracking-[-0.02em] text-fg">
          Chester Andaya
        </div>
        <div className="relative h-px w-32 overflow-hidden bg-fg/10">
          <span className="absolute inset-y-0 left-0 block w-1/3 bg-fg preloader-sweep" />
        </div>
      </div>
    </div>
  );
};
