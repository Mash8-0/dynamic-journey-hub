import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuccessSection from "@/components/SuccessSection";

const SuccessStory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <SuccessSection />
      </div>
      <Footer />
    </div>
  );
};

export default SuccessStory;
