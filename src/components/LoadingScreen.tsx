"use client";

import { useEffect, useState } from "react";
import MonsterTunnelShaders from "@/components/ui/shadcn-io/monster-tunnel-shaders/monster-tunnel-shaders";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [scale, setScale] = useState(1); // zoom factor
  const [shaderLoaded, setShaderLoaded] = useState(false);

  // Handle fade out and removal
  useEffect(() => {
    const fadeTimeout = setTimeout(() => setFadeOut(true), 2500);
    const removeTimeout = setTimeout(() => setVisible(false), 3000);
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  // Smooth zoom animation
  useEffect(() => {
    let animationFrame: number;
    const animateZoom = () => {
      setScale(prev => prev + 0.002); // adjust zoom speed here
      animationFrame = requestAnimationFrame(animateZoom);
    };
    animationFrame = requestAnimationFrame(animateZoom);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Shader Layer with zoom */}
      <div
        className="w-full h-full"
        style={{
          transform: `scale(${scale})`,
          transition: "transform 0.1s linear",
        }}
      >
        <MonsterTunnelShaders
          className="w-full h-full"
          onFirstFrame={() => setShaderLoaded(true)}
        />
      </div>

      {/* Overlay effects only after shader starts */}
      {shaderLoaded && (
        <>
          {/* Vignette Layer */}
          <div
            className="pointer-events-none absolute inset-0 h-full w-full select-none transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%)",
              opacity: fadeOut ? 0 : 1,
            }}
          />

          {/* Film Grain Layer */}
          <div
            className="pointer-events-none absolute inset-0 h-full w-full select-none transition-opacity duration-500"
            style={{
              backgroundColor: "#111827", // match your shader background
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              opacity: fadeOut ? 0 : 0.15,
            }}
          />
        </>
      )}
    </div>
  );
}
