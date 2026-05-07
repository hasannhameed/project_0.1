import HeroSection from "@/components/jack/HeroSection";
import MarqueeSection from "@/components/jack/MarqueeSection";
import AboutSection from "@/components/jack/AboutSection";
import ServicesSection from "@/components/jack/ServicesSection";
import SkillsSection from "@/components/jack/SkillsSection";
import ProjectsSection from "@/components/jack/ProjectsSection";
import PricingSection from "@/components/jack/PricingSection";
import ContactSection from "@/components/jack/ContactSection";

export default function Home() {
  return (
    <main
      className="font-kanit text-white"
      style={{ background: "#0C0C0C", overflowX: "clip" }}
    >
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <PricingSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
