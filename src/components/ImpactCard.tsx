"use client";
 
import { motion } from "framer-motion";
import { useEffect, useRef, ComponentType, SVGProps } from "react";
import { impacts } from "@/data/aboutData";
import { twMerge } from "tailwind-merge";
 
export const ImpactCard = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const isPausedRef = useRef(false);
 
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
 
    container.scrollLeft = 1;
 
    const speed = 40;
 
    const animate = (time: number) => {
      if (!container) return;
 
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
 
      if (!isPausedRef.current) {
        container.scrollLeft += speed * delta;
 
        const totalWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= totalWidth) {
          container.scrollLeft -= totalWidth;
        }
      }
 
      animationRef.current = requestAnimationFrame(animate);
    };
 
    animationRef.current = requestAnimationFrame(animate);
 
    const pause = () => (isPausedRef.current = true);
    const resume = () => (isPausedRef.current = false);
 
    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);
 
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
    };
  }, []);
 
  return (
    <div
      className={twMerge(
        "mt-4 w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div
        ref={containerRef}
        className="flex gap-4 sm:gap-6 px-4 py-2 overflow-x-auto no-scrollbar"
      >
        {[...impacts, ...impacts].map((item, index) => {
          // Treat icon as an SVG component
          const Icon = item.icon as ComponentType<SVGProps<SVGSVGElement>>;
 
          return (
            <motion.div
              key={`${item.label}-${index}`}
              className="min-w-[240px] sm:min-w-[260px] lg:min-w-[300px]
              flex-shrink-0 group relative flex flex-col items-center text-center
              bg-white/5 backdrop-blur-xl border border-white/10
              rounded-2xl px-4 sm:px-5 lg:px-6 py-6 sm:py-7 lg:py-8
              hover:border-emerald-400/40 hover:bg-white/10
              transition-all duration-300"
            >
              {/* Icon */}
              {Icon && (
                <div className="mb-3 sm:mb-4 opacity-90 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.25)]" />
                </div>
              )}
 
              {/* Value */}
              <div className="flex items-baseline gap-1 flex-wrap justify-center">
                <span className="font-bold text-white tracking-tight text-[clamp(1.8rem,4vw,3rem)]">
                  {item.value}
                </span>
                {item.suffix && item.suffix.trim() && (
                  <span className="text-emerald-400 font-semibold text-[clamp(0.9rem,2vw,1.2rem)]">
                    {item.suffix}
                  </span>
                )}
              </div>
 
              {/* Label */}
              <p className="mt-2 text-white/80 text-sm sm:text-base font-medium">
                {item.label}
              </p>
 
              {/* Sublabel */}
              <p className="text-white/40 text-xs sm:text-sm mt-1 max-w-[22ch]">
                {item.sublabel}
              </p>
 
              {/* Accent bar */}
              <div className="mt-4 w-8 h-[2px] bg-emerald-400/50 rounded-full group-hover:w-14 transition-all duration-300" />
 
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)]" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};