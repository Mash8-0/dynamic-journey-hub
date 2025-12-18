import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProcessSection from "@/components/ProcessSection";

const Processing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <ProcessSection />
      </div>
      <Footer />
    </div>
  );
};

export default Processing;
