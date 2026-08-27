"use client";

/**
 * Cursor
 *
 * Minimal augmentation cursor — NOT a replacement.
 *
 * Rules:
 *  - Native cursor stays visible. We add a soft accent ring on top.
 *  - Desktop pointer only (matchMedia `pointer: fine`).
 *  - Disabled under prefers-reduced-motion.
 *  - Single rAF loop. Listeners use { passive: true }.
 *  - Ring lerps with eased follow; dot snaps to pointer for precision.
 *  - On hover over `a`, `button`, `[role="button"]`, `[data-cursor="hover"]`
 *    the ring expands and softens.
 *  - Hidden until first pointer event (no flash at 0,0 on page load).
 */

import { useEffect, useRef, useState } from "react";

const RING_LERP = 0.18;
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], [data-cursor="hover"]';

export const Cursor = () => {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    setEnabled(true);

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let tx = 0;
    let ty = 0;
    let rx = 0;
    let ry = 0;
    let visible = false;
    let hovering = false;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        rx = tx;
        ry = ty;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
      // Dot follows precisely. No lerp — precision matters for the user's intent.
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;

      // Detect interactive target without binding listeners to every element.
      const target = e.target as Element | null;
      const isInteractive = !!target?.closest(INTERACTIVE_SELECTOR);
      if (isInteractive !== hovering) {
        hovering = isInteractive;
        ring.dataset.hover = isInteractive ? "1" : "0";
      }
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const tick = () => {
      rx += (tx - rx) * RING_LERP;
      ry += (ty - ry) * RING_LERP;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Ring — eased follow */}
      <div
        ref={ringRef}
        aria-hidden
        data-hover="0"
        className="
          pointer-events-none fixed left-0 top-0 z-[150]
          h-7 w-7 rounded-full
          border border-fg/35
          opacity-0
          transition-[width,height,border-color,background-color,opacity]
          duration-[260ms] ease-out
          mix-blend-difference
          data-[hover=1]:h-10 data-[hover=1]:w-10
          data-[hover=1]:border-fg/70 data-[hover=1]:bg-fg/5
        "
        style={{ willChange: "transform" }}
      />
      {/* Dot — snaps to true pointer */}
      <div
        ref={dotRef}
        aria-hidden
        className="
          pointer-events-none fixed left-0 top-0 z-[150]
          h-1 w-1 rounded-full bg-fg
          opacity-0
          mix-blend-difference
        "
        style={{ willChange: "transform" }}
      />
    </>
  );
};
