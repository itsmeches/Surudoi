"use client";

/**
 * RouteFade
 *
 * Ultra-light cross-fade triggered when `usePathname()` changes.
 * Re-mounts children via a keyed wrapper so the CSS `route-in` keyframe
 * plays once per navigation. No JS animation loop, no library.
 *
 * Honors prefers-reduced-motion via CSS override in globals.
 */

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export const RouteFade = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return (
    <div key={pathname} className="route-fade">
      {children}
    </div>
  );
};
