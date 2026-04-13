import Image from 'next/image';
import Ampalaya from "@/assets/images/Ampalaya.png";
import Smart from "@/assets/images/Smart Admission.png";
import Inventory from "@/assets/images/Inventory system.png";
import Coffee from "@/assets/images/Liberica.png";
import PPT from "@/assets/images/ppt.png";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from '@/assets/icons/arrow-up-right.svg';
import grainImage from '@/assets/images/grain.jpg';
import { SectionHeader } from '@/components/SectionHeader';
import { Card } from '@/components/Card';
const portfolioProjects = [
  {
    company: "Department of Agriculture",
    year: "2024",
    title: "AI-Powered Leaf & Soil Nutrient Analysis System",
    results: [
      { title: "Improved diagnostic accuracy for NPK detection by 87%" },
      { title: "Reduced manual analysis time by 65% using CNN models" },
      { title: "Increased user engagement by 42% through optimized UI/UX" },
    ],
    link: "https://npknows.vercel.app/",
    image: Ampalaya,
  },
  {
    company: "National University - Lipa",
    year: "2025",
    title: "Smart Admission & Applicant Management System",
    results: [
      { title: "Reduced applicant processing time by 55%" },
      { title: "Increased system efficiency and data accuracy by 48%" },
      { title: "Improved user adoption rate by 38% across applicants and staff" },
    ],
    link: "https://github.com/itzjmbruhhh/NU_Admission",
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
    image: Coffee,
  },

  {
    company: "3 BROTHER STORE",
    year: "2024",
    title: "Automated Inventory Management System with Barcode Integration",
    results: [
      { title: "Reduced inventory tracking errors by 68%" },
      { title: "Improved stock monitoring efficiency by 57%" },
      { title: "Accelerated transaction processing time by 45%" },
    ],
    link: "https://github.com/itsmeches/Inventory-System_PHP",
    image: Inventory,
  },
  {
    company: "Personal Project",
    year: "2023",
    title: "AI-Powered PPT-to-Reviewer Content Generator",
    results: [
      { title: "Reduced study material preparation time by 75%" },
      { title: "Improved content comprehension for users by 50%" },
      { title: "Adopted by 100+ students for automated reviewer generation" },
    ],
    link: "https://github.com/itsmeches/PPT-to-TRANSES",
    image: PPT,
  },
];

export const ProjectsSection = () => {
  return (
  <section id="projects" className='pb-16 lg:py-24 '>
    <div className="container">
      <SectionHeader eyebrow='Real-world Results' title='Featured Projects' description='See how I transformed concepts into engaging digital experiences.'/>
      
      <div className='mt-10 md:mt-20 flex flex-col gap-20'>
      {portfolioProjects.map((project, projectIndex) => (
      <Card
      key={project.title}
      className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"
      style={{ top: `calc(64px + ${projectIndex * 20}px)` }}
      >
            <div className='lg:grid lg:grid-cols-2 lg:gap-16'>
              <div className='lg:pb-16'>
            <div className='bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text'>
              <span>{project.company}</span>
              <span>&bull;</span>
              <span>{project.year}</span>
              </div>
              <h3 className='font-serif text-2xl mt-2 md:md-5 md:text-4xl'>{project.title}</h3>
              <hr className='border-t-2 border-white/5 mt-4 md:mt-5'/>
              <ul className='flex flex-col gap-4 mt-4 md:mt-5 '>
                {project.results.map((result) => (
                  <li className='flex gap-2 text-sm md:text-base text-white/50' key={result.title}>
                    <CheckCircleIcon className="size-5 md:size-6"/>
                    <span>{result.title}</span>
                  </li>
                ))}
              </ul>
              <a href={project.link}>
              <button className='bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8'>
                <span> Visit Live Site </span>
                <ArrowUpRightIcon className="size-4 " />
                </button>
              </a>
              </div>
              <div className='Relative'>
              <Image src={project.image} alt={project.title} className='mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none' />
              </div>
          </div>
          </Card>

        ))}
      </div>
    </div>
  </section>);
};
