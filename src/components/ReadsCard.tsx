"use client";
// components/ReadsCard.tsx

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const books = [
  {
    src: "/books/book-assembly.png",
    title: "Advanced Assembly Language",
    author: "Steven Holzner & Peter Norton",
    tag: "Low-Level Systems",
    tagColor: "from-sky-400/20 to-sky-400/5 border-sky-400/30 text-sky-300",
    dotColor: "bg-sky-400",
    takeaway: "Understanding how machines think at the hardware level sharpens every layer of software above it.",
    relevance: "Systems & Optimization",
  },
  {
    src: "/books/book-game-theory.png",
    title: "Introducing Game Theory",
    author: "Ivan Pastine & Tom Humberstone",
    tag: "Strategic Thinking",
    tagColor: "from-emerald-400/20 to-emerald-400/5 border-emerald-400/30 text-emerald-300",
    dotColor: "bg-emerald-400",
    takeaway: "Game theory reframed how I model decision-making — directly applicable to multi-agent ML and optimization.",
    relevance: "AI & Decision Models",
  },
  {
    src: "/books/book-relativity.png",
    title: "Introducing Relativity",
    author: "Bruce Bassett & Ralph Edney",
    tag: "Mathematical Curiosity",
    tagColor: "from-violet-400/20 to-violet-400/5 border-violet-400/30 text-violet-300",
    dotColor: "bg-violet-400",
    takeaway: "Tackling complex physics builds comfort with abstraction — the same muscle needed for deep learning theory.",
    relevance: "Deep Learning Theory",
  },
  {
    src: "/books/book-atomic-habits.png",
    title: "Atomic Habits",
    author: "James Clear",
    tag: "Discipline & Growth",
    tagColor: "from-amber-400/20 to-amber-400/5 border-amber-400/30 text-amber-300",
    dotColor: "bg-amber-400",
    takeaway: "Small consistent improvements compound into expertise. Shaped how I approach learning new technologies.",
    relevance: "Growth Mindset",
  },
  {
    src: "/books/book-how-to-win.png",
    title: "How to Win Friends & Influence People",
    author: "Dale Carnegie",
    tag: "Communication",
    tagColor: "from-rose-400/20 to-rose-400/5 border-rose-400/30 text-rose-300",
    dotColor: "bg-rose-400",
    takeaway: "Sharpened how I communicate ideas, collaborate with teams, and present research to non-technical audiences.",
    relevance: "Research Presentation",
  },
];

export const ReadsCard = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const dragStartX = useRef(0);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => goTo(current === 0 ? books.length - 1 : current - 1);
  const next = () => goTo(current === books.length - 1 ? 0 : current + 1);

  const book = books[current];

  return (
    <div className="flex flex-col flex-1 min-h-0 px-3 sm:px-4 pb-3 sm:pb-4 mt-1 gap-3">

      {/* Slide area */}
      <div
        className="relative overflow-hidden"
        style={{ minHeight: "clamp(170px, 26vw, 230px)" }}
        onTouchStart={(e) => { dragStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const diff = dragStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
        }}
        onMouseDown={(e) => { dragStartX.current = e.clientX; }}
        onMouseUp={(e) => {
          const diff = dragStartX.current - e.clientX;
          if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex gap-4"
          >

            {/* Book cover */}
            <div
              className="flex-shrink-0 relative rounded-xl overflow-hidden ring-1 ring-white/10"
              style={{
                width: "clamp(72px, 12vw, 92px)",
                height: "clamp(100px, 18vw, 130px)",
              }}
            >
              <Image
                src={book.src}
                alt={book.title}
                fill
                className="object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Book info */}
            <div className="flex flex-col justify-between flex-1 min-w-0 py-1 overflow-hidden">

              {/* Top */}
              <div className="flex flex-col gap-2">

                {/* 🔥 iOS-style Tag */}
                <span
                  className={`
                    inline-flex items-center gap-1.5
                    max-w-[160px] sm:max-w-[200px]
                    whitespace-nowrap
                    px-3 py-1 rounded-full
                    bg-gradient-to-r ${book.tagColor}
                    border border-white/10
                    text-[10px] sm:text-[11px]
                    font-semibold tracking-wide
                    shadow-[0_0_12px_rgba(255,255,255,0.05)]
                    backdrop-blur-sm
                  `}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${book.dotColor} animate-pulse`} />
                  <span className="truncate">
                    {book.tag}
                  </span>
                </span>

                {/* Title */}
                <h4 className="text-white font-serif font-bold leading-snug line-clamp-2 text-sm">
                  {book.title}
                </h4>

                {/* Author */}
                <p className="text-white/40 text-xs">
                  {book.author}
                </p>
              </div>

              {/* Takeaway */}
              <div className="mt-2">
                <span className="text-[9px] uppercase tracking-widest text-white/25 font-semibold">
                  Key Takeaway
                </span>
                <p className="text-white/65 text-xs leading-relaxed max-h-[3.5rem] overflow-y-auto pr-1 custom-scrollbar mt-1">
                  {book.takeaway}
                </p>
              </div>

              {/* Relevance */}
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mt-2">
                <span className="text-white/25 text-[9px] uppercase tracking-widest font-semibold whitespace-nowrap">
                  Applies to
                </span>
                <span className="text-[10px] font-semibold break-words text-white/70">
                  {book.relevance}
                </span>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-400/15 to-transparent" />

      {/* Controls */}
      <div className="flex items-center justify-between gap-2 flex-wrap">

        <div className="flex gap-1.5 items-center flex-wrap">
          {books.map((b, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === current
                  ? `w-5 h-1.5 ${b.dotColor} shadow-[0_0_6px_rgba(16,185,129,0.4)]`
                  : "w-1.5 h-1.5 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-white/25 text-xs font-mono">
            {String(current + 1).padStart(2, "0")} / {String(books.length).padStart(2, "0")}
          </span>
          <button className="w-7 h-7 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10" onClick={prev}>‹</button>
          <button className="w-7 h-7 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10" onClick={next}>›</button>
        </div>

      </div>
    </div>
  );
};