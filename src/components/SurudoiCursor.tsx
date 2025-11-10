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
  const [angle, setAngle] = useState(0); // Track cursor direction

  const hoverElementsRef = useRef<HTMLElement[]>([]);

  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    if (isTouchDevice) return;

    hoverElementsRef.current = Array.from(
      document.querySelectorAll("button, a, [role='button'], [data-hoverable]")
    ) as HTMLElement[];

    let lastX = 0;
    let lastY = 0;

    const updateMouse = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      setIsVisible(true);

      // Compute subtle direction shift
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const newAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      setAngle((prev) => prev + (newAngle - prev) * 0.08); // dampened change
      lastX = mouseX;
      lastY = mouseY;

      let magneticOffset = { x: 0, y: 0 };
      let hovering = false;

      for (const el of hoverElementsRef.current) {
        const rect = el.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;

        const distX = elCenterX - mouseX;
        const distY = elCenterY - mouseY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < magneticDistance) {
          hovering = true;
          const strength = (1 - distance / magneticDistance) * magneticStrength;
          magneticOffset.x += distX * strength;
          magneticOffset.y += distY * strength;
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
      {/* === Main Glass Cursor === */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: smoothX, y: smoothY }}
        animate={{
          scale: isHovering ? 2.2 : 1,
          opacity: isHovering ? 0.9 : 1,
          rotate: angle / 15, // reduced rotation
          filter: isHovering
            ? "drop-shadow(0 0 12px rgba(16,185,129,0.25))"
            : "none",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        <div
          className={`w-8 h-8 rounded-full border border-emerald-400/50 backdrop-blur-[5px]
          bg-white/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]
          relative flex items-center justify-center overflow-hidden`}
        >
          {/* Subtle Glass Glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at ${
                50 + Math.sin(angle / 40) * 8
              }% ${50 - Math.cos(angle / 40) * 8}%, 
              rgba(255,255,255,0.15) 0%, 
              rgba(255,255,255,0.03) 45%, 
              rgba(255,255,255,0) 80%)`,
              mixBlendMode: "overlay",
            }}
          />

          {/* Gentle Moving Shimmer */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-40 animate-shimmer"
            style={{
              rotate: angle / 8,
              background:
                "linear-gradient(130deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)",
            }}
          />

          {isHovering && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute -top-6 text-[11px] font-medium text-emerald-400 tracking-wide"
            >
              {hoverText}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* === Trailing Dot === */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: isHovering ? 0.25 : 0.4,
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400/30 animate-pulse-slow" />
      </motion.div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.3); opacity: 0.1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(25deg); }
          100% { transform: translateX(200%) rotate(25deg); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 4s ease-in-out infinite;
          mix-blend-mode: overlay;
        }
      `}</style>
    </>
  );
};
