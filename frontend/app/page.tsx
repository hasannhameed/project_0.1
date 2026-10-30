import PortfolioHeader from "@/components/hasan/PortfolioHeader";
import HeroSection from "@/components/hasan/HeroSection";
import ServicesSection from "@/components/hasan/ServicesSection";
import SkillsSection from "@/components/hasan/SkillsSection";
import EducationSection from "@/components/hasan/EducationSection";
import ExperienceSection from "@/components/hasan/ExperienceSection";
import ContactSection from "@/components/hasan/ContactSection";

export default function Home() {
  return (
    <main className="portfolio-root min-h-screen bg-black font-poppins text-white">
      <PortfolioHeader />
      <HeroSection />
      <ServicesSection />
      <SkillsSection />
      <EducationSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
