"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { ToolboxItems } from "@/components/ToolboxItems";
import Image from "next/image";
import { CardHeader } from "@/components/CardHeader";
import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

import Childhood from "@/assets/images/Childhood.png";
import SurudoiProf from "@/assets/images/Surudoi.jpg";
import CorporateProf from "@/assets/images/CorpoProf.png";
import bookImage from "@/assets/images/book-cover.png";
import JavascriptIcon from "@/assets/icons/square-js.svg";
import HTMLIcon from "@/assets/icons/html5.svg";
import CSSIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import ChromeIcon from "@/assets/icons/chrome.svg";
import GithubIcon from "@/assets/icons/github.svg";
import mapImage from "@/assets/images/map.png";
import mapemoji from "@/assets/images/mapmoji.png";

const toolboxItems = [
  { title: "Javascript", iconType: JavascriptIcon },
  { title: "HTML5", iconType: HTMLIcon },
  { title: "CSS3", iconType: CSSIcon },
  { title: "REACT", iconType: ReactIcon },
  { title: "Chrome", iconType: ChromeIcon },
  { title: "Github", iconType: GithubIcon },
];

const hobbies = [
  { title: "Painting", emoji: "🎨", left: "5%", top: "5%" },
  { title: "Photography", emoji: "📷", left: "50%", top: "5%" },
  { title: "Hiking", emoji: "⛰️", left: "35%", top: "40%" },
  { title: "Gaming", emoji: "🕹️", left: "10%", top: "35%" },
  { title: "Music", emoji: "🎸", left: "70%", top: "45%" },
  { title: "Fitness", emoji: "💪", left: "5%", top: "65%" },
  { title: "Reading", emoji: "📚", left: "45%", top: "70%" },
];

const journeyImages = [
  { src: Childhood, alt: "Childhood Profile" },
  { src: SurudoiProf, alt: "Surudoi Profile" },
  { src: CorporateProf, alt: "Corporate Profile" },
];

export const AboutSection = () => {
  const constraintRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % journeyImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="about" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A glimpse Into my World"
          description="Learn more about who I am, What I do, and what inspires me"
        />

        <div className="mt-20 flex flex-col gap-8">
          {/* FIRST ROW */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Journey Text */}
            <Card className="min-h-[320px] flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <CardHeader
                title="My Journey"
                description="From childhood curiosity to coding with sharp focus."
                className="text-center whitespace-normal lg:whitespace-nowrap"
              />
              <p className="text-gray-300 text-sm md:text-base leading-relaxed px-4 pb-4 text-justify">
                Since childhood, I've been fascinated by technology and problem-solving. In Grade 8, I started 
                programming in C, creating simple <em>Hello World</em> programs and basic games that sparked 
                my curiosity for development.
                <br />
                <br />
                Later, I became a game streamer under the name{" "}
                <span className="text-emerald-300 font-semibold">"Surudoi"</span> (鋭い) — meaning{" "}
                <em>sharp</em> and <em>focused</em>. Eventually, I shifted to creating{" "}
                <span className="text-emerald-300 font-semibold">coding tutorials</span>, turning my 
                forgetfulness into a strength by documenting what I learn while teaching others the daily 
                realities of programming. Today, I channel that same analytical mindset into Machine Learning, 
                staying curious and driven to craft thoughtful solutions.
              </p>
            </Card>

            {/* Surudoi-Branded Photo Carousel */}
            <Card className="h-[430px] md:col-span-2 lg:col-span-1 p-0 overflow-hidden relative bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-950/20">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-emerald-400/5 [mask-image:radial-gradient(circle_at_center,black,transparent)]"></div>
              
              <div className="relative w-full h-full flex items-center justify-center p-4">
                {journeyImages.map((img, index) => {
                  const total = journeyImages.length;

                  // Circular index for infinite rotation
                  let offset = index - currentIndex;
                  if (offset < -Math.floor(total / 2)) offset += total;
                  if (offset > Math.floor(total / 2)) offset -= total;

                  const isActive = offset === 0;

                  return (
                    <motion.div
                      key={img.alt}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        z: isActive ? 0 : -100,
                        scale: isActive ? 1 : 0.85,
                        rotateY: isActive ? 0 : offset * 20,
                      }}
                      transition={{ 
                        duration: 0.7, 
                        type: "spring", 
                        stiffness: 150, 
                        damping: 20,
                        opacity: { duration: 0.5 }
                      }}
                      className="absolute w-full h-full cursor-pointer"
                      onClick={() => setCurrentIndex(index)}
                      style={{ perspective: "1000px" }}
                    >
                      <div className="relative w-full h-full p-4">
                        {/* Emerald border glow for active image */}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 rounded-2xl border-2 border-emerald-400/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                          />
                        )}
                        
                        {/* Sharp focus ring - Surudoi symbolism */}
                        {isActive && (
                          <motion.div
                            animate={{ 
                              scale: [1, 1.02, 1],
                              opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-emerald-300/10 blur-xl"
                          />
                        )}

                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className={`object-cover rounded-2xl shadow-2xl transition-all duration-700 ${
                            isActive 
                              ? "border-2 border-emerald-400/40" 
                              : "border border-gray-700/50"
                          }`}
                          style={{
                            filter: isActive ? "grayscale(0) brightness(1)" : "grayscale(0.3) brightness(0.7)",
                          }}
                        />

                        {/* Corner accent - Sharp/Precision indicator */}
                        {isActive && (
                          <div className="absolute top-6 right-6 w-3 h-3">
                            <div className="absolute inset-0 bg-emerald-400 rounded-full animate-pulse"></div>
                            <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping"></div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Sleek Navigation Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-gray-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-400/20">
                {journeyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex 
                        ? "w-8 h-2 bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                        : "w-2 h-2 bg-gray-500 hover:bg-emerald-300/50"
                    }`}
                    aria-label={`View ${journeyImages[index].alt}`}
                  />
                ))}
              </div>

              {/* Image label overlay */}
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 left-6 z-10 bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-emerald-400/30"
              >
                <span className="text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                  {journeyImages[currentIndex].alt}
                </span>
              </motion.div>
            </Card>

            {/* Reads */}
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader
                title="My Reads"
                description="Explore the books shaping my perspectives."
              />
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={bookImage} alt="Book cover" />
              </div>
            </Card>

            {/* Toolbox */}
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Toolbox"
                description="Explore the technologies and tools I use to craft exceptional digital experiences."
              />
              <ToolboxItems
                items={toolboxItems}
                className="mt-1"
                itemsWrapperClassName="animate-move-left [animation-duration:30s]"
              />
              <ToolboxItems
                items={toolboxItems}
                className="mt-3"
                itemsWrapperClassName="animate-move-right [animation-duration:15s]"
              />
            </Card>
          </div>

          {/* Hobbies & Map */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <Card className="h-[320px] flex flex-col md:col-span-3 lg:col-span-3">
              <CardHeader
                title="Beyond the Code"
                description="Explore my interest and hobbies beyond the digital realm."
              />
              <div className="relative flex-1" ref={constraintRef}>
                {hobbies.map((hobby) => (
                  <motion.div
                    key={hobby.title}
                    className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute"
                    style={{
                      left: hobby.left,
                      top: hobby.top,
                    }}
                    drag
                    dragConstraints={constraintRef}
                  >
                    <span className="font-medium text-gray-950">{hobby.title}</span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
            <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-2">
              <Image
                src={mapImage}
                alt="map"
                className="h-full w-full object-cover object-left-top"
              />
              <div
                className="absolute top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2 size-20 rounded-full  after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
                <Image src={mapemoji} alt="Smiling memoji" className="size-20 rounded-full" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};