"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const SurudoiCursor = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 600, damping: 40, mass: 0.7 });
  const smoothY = useSpring(y, { stiffness: 600, damping: 40, mass: 0.7 });

  // Trailing dot springs
  const dotX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.2 });

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
      setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseEnter, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  // Only show on desktop
  if (!isVisible || typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      >
        <div className="w-8 h-8 rounded-full border-2 border-emerald-400 bg-white/5 shadow-lg flex items-center justify-center transition-all duration-200">
          {/* Optional: Show text/icon on hover */}
          {isHovering && (
            <span className="text-xs font-semibold text-emerald-400">View</span>
          )}
        </div>
      </motion.div>
      {/* Trailing Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          opacity: isHovering ? 0.3 : 0.6,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400/40" />
      </motion.div>
    </>
  );
};