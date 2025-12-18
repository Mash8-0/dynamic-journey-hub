import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Target, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
                Your Trusted Partner in <span className="gradient-text">Global Education</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                We are dedicated to helping students achieve their dreams of studying abroad with personalized guidance and expert support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  At VisaRoute, we believe every student deserves the opportunity to access world-class education. Our mission is to bridge the gap between ambitious students and top universities worldwide.
                </p>
                <p className="text-muted-foreground">
                  With over 10 years of experience, we have helped thousands of students navigate the complex visa and admission processes, making their educational dreams a reality.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-6 rounded-2xl shadow-card text-center">
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <div className="text-muted-foreground">Years Experience</div>
                </div>
                <div className="bg-card p-6 rounded-2xl shadow-card text-center">
                  <div className="text-4xl font-bold text-primary mb-2">1.5K+</div>
                  <div className="text-muted-foreground">Happy Students</div>
                </div>
                <div className="bg-card p-6 rounded-2xl shadow-card text-center">
                  <div className="text-4xl font-bold text-primary mb-2">55+</div>
                  <div className="text-muted-foreground">Partner Universities</div>
                </div>
                <div className="bg-card p-6 rounded-2xl shadow-card text-center">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Users, title: "Expert Team", desc: "Experienced counselors dedicated to your success" },
                { icon: Target, title: "Personalized Approach", desc: "Tailored solutions for every student's needs" },
                { icon: Award, title: "Proven Results", desc: "High success rate with top universities" },
                { icon: Heart, title: "Student First", desc: "Your dreams are our priority" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
