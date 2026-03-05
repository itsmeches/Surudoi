"use client";
import me from '@/assets/images/me.png';
import Image from 'next/image';
import ArrowDown from '@/assets/icons/arrow-down.svg';
import Download from '@/assets/icons/download.svg';
import grainImage from "@/assets/images/grain.jpg";
import StarIcon from '@/assets/icons/star.svg';
import SparkleIcon from '@/assets/icons/sparkle.svg';
import { HeroOrbit } from '@/components/heroOrbit';
import React from 'react';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  const [showDefinition, setShowDefinition] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    // Fade-in wrapper after loading screen
    <motion.div
      id="home"
      className="py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }} // fade in after 2.5s
    >
      {/* Top Gradient Glow */}
      <div className="absolute h-[500px] w-full left-0 right-0 top-0 bg-emerald-300/15 [mask-image:radial-gradient(50%_80%_at_top_center,black,transparent)] -z-20 pointer-events-none"></div>

      {/* Background grain + orbiting elements */}
      <div className='absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_75%,transparent)]'>
        <div className="absolute inset-0 -z-30 opacity-5" style={{ backgroundImage: `url(${grainImage.src})` }}></div>

        {/* Precision rings */}
        <div className='size-[620px] hero-ring'></div>
        <div className='size-[820px] hero-ring'></div>
        <div className='size-[1020px] hero-ring'></div>
        <div className='size-[1220px] hero-ring'></div>

        {/* Orbiting elements */}
        <HeroOrbit size={430} rotation={-14} shouldOrbit orbitDuration="30s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-8 text-emerald-300/20 animate-pulse-subtle" />
        </HeroOrbit>
        <HeroOrbit size={440} rotation={79} shouldOrbit orbitDuration="32s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-5 text-emerald-300/20 animate-pulse-subtle" />
        </HeroOrbit>
        <HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="34s">
          <div className="size-2 rounded-full bg-emerald-300/20 animate-twinkle" />
        </HeroOrbit>
        <HeroOrbit size={530} rotation={178} shouldOrbit orbitDuration="36s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-10 text-emerald-300/20 animate-pulse-subtle" />
        </HeroOrbit>
        <HeroOrbit size={550} rotation={20} shouldOrbit orbitDuration="38s" shouldSpin spinDuration="6s">
          <StarIcon className="size-12 text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-glow" />
        </HeroOrbit>
        <HeroOrbit size={590} rotation={98} shouldOrbit orbitDuration="40s" shouldSpin spinDuration="6s">
          <StarIcon className="size-8 text-emerald-300 drop-shadow-[0_0_6px_rgba(16,185,129,0.5)] animate-glow" />
        </HeroOrbit>
        <HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="42s">
          <div className="size-2 rounded-full bg-emerald-300/20 animate-twinkle" />
        </HeroOrbit>
        <HeroOrbit size={720} rotation={-72} shouldOrbit orbitDuration="50s" shouldSpin spinDuration="4s">
          <SparkleIcon className="size-6 text-emerald-300/15 animate-pulse-subtle" />
        </HeroOrbit>
        <HeroOrbit size={800} rotation={145} shouldOrbit orbitDuration="55s">
          <div className="size-3 rounded-full bg-emerald-300/10 animate-twinkle" />
        </HeroOrbit>
      </div>

      {/* Layer 2: Additional depth */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_80%,transparent)]">
        <HeroOrbit size={500} rotation={-20} shouldOrbit orbitDuration="40s" shouldSpin spinDuration="3s">
          <SparkleIcon className="size-6 text-emerald-300/30 animate-pulse-subtle" />
        </HeroOrbit>
        <HeroOrbit size={600} rotation={45} shouldOrbit orbitDuration="44s" shouldSpin spinDuration="6s">
          <StarIcon className="size-10 text-emerald-300/20 drop-shadow-[0_0_6px_rgba(16,185,129,0.4)] animate-glow" />
        </HeroOrbit>
        <HeroOrbit size={710} rotation={-30} shouldOrbit orbitDuration="46s">
          <div className="size-3 rounded-full bg-emerald-300/10 animate-twinkle" />
        </HeroOrbit>
        <HeroOrbit size={780} rotation={120} shouldOrbit orbitDuration="52s" shouldSpin spinDuration="4s">
          <SparkleIcon className="size-7 text-emerald-300/25 animate-pulse-subtle" />
        </HeroOrbit>
        <HeroOrbit size={850} rotation={-95} shouldOrbit orbitDuration="58s">
          <div className="size-2 rounded-full bg-emerald-300/15 animate-twinkle" />
        </HeroOrbit>
      </div>

      {/* Center content */}
      <div className="container flex flex-col items-center z-30 relative">
        {/* Main motion wrapper synced with fade-in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // starts after hero wrapper fade
          className="flex flex-col items-center text-center"
        >
          {/* Profile Image */}
          <motion.div 
            className="relative"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative group">
              <Image
                src={me}
                className="size-[120px] md:size-[140px] rounded-full border-2 border-emerald-400/40 shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]"
                alt="Chester 'Surudoi' Andaya"
                priority
              />
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-400/20 to-emerald-300/10 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping-slow" />
              <div className="absolute -inset-1 rounded-full border border-emerald-400/20" />
            </div>
          </motion.div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.7, duration: 0.6 }}
            className="mt-8 inline-flex items-center gap-2.5 border border-emerald-400/20 bg-emerald-950/30 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
          >
            <div className="relative flex items-center justify-center">
              <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="absolute size-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="text-sm text-emerald-300/90 font-medium">Open to opportunities</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            className="mt-8 text-4xl md:text-5xl lg:text-6xl font-serif tracking-wide leading-tight relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8, duration: 0.8 }}
          >
            Hi, I&apos;m{" "}
            <span className="text-emerald-400 font-bold">
              Chester{" "}
              <span
                className="relative group cursor-pointer hover:text-emerald-300 transition-colors"
                tabIndex={0}
                aria-label="Show definition of Surudoi"
                onMouseEnter={() => setShowDefinition(true)}
                onMouseLeave={() => setShowDefinition(false)}
                onFocus={() => setShowDefinition(true)}
                onBlur={() => setShowDefinition(false)}
                role="button"
              >
                "Surudoi"
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-300 group-hover:w-full transition-all duration-300" />
              
              {showDefinition && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 bg-gray-800/90 text-white text-sm px-4 py-2 rounded-lg shadow-lg w-64"
                  role="tooltip"
                >
                  <p className="text-emerald-300 font-semibold mb-1">&quot;Surudoi&quot; (鋭い)</p>
                  <p className="text-white/80 mb-2">
                    A Japanese word meaning &quot;sharp,&quot; &quot;keen,&quot; or &quot;perceptive.<br />
                    Reflects awareness and analytical clarity.
                  </p>
                  <p className="italic text-emerald-300/80">&quot;I see patterns others miss.&quot;</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 w-3 h-3 bg-gray-800/90 rotate-45"></div>
                </motion.div>
              )}
              </span>{" "}
              Andaya
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.div
            className="mt-6 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.9, duration: 0.8 }}
          >
            <p className="text-emerald-400/90 text-lg md:text-xl font-medium tracking-wide">
              Sharp mind. Focused solutions.
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
          </motion.div>

          {/* Professional Description */}
          <motion.p 
            className="mt-6 max-w-2xl text-white/60 md:text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.0, duration: 0.8 }}
          >
            A Computer Science student specializing in{" "}
            <span className="text-emerald-400/90 font-semibold">Machine Learning</span>.<br className="hidden md:block" />
            I build smart solutions with precision, persistence, and a sharp eye for detail.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col md:flex-row justify-center items-center mt-10 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.1, duration: 0.6 }}
          >
            <button
              className="group inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={() => scrollToSection("projects")}
              aria-label="View my projects"
            >
              <span className="font-semibold">View My Work</span>
              <ArrowDown className="size-4 group-hover:translate-y-1 transition-transform" />
            </button>

            <button
              className="group inline-flex items-center gap-2 border border-emerald-400 bg-emerald-400 text-gray-900 h-12 px-6 rounded-xl hover:bg-emerald-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 font-semibold"
              onClick={() => scrollToSection("contact")}
              aria-label="Download resume"
            >
              <span className="font-semibold">Download CV</span>
              <Download className="size-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.2, duration: 0.6 }}
            className="mt-16 hidden md:block"
          >
            <div className="flex flex-col items-center gap-2 text-white/40">
              <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="size-4" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Keyframe Animations */}
      <style jsx global>{`
        @keyframes ping-slow {
          0%,100% { transform: scale(1); opacity:0.4; }
          50% { transform: scale(1.08); opacity:0; }
        }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0.4,0,0.6,1) infinite; }
        @keyframes glow { 0%,100%{opacity:0.8;filter:drop-shadow(0 0 8px rgba(16,185,129,0.6));} 50%{opacity:1;filter:drop-shadow(0 0 12px rgba(16,185,129,0.8));} }
        .animate-glow { animation:glow 3s ease-in-out infinite; }
        @keyframes pulse-subtle { 0%,100%{opacity:0.2;transform:scale(1);} 50%{opacity:0.4;transform:scale(1.1);} }
        .animate-pulse-subtle { animation:pulse-subtle 4s ease-in-out infinite; }
        @keyframes twinkle { 0%,100%{opacity:0.2;transform:scale(1);} 25%{opacity:0.6;transform:scale(1.3);} 50%{opacity:0.3;transform:scale(1);} 75%{opacity:0.8;transform:scale(1.2);} }
        .animate-twinkle { animation:twinkle 5s ease-in-out infinite; }
        *:focus-visible { outline: 2px solid rgba(16,185,129,0.5); outline-offset: 4px; border-radius:0.5rem; }
      `}</style>
    </motion.div>
  );
};
