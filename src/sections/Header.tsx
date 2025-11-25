"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Header = () => {
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = () => {
    const sections = ["home", "about", "projects", "contacts"];
    const scrollY = window.scrollY;
    const header = document.querySelector("nav");
    const headerOffset = header?.clientHeight || 80;
    const windowHeight = window.innerHeight;

    sections.forEach((section, index) => {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        const { offsetTop, clientHeight } = sectionElement;

        // Fix for the last section
        if (index === sections.length - 1) {
          if (scrollY + windowHeight >= offsetTop + clientHeight / 2) {
            setActiveSection(section);
          }
        } else {
          if (
            scrollY >= offsetTop - headerOffset &&
            scrollY < offsetTop + clientHeight - headerOffset
          ) {
            setActiveSection(section);
          }
        }
      }
    });
  };

  const handleNavClick = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const header = document.querySelector("nav");
    const headerOffset = header?.clientHeight || 80;

    if (sectionElement) {
      const elementPosition =
        sectionElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 mt-2 flex justify-center items-center z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 2.5 }} // delay syncs with Hero fade-in
    >
      <nav className="flex gap-1 p-2 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        {[
          { id: "home", label: "Home" },
          { id: "about", label: "About" },
          { id: "projects", label: "Projects" },
          { id: "contacts", label: "Contacts" },
        ].map((link) => (
          <a
            key={link.id}
            onClick={() => handleNavClick(link.id)}
            className={`nav-item cursor-pointer px-4 py-1 rounded-full transition-colors duration-200 ${
              activeSection === link.id
                ? "bg-white text-gray-900"
                : "hover:bg-white/70 hover:text-gray-900"
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </motion.div>
  );
};
