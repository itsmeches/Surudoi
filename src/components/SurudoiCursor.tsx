"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface SurudoiCursorProps {
  hoverText?: string;
  magneticDistance?: number;
  magneticStrength?: number;
}

export const SurudoiCursor: React.FC<SurudoiCursorProps> = ({
  hoverText = "View",
  magneticDistance = 120,
  magneticStrength = 0.25,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 600, damping: 40, mass: 0.7 });
  const smoothY = useSpring(y, { stiffness: 600, damping: 40, mass: 0.7 });

  const dotX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.2 });

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hoverElementsRef = useRef<HTMLElement[]>([]);

  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    if (isTouchDevice) return;

    // Cache hoverable elements once
    hoverElementsRef.current = Array.from(
      document.querySelectorAll("button, a, [role='button']")
    ) as HTMLElement[];

    const updateMouse = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      setIsVisible(true);

      let magneticOffset = { x: 0, y: 0 };
      let hovering = false;

      for (const el of hoverElementsRef.current) {
        const rect = el.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;

        const dx = elCenterX - mouseX;
        const dy = elCenterY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < magneticDistance) {
          hovering = true;
          const strength = (1 - distance / magneticDistance) * magneticStrength;
          magneticOffset.x += dx * strength;
          magneticOffset.y += dy * strength;
        }
      }

      x.set(mouseX + magneticOffset.x - 16);
      y.set(mouseY + magneticOffset.y - 16);
      setIsHovering(hovering);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMouse, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMouse);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, isTouchDevice, magneticDistance, magneticStrength]);

  if (!isVisible || isTouchDevice) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: smoothX, y: smoothY }}
        animate={{
          scale: isHovering ? 2.2 : 1,
          opacity: isHovering ? 0.9 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="w-8 h-8 rounded-full border-2 border-emerald-400 bg-white/5 shadow-lg flex items-center justify-center transition-all duration-200">
          {isHovering && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute -top-6 text-xs font-semibold text-emerald-400 whitespace-nowrap"
            >
              {hoverText}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Trailing Dot with Pulse */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: isHovering ? 0.3 : 0.6,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400/40 animate-pulse-slow" />
      </motion.div>

      {/* Global Pulse Keyframes */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.4); opacity: 0.1; }
        }
        .animate-pulse-slow { animation: pulse-slow 2.5s ease-in-out infinite; }
      `}</style>
    </>
  );
};
