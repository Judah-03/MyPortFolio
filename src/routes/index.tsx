import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Portfolio — Développeur Full Stack Junior" },
      { name: "description", content: "Développeur web full stack junior, étudiant en L3 Informatique à l'EMIT Fianarantsoa. React, Django, Spring Boot, Flutter." },
      { property: "og:title", content: "Portfolio — Développeur Full Stack Junior" },
      { property: "og:description", content: "Développeur web full stack junior passionné par les technologies modernes." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
