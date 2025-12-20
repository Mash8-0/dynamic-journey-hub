import { useEffect, useRef, useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useUniversities } from "@/hooks/useUniversities";
import UniversityLogo from "@/components/UniversityLogo";

const UniversitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { data: universities = [], isLoading } = useUniversities();

  // Get first 8 universities for preview
  const previewUniversities = universities.slice(0, 8);

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
    <section id="universities" className="py-12 sm:py-16 lg:py-24 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
            Partner <span className="gradient-text">Universities</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
            We work with top Malaysian universities to help you achieve your academic goals
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-card rounded-2xl p-4 sm:p-6 shadow-card animate-shimmer">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl mb-4 bg-muted" />
                  <div className="h-4 w-3/4 mb-2 rounded bg-muted" />
                  <div className="h-3 w-1/2 rounded bg-muted" />
                </div>
              ))
            : previewUniversities.map((uni, index) => (
                <Link
                  to={`/universities/${uni.id}`}
                  key={uni.id}
                  className={`group bg-card rounded-2xl p-4 sm:p-6 shadow-card hover:shadow-hover transition-all duration-500 cursor-pointer border border-transparent hover:border-primary/20 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Logo */}
                  <UniversityLogo
                    logoUrl={uni.logoUrl}
                    shortName={uni.shortName}
                    color={uni.color}
                    size="sm"
                    className="mb-3 sm:mb-4 group-hover:scale-110 transition-transform"
                  />
                  <h3 className="font-semibold text-foreground text-xs sm:text-sm lg:text-base mb-1 sm:mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {uni.name}
                  </h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-[10px] sm:text-xs">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                    <span className="truncate">{uni.location}</span>
                  </div>
                </Link>
              ))}
        </div>

        {/* Explore Universities Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            to="/universities"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium hover:bg-primary/90 transition-all group text-sm sm:text-base"
          >
            Explore Universities
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UniversitiesSection;
