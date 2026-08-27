"use client";

/**
 * Magnetic
 *
 * Subtle pointer-attraction wrapper for primary CTAs only.
 *
 * Design rules (deliberate, not negotiable):
 *  - Only active on `pointer: fine` devices (no touch, no Wacom-pen quirks)
 *  - Disabled under `prefers-reduced-motion`
 *  - Uses `transform: translate3d` exclusively (GPU, no layout)
 *  - `rAF`-throttled; never updates state, never re-renders
 *  - Pull strength caps at 6px so movement is felt, not seen
 *
 * This is the *only* place magnetic motion is allowed in the system.
 */

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Max pixel translation. Keep ≤ 8. */
  strength?: number;
  className?: string;
};

export const Magnetic = ({ children, strength = 6, className = "" }: Props) => {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Capability gates — silently no-op on touch / reduced-motion devices.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      // Normalize by half-extents, clamp, scale by strength.
      const nx = Math.max(-1, Math.min(1, relX / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, relY / (rect.height / 2)));
      targetX = nx * strength;
      targetY = ny * strength;

      if (!rafId) {
        rafId = requestAnimationFrame(apply);
      }
    };

    const apply = () => {
      el.style.transform = `translate3d(${targetX.toFixed(2)}px, ${targetY.toFixed(2)}px, 0)`;
      rafId = 0;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      el.style.transform = "translate3d(0, 0, 0)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={`inline-block will-change-transform transition-transform duration-500 ease-out ${className}`}
    >
      {children}
    </span>
  );
};
