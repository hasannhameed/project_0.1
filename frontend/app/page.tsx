import PortfolioHeader from "@/components/hasan/PortfolioHeader";
import HeroSection from "@/components/hasan/HeroSection";
import ServicesSection from "@/components/hasan/ServicesSection";
import SkillsSection from "@/components/hasan/SkillsSection";
import EducationSection from "@/components/hasan/EducationSection";
import ExperienceSection from "@/components/hasan/ExperienceSection";

export default function Home() {
  return (
    // overflow-x-clip, not hidden: hidden would make main a scroll container
    // and break the anchor links' scroll-mt offset.
    <main className="portfolio-root w-full min-h-screen overflow-x-clip bg-black font-poppins text-white">
      <PortfolioHeader />
      <HeroSection />
      <ServicesSection />
      <SkillsSection />
      <EducationSection />
      <ExperienceSection />
    </main>
  );
}
