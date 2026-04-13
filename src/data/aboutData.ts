// data/aboutData.ts
// ── Edit these values anytime to update your About cards ──

// ── ACHIEVEMENTS SLIDESHOW ──
// Place your photos in /public/achievements/
// Then update the src paths below to match your filenames.


import LaptopIcon from "@/assets/icons/laptop.svg";
import MedalIcon from "@/assets/icons/medal.svg";
import CodeIcon from "@/assets/icons/code.svg";
import BrainIcon from "@/assets/icons/brain.svg";
import GraduationCapIcon from "@/assets/icons/graduation-cap.svg";
import EyeIcon from "@/assets/icons/eye.svg";
import RobotIcon from "@/assets/icons/bot.svg";
import GamepadIcon from "@/assets/icons/gamepad-2.svg";



export const achievementSlides = [
  {
    src: "/achievements/tokyo.jpg",
    alt: "ICMCR 2026 Tokyo Presentation",
    badge: MedalIcon,
    title: "ICMCR 2026 — Tokyo, Japan",
    description: "Presented machine learning research at an international conference, demonstrating strong technical communication and global academic exposure.",
  },
  {
    src: "/achievements/deans-list.jpg",
    alt: "Dean's List Recognition",
    badge: GraduationCapIcon,
    title: "Dean’s Lister",
    description: "Maintained consistent academic excellence with a GPA of 3.64/4.00, reflecting discipline and strong technical foundations.",
  },
  {
    src: "/achievements/ic3.jpg",
    alt: "IC3 Certification",
    badge: LaptopIcon,
    title: "IC3 Digital Literacy Certified",
    description: "Earned a globally recognized certification validating proficiency in computing fundamentals and digital technologies.",
  },
  {
    src: "/achievements/open-day.png",
    alt: "Open Day System Presentation",
    badge: BrainIcon,
    title: "System Presentation — Open Day",
    description: "Presented a functional software system to a live audience, showcasing real-world application and clear technical communication.",
  },
  {
    src: "/achievements/teaching.jpg",
    alt: "Teaching Elementary Students",
    badge: CodeIcon,
    title: "Technology Instructor",
    description: "Taught elementary students Microsoft Office tools, demonstrating leadership and the ability to simplify complex concepts.",
  },
  {
    src: "/achievements/facebook.png",
    alt: "1 Million Views Achievement",
    badge: MedalIcon,
    title: "1M+ Views on Facebook",
    description: "Achieved over 1,000,000 views through content creation, showcasing audience engagement and digital platform understanding.",
  },
  {
    src: "/achievements/valorant.jpg",
    alt: "Valorant Team Leadership",
    badge: GamepadIcon,
    title: "Valorant Champion — In-Game Leader",
    description: "Led a competitive team as in-game leader, applying strategic decision-making, teamwork, and performance under pressure.",
  },
];

// ── IMPACT STATS ──

export const impacts = [
  {
    value: "1M+",
    suffix: "",
    label: "Total Content Views",
    sublabel: "Across all platforms",
    icon: EyeIcon,
  },
  {
    value: "100+",
    suffix: "",
    label: "Developers Taught",
    sublabel: "Via coding tutorials",
    icon: CodeIcon,
  },
  {
    value: "ML Research",
    suffix: " ",
    label: "Published Work",
    sublabel: "Mechatronics & Robotics",
    icon: RobotIcon,
  },
];