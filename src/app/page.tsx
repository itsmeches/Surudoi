import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { ExperienceSection } from "@/sections/Experience";
import { AboutSection } from "@/sections/About";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
