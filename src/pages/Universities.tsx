import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UniversitiesSection from "@/components/UniversitiesSection";

const Universities = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <UniversitiesSection />
      </div>
      <Footer />
    </div>
  );
};

export default Universities;
