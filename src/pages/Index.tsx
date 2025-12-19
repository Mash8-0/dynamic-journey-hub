import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import UniversitiesSection from "@/components/UniversitiesSection";
import SuccessSection from "@/components/SuccessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <>
      <SEOHead
        title="Global Consultancy | Study Abroad Experts - Your Gateway to International Education"
        description="Expert study abroad consultancy helping students achieve their dreams of international education. Visa assistance, university admissions, and personalized guidance for studying in USA, UK, Canada, Australia & more."
        keywords="study abroad, international education, visa consultancy, university admission, student visa, overseas education, education consultant"
        canonicalUrl="https://globalconsultancy.com"
      />
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
    </>
  );
};

export default Index;
