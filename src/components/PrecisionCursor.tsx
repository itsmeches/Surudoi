"use client";

import { useEffect, useState } from "react";

export const PrecisionCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop/fine pointer devices that don't prefer reduced motion
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setEnabled(true);
    // Only hide the system cursor once the replacement is actually mounted —
    // see the scoped `.custom-cursor` rule in globals.css.
    document.documentElement.classList.add("custom-cursor");

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, [data-cursor="hover"]')
        );
        setIsHovered(isInteractive);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const updatePosition = () => {
      // Smooth interpolation for precision feel
      currentX += (targetX - currentX) * 0.35;
      currentY += (targetY - currentY) * 0.35;

      setPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [isVisible]);

  if (!enabled || !isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999] overflow-hidden"
    >
      {/* Precision reticle / target */}
      <div
        className="absolute top-0 left-0 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        {/* Center dot */}
        <span className="absolute -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-200" />

        {/* Crosshair / Reticle Frame */}
        <div
          className={`
            absolute -translate-x-1/2 -translate-y-1/2
            transition-all duration-200 ease-out
            ${
              isHovered
                ? "h-8 w-8 border border-accent/60 bg-accent/[0.05]"
                : "h-5 w-5 border border-fg/20"
            }
          `}
        >
          {/* Hairline corner ticks */}
          <span className="absolute -top-1 -left-1 h-1.5 w-1.5 border-t border-l border-accent/80" />
          <span className="absolute -top-1 -right-1 h-1.5 w-1.5 border-t border-r border-accent/80" />
          <span className="absolute -bottom-1 -left-1 h-1.5 w-1.5 border-b border-l border-accent/80" />
          <span className="absolute -bottom-1 -right-1 h-1.5 w-1.5 border-b border-r border-accent/80" />
        </div>
      </div>
    </div>
  );
};
