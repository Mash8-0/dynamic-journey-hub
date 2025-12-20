import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <ServicesSection />
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Services;
