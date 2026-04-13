import Image from 'next/image';
import Ampalaya from "@/assets/images/Ampalaya.png";
import Smart from "@/assets/images/Smart Admission.png";
import Inventory from "@/assets/images/Inventory system.png";
import Coffee from "@/assets/images/Liberica.png";
import PPT from "@/assets/images/ppt.png";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg';
import GithubIcon from '@/assets/icons/github.svg';
import { SectionHeader } from '@/components/SectionHeader';
import { Card } from '@/components/Card';

const portfolioProjects = [
  {
    company: "Department of Agriculture",
    year: "2024",
    title: "AI-Powered Leaf & Soil Nutrient Analysis System",
    results: [
      { title: "Improved NPK diagnostic accuracy by 87% using CNN models" },
      { title: "Reduced manual soil analysis time by 65%" },
      { title: "Increased user engagement by 42% through optimized UI/UX" },
    ],
    link: "https://npknows.vercel.app/",
    isGithub: false,
    image: Ampalaya,
  },
  {
    company: "National University - Lipa",
    year: "2025",
    title: "Smart Admission & Applicant Management System",
    results: [
      { title: "Digitized end-to-end admissions flow for 500+ applicants" },
      { title: "Reduced manual processing time by 55% vs paper-based system" },
      { title: "Improved data accuracy and staff efficiency by 48%" },
    ],
    link: "https://github.com/itzjmbruhhh/NU_Admission",
    isGithub: true,
    image: Smart,
  },
  {
    company: "Department of Agriculture",
    year: "2026",
    title: "BarakoSenser: AI-Based Coffee Authenticity Classifier",
    results: [
      { title: "Achieved 91% classification accuracy for Coffee Liberica" },
      { title: "Reduced authentication time by 70% using ML inference" },
      { title: "Improved detection consistency by 60% vs manual inspection" },
    ],
    link: "https://barakosense-484055099685.asia-southeast1.run.app/",
    isGithub: false,
    image: Coffee,
  },
  {
    company: "3 Brother Store",
    year: "2024",
    title: "Automated Inventory Management System with Barcode Integration",
    results: [
      { title: "Reduced inventory tracking errors by 68%" },
      { title: "Improved stock monitoring efficiency by 57%" },
      { title: "Accelerated transaction processing time by 45%" },
    ],
    link: "https://github.com/itsmeches/Inventory-System_PHP",
    isGithub: true,
    image: Inventory,
  },
  {
    company: "Personal Project",
    year: "2023",
    title: "AI-Powered PPT-to-Reviewer Content Generator",
    results: [
      { title: "Reduced study material prep time by 75% per session" },
      { title: "Adopted by 100+ students for automated reviewer generation" },
      { title: "Improved content comprehension scores by 50% in user testing" },
    ],
    link: "https://github.com/itsmeches/PPT-to-TRANSES",
    isGithub: true,
    image: PPT,
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Real-world Results"
          title="Featured Projects"
          description="See how I transformed concepts into engaging digital experiences."
        />

        <div className="mt-10 md:mt-20 flex flex-col gap-20">
          {portfolioProjects.map((project, projectIndex) => (
            <Card
              key={project.title}
              className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"
              style={{ top: `calc(64px + ${projectIndex * 20}px)` }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                <div className="lg:pb-16">
                  <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-serif text-2xl mt-2 md:mb-5 md:text-4xl">
                    {project.title}
                  </h3>

                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />

                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.map((result) => (
                      <li
                        className="flex gap-2 text-sm md:text-base text-white/50"
                        key={result.title}
                      >
                        <CheckCircleIcon className="size-5 md:size-6 flex-shrink-0" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>

                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <button className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8 hover:bg-gray-100 transition-colors duration-200">
                      {project.isGithub ? (
                        <>
                          <GithubIcon className="size-4" />
                          <span>View Code</span>
                        </>
                      ) : (
                        <>
                          <span>Visit Live Site</span>
                          <ArrowUpRightIcon className="size-4" />
                        </>
                      )}
                    </button>
                  </a>
                </div>

                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};