"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { ToolboxItems } from "@/components/ToolboxItems";
import Image from "next/image";
import { CardHeader } from "@/components/CardHeader";
import { motion, AnimatePresence } from "framer-motion";
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

  // Auto-slide every 4 seconds
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
              <p className="text-gray-300 text-sm leading-relaxed px-4 pb-4 text-justify">
                Since childhood, I’ve been fascinated by technology and problem-solving. In Grade 8, I
                started programming in C, creating simple <em>Hello World</em> programs and basic games
                that sparked my curiosity for development.
                <br />
                <br />
                Later, I became a streamer under the name{" "}
                <span className="text-emerald-300 font-semibold">“Surudoi”</span>, meaning{" "}
                <em>sharp</em> and <em>focused</em> — traits that define quick thinking and precision.
                Today, I channel that mindset into coding, staying analytical, curious, and driven to
                craft efficient and thoughtful solutions in Computer Science.
              </p>
            </Card>

           <Card className="h-[370px] md:col-span-2 lg:col-span-1 p-0 overflow-hidden perspective-1000">
  <div className="relative w-full h-full flex items-center justify-center">
    {journeyImages.map((img, index) => {
      const total = journeyImages.length;

      // Circular index for infinite rotation
      let offset = index - currentIndex;
      if (offset < -Math.floor(total / 2)) offset += total;
      if (offset > Math.floor(total / 2)) offset -= total;

      // Determine if this is the active or the next/prev
      const isActive = offset === 0;
      const isAdjacent = Math.abs(offset) === 1;

      return (
        <motion.div
          key={img.alt}
          animate={{
            opacity: isActive ? 1 : 0, // Only active fully visible
            z: isActive ? 0 : -100,
            rotateY: isActive ? 0 : offset * 30,
            scale: isActive ? 1 : 0.8,
            x: isActive ? 0 : offset * 80,
          }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 25 }}
          className="absolute w-3/4 md:w-full h-full cursor-pointer"
          onClick={() => setCurrentIndex(index)}
        >
          <Image
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover rounded-lg shadow-lg border border-gray-800/20"

          />
        </motion.div>
      );
    })}
  </div>
{/* comment muna for the mean time kasi ang panget */}
  {/* Navigation Arrows */}
  {/* <button
    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-emerald-300 text-2xl font-bold z-10"
    onClick={() =>
      setCurrentIndex((prev) => (prev - 1 + journeyImages.length) % journeyImages.length)
    }
  >
    ‹
  </button>
  <button
    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-emerald-300 text-2xl font-bold z-10"
    onClick={() => setCurrentIndex((prev) => (prev + 1) % journeyImages.length)}
  >
    ›
  </button> */}
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
            <Card className="h-[320] p-0 relative md:col-span-2 lg:col-span-2">
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
                <Image src={mapemoji} alt="Smiling memoji" className="size-13.4" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
