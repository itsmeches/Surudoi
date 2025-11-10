"use client";
import React, { useState, useEffect } from 'react';

export const Header = () => {
  const [activeSection, setActiveSection] = useState('home');

  const handleScroll = () => {
    const sections = ['home', 'projects', 'about', 'contacts'];
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        const { offsetTop, clientHeight } = sectionElement;
        if (scrollY >= offsetTop - 64 && scrollY < offsetTop + clientHeight - 64) {
          setActiveSection(section);
        }
      }
    });
  };

  const handleNavClick = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 mt-2 flex justify-center items-center z-20">
      <nav className="flex gap-1 p-2 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        <a
          onClick={() => handleNavClick('home')}
          className={`nav-item ${activeSection === 'home' ? 'bg-white text-gray-900' : 'hover:bg-white/70 hover:text-gray-900'}`}
        >
          Home
        </a>
        <a
          onClick={() => handleNavClick('projects')}
          className={`nav-item ${activeSection === 'projects' ? 'bg-white text-gray-900' : 'hover:bg-white/70 hover:text-gray-900'}`}
        >
          Projects
        </a>
        <a
          onClick={() => handleNavClick('about')}
          className={`nav-item ${activeSection === 'about' ? 'bg-white text-gray-900' : 'hover:bg-white/70 hover:text-gray-900'}`}
        >
          About
        </a>
        <a
          onClick={() => handleNavClick('contacts')}
          className={`nav-item ${activeSection === 'contacts' ? 'bg-white text-gray-900' : 'hover:bg-white/70 hover:text-gray-900'}`}
        >
          Contacts
        </a>
      </nav>
    </div>
  );
};
