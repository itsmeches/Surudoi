"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV = [
  { id: "log", label: "Work", index: "01" },
  { id: "experience", label: "Experience", index: "02" },
  { id: "about", label: "About", index: "03" },
  { id: "contacts", label: "Contact", index: "04" },
];

export const Header = () => {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    ["home", "about", "experience", "log", "contacts"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 motion-safe:animate-chrome-in">
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 bg-page/95 border-b border-line/70 transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="container flex h-16 items-center justify-between">
        <button
          onClick={() => scrollTo("home")}
          className="group inline-flex items-baseline gap-2"
          aria-label="Go to top"
        >
          <span className="display font-serif text-[15px] text-fg">Chester Andaya</span>
          <span className="eyebrow hidden sm:inline">— working record</span>
        </button>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  aria-current={active === item.id ? "page" : undefined}
                  className={`relative flex items-center gap-2 px-3 py-2 text-sm transition-colors duration-150 ${
                    active === item.id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  <span className="mono text-[10px] text-accent">{item.index}</span>
                  {item.label}
                  {active === item.id && (
                    <span className="absolute left-3 right-3 -bottom-px h-px bg-fg" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/cv.pdf"
            download="Chester-Andaya-CV.pdf"
            className="hidden sm:inline-flex h-9 items-center border border-line/70 px-4 text-sm font-medium text-muted hover:text-fg hover:border-line transition-colors duration-150"
          >
            Resume
          </a>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center border border-line/70 text-muted hover:text-fg hover:border-line transition-colors duration-150 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

          <ThemeToggle />
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="border-t border-line/70 bg-page px-6 pb-5 pt-4 md:hidden"
        >
          <nav aria-label="Mobile" className="container">
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`flex w-full items-center gap-3 border-b border-line/50 px-1 py-3 text-left text-sm transition-colors duration-150 ${
                      active === item.id ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    <span className="mono text-[10px] text-accent">{item.index}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};
