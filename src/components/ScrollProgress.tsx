"use client";

import { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      role="presentation"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-px bg-transparent"
    >
      <span
        className="block h-full bg-fg/80 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
