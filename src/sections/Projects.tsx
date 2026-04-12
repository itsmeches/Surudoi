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
    title: "Leaf-Based and Soil Nutrient Analyzer",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Improved site speed by 50%" },
      { title: "Increased mobile traffic by 35%" },
    ],
    link: "https://npknows.vercel.app/",
    image: Ampalaya,
  },
  {
    company: "National University - Lipa",
    year: "2025",
    title: "NU-LIPA Smart Admission System",
    results: [
      { title: "Boosted sales by 20%" },
      { title: "Expanded customer reach by 35%" },
      { title: "Increased brand awareness by 15%" },
    ],
    link: "https://github.com/itzjmbruhhh/NU_Admission",
    image: Smart,
  },

   {
    company: "Department of Agriculture",
    year: "2026",
    title: "BarakoSenser: Coffee Liberica Authenticity Classifier",
    results: [
      { title: "Boosted sales by 20%" },
      { title: "Expanded customer reach by 35%" },
      { title: "Increased brand awareness by 15%" },
    ],
    link: "https://barakosense-484055099685.asia-southeast1.run.app/",
    image: Coffee,
  },





  {
    company: "3 BROTHER STORE",
    year: "2024",
    title: "Company Inventory System",
    results: [
      { title: "Boosted sales by 20%" },
      { title: "Expanded customer reach by 35%" },
      { title: "Increased brand awareness by 15%" },
    ],
    link: "https://github.com/itsmeches/Inventory-System_PHP",
    image: Inventory,
  },
  {
    company: "Personal Project",
    year: "2023",
    title: "PPT to Reviewer",
    results: [
      { title: "Enhanced user experience by 40%" },
      { title: "Responsive site with machine learning" },
      { title: "Help a lot of students" },
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
