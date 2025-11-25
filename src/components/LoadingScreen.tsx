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
    const fadeTimeout = setTimeout(() => setFadeOut(true), 2000); // fade starts at 2s
    const removeTimeout = setTimeout(() => setVisible(false), 2500); // remove at 2.5s
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  // Smooth zoom animation
  useEffect(() => {
    let animationFrame: number;
    const animateZoom = () => {
      setScale(prev => prev + 0.010); // adjust zoom speed here
      animationFrame = requestAnimationFrame(animateZoom);
    };
    animationFrame = requestAnimationFrame(animateZoom);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-3500 ${
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
              opacity: fadeOut ? 0 : 0.15,

              // backgroundColor: "#ffffff",
              // backgroundImage: "url('/textures/film-grain.png')",
              // opacity: fadeOut ? 0 : 0.08, // lighter for white background
            }}
          />
        </>
      )}
    </div>
  );
}
