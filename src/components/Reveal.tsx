"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  /** Stagger delay in ms (0–400 recommended). */
  delay?: number;
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  /** Override threshold for trigger point. */
  threshold?: number;
};

export const Reveal = ({
  children,
  delay = 0,
  as = "div",
  className = "",
  threshold = 0.12,
}: Props) => {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honor user preference — no entrance animation, render in place.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    // If element is already in view on mount (above fold), reveal immediately
    // so we never animate the LCP / first viewport.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const Tag = as as ElementType;
  const style: CSSProperties = {
    ["--reveal-delay" as string]: `${delay}ms`,
  };

  return createElement(
    Tag,
    {
      ref: (node: HTMLElement | null) => {
        ref.current = node;
      },
      className: `reveal ${shown ? "reveal--in" : ""} ${className}`.trim(),
      style,
    },
    children
  );
};
