"use client";
// components/AchievementsCard.tsx
 
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { achievementSlides } from "@/data/aboutData";
 
export const AchievementsCard = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
 
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % achievementSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
 
  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };
 
  const slide = achievementSlides[current];
 
  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };
 
  return (
    <div className="relative flex-1 overflow-hidden rounded-xl mx-4 mb-4 mt-2 min-h-[220px]">
      <AnimatePresence custom={direction} mode="wait">
        {achievementSlides.map((slide, idx) =>
          idx === current && (
            <motion.div
              key={idx}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
              style={{ position: "relative" }}
            >
              {/* Background image */}
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 400px"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent" />

              {/* Badge — top left */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 bg-gray-900/80 backdrop-blur-sm border border-emerald-400/30 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                  {typeof slide.badge === "function"
                    ? <slide.badge className="w-5 h-5 text-emerald-400" />
                    : slide.badge}
                </span>
              </div>

              {/* Ping dot — top right */}
              <div className="absolute top-4 right-4 w-2.5 h-2.5">
                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <div className="absolute inset-0 rounded-full bg-emerald-400" />
              </div>

              {/* Text — bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-10">
                <h3 className="text-white font-bold text-base leading-snug">{slide.title}</h3>
                <p className="text-white/60 text-xs mt-1 leading-relaxed">{slide.description}</p>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {achievementSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              index === current
                ? "w-6 h-2 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                : "w-2 h-2 bg-white/30 hover:bg-emerald-300/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};