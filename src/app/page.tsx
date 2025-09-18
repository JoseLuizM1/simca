import AboutSection from "@/components/about-section";
import HeroSection from "@/components/hero-section";
import JoinSection from "@/components/join-section";
import NewlestedSection from "@/components/newlested-section";
import NoticesSection from "@/components/notices-section";
import ServicesSection from "@/components/services-section";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <NewlestedSection />
      <NoticesSection />
      <ServicesSection />
      <JoinSection />      
    </main>
  );
}
