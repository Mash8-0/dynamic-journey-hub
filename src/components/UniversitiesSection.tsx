import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

const universities = [
  { name: "University of Melbourne", country: "Australia", logo: "🇦🇺" },
  { name: "University of Toronto", country: "Canada", logo: "🇨🇦" },
  { name: "University of Oxford", country: "UK", logo: "🇬🇧" },
  { name: "MIT", country: "USA", logo: "🇺🇸" },
  { name: "NUS Singapore", country: "Singapore", logo: "🇸🇬" },
  { name: "University of Auckland", country: "New Zealand", logo: "🇳🇿" },
  { name: "TU Munich", country: "Germany", logo: "🇩🇪" },
  { name: "University of Malaysia", country: "Malaysia", logo: "🇲🇾" },
];

const UniversitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="universities" className="py-20 lg:py-32 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Partner <span className="gradient-text">Universities</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We work with top universities around the world
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {universities.map((uni, index) => (
            <div
              key={uni.name}
              className={`group bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-500 cursor-pointer border border-transparent hover:border-primary/20 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {uni.logo}
              </div>
              <h3 className="font-semibold text-foreground text-sm lg:text-base mb-2 line-clamp-2">
                {uni.name}
              </h3>
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <MapPin className="w-3 h-3" />
                <span>{uni.country}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View all 100+ partner universities
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default UniversitiesSection;
