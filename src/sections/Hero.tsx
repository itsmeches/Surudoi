"use client";
import me from "@/assets/images/me.png";
import Image from "next/image";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";
import SparkleIcon from "@/assets/icons/Sparkle.svg";
import { HeroOrbit } from "@/components/heroOrbit";
import React from "react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const [showDefinition, setShowDefinition] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      id="home"
      className="py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip"
    >
      {/* ===== Background + Dynamic Orbits ===== */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_75%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{ backgroundImage: `url(${grainImage.src})` }}
        ></div>

        {/* Orbiting symbols */}
        {[620, 820, 1020, 1220].map((size, i) => (
          <div key={i} className={`size-[${size}px] hero-ring`} />
        ))}

        <HeroOrbit size={430} rotation={-14} shouldOrbit orbitDuration="30s">
          <SparkleIcon className="size-8 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={530} rotation={178} shouldOrbit orbitDuration="36s">
          <SparkleIcon className="size-10 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={550} rotation={20} shouldOrbit orbitDuration="38s">
          <StarIcon className="size-12 text-emerald-300" />
        </HeroOrbit>
        <HeroOrbit size={590} rotation={98} shouldOrbit orbitDuration="40s">
          <StarIcon className="size-8 text-emerald-300" />
        </HeroOrbit>
      </div>

      {/* ===== Foreground Layer ===== */}
      <div className="container flex flex-col items-center z-30 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          {/* === 1. Profile & Status === */}
          <motion.div
            className="relative"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative group">
              <Image
                src={me}
                className="size-[120px] md:size-[140px] rounded-full border-2 border-emerald-400/40 shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 group-hover:scale-105"
                alt="Chester 'Surudoi' Andaya"
                priority
              />
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-400/20 to-emerald-300/10 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping-slow" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 inline-flex items-center gap-2.5 border border-emerald-400/20 bg-emerald-950/30 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
          >
            <div className="relative flex items-center justify-center">
              <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="absolute size-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="text-sm text-emerald-300/90 font-medium">
              Open to opportunities
            </span>
          </motion.div>

          {/* === 2. Headline + Definition === */}
          <motion.h1
            className="mt-8 text-4xl md:text-5xl lg:text-6xl font-serif tracking-wide leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Hi, I’m{" "}
            <span className="text-emerald-400 font-bold">
              Chester{" "}
              <span
                className="relative group cursor-pointer hover:text-emerald-300 transition-colors"
                onMouseEnter={() => setShowDefinition(true)}
                onMouseLeave={() => setShowDefinition(false)}
              >
                “Surudoi”
                {showDefinition && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 bg-gray-800/90 text-white text-sm px-4 py-2 rounded-lg shadow-lg w-64"
                  >
                    <p className="text-emerald-300 font-semibold mb-1">
                      “Surudoi” (鋭い)
                    </p>
                    <p className="text-white/80 mb-2">
                      Japanese for “sharp” or “keen” — a mindset of awareness and
                      clarity.
                    </p>
                    <p className="italic text-emerald-300/80">
                      “I see patterns others miss.”
                    </p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-800/90 rotate-45"></div>
                  </motion.div>
                )}
              </span>{" "}
              Andaya
            </span>
          </motion.h1>

          {/* === 3. Subheadline / Tagline === */}
          <motion.p
            className="mt-4 text-emerald-400/90 text-lg md:text-xl font-medium tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Sharp mind. Focused solutions.
          </motion.p>

          <div className="w-20 h-px mt-3 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

          {/* === 4. Description === */}
          <motion.p
            className="mt-6 max-w-2xl text-white/60 md:text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            I’m a Computer Science student specializing in{" "}
            <span className="text-emerald-400/90 font-semibold">
              Machine Learning
            </span>
            . I build intelligent solutions with precision, persistence, and an
            analytical eye for detail.
          </motion.p>

          {/* === 5. CTA Buttons === */}
          <motion.div
            className="flex flex-col md:flex-row justify-center items-center mt-10 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="group inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
            >
              <span className="font-semibold">View My Work</span>
              <ArrowDown className="size-4 group-hover:translate-y-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="group inline-flex items-center gap-2 border border-emerald-400 bg-emerald-400 text-gray-900 h-12 px-6 rounded-xl hover:bg-emerald-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-105 font-semibold"
            >
              <span className="text-lg">📄</span>
              <span>Download Resume</span>
            </button>
          </motion.div>

          {/* === 6. Scroll Indicator === */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 hidden md:block"
          >
            <div className="flex flex-col items-center gap-2 text-white/40">
              <span className="text-xs uppercase tracking-wider">
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="size-4" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* === Custom Keyframes === */}
      <style jsx global>{`
        @keyframes ping-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.08);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
