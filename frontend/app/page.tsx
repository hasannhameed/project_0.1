import HeroSection from "@/components/hasan/HeroSection";
import MarqueeSection from "@/components/hasan/MarqueeSection";
import AboutSection from "@/components/hasan/AboutSection";
import ServicesSection from "@/components/hasan/ServicesSection";
import SkillsSection from "@/components/hasan/SkillsSection";
import ProjectsSection from "@/components/hasan/ProjectsSection";
import PricingSection from "@/components/hasan/PricingSection";
import ContactSection from "@/components/hasan/ContactSection";
import Footer from "@/components/hasan/Footer";

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
      <Footer />
    </main>
  );
}
