import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import UniversitiesSection from "@/components/UniversitiesSection";
import SuccessSection from "@/components/SuccessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <UniversitiesSection />
      <ServicesSection />
      <ProcessSection />
      <SuccessSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
