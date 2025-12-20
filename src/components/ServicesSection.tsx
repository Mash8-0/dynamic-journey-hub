import { useEffect, useRef, useState } from "react";
import { MessageSquare, GraduationCap, Stamp, Plane, Home, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: MessageSquare,
    title: "Free Consultation",
    description: "Personal counselling, course & country selection, and application roadmap at no charge.",
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    icon: GraduationCap,
    title: "University Admissions",
    description: "SOP & LOR review, application management, document checks and follow-ups.",
    color: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    icon: Stamp,
    title: "Visa Assistance",
    description: "Document checklist, application submission, interview prep and follow-up.",
    color: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600",
  },
  {
    icon: Plane,
    title: "Air Ticketing & Travel",
    description: "Student fares, flight planning, and flexible ticketing options.",
    color: "from-orange-500 to-amber-500",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600",
  },
  {
    icon: Home,
    title: "Accommodation & Arrival",
    description: "Pre-arranged housing, airport pickup and orientation.",
    color: "from-pink-500 to-rose-500",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-600",
  },
  {
    icon: Award,
    title: "Scholarships & Funding",
    description: "Find scholarships and assist with application documents.",
    color: "from-amber-500 to-yellow-500",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
];

// Skeleton component
const ServiceCardSkeleton = () => (
  <div className="bg-card rounded-2xl p-6 shadow-card border border-transparent flex flex-col overflow-hidden">
    <div className="w-14 h-14 rounded-xl mb-5 animate-shimmer" />
    <div className="h-6 w-3/4 mb-3 rounded animate-shimmer" style={{ animationDelay: '0.1s' }} />
    <div className="h-4 w-full mb-2 rounded animate-shimmer" style={{ animationDelay: '0.15s' }} />
    <div className="h-4 w-2/3 mb-4 rounded animate-shimmer" style={{ animationDelay: '0.2s' }} />
    <div className="h-5 w-20 rounded animate-shimmer" style={{ animationDelay: '0.25s' }} />
  </div>
);

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

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
    <section id="services" className="py-12 sm:py-16 lg:py-24 bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl animate-float" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDuration: '10s', animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
            Comprehensive support for your educational journey abroad
          </p>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`group relative bg-card rounded-2xl p-4 sm:p-6 shadow-card transition-all duration-500 border border-transparent flex flex-col overflow-hidden
                  hover:shadow-[0_8px_40px_-5px_hsl(245_58%_51%/0.25)] hover:border-indigo-500/30 hover:-translate-y-2
                  before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-indigo-500/0 before:to-purple-500/0 before:transition-all before:duration-500
                  hover:before:from-indigo-500/5 hover:before:to-purple-500/10
                  ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-100 group-hover:from-indigo-500/20 group-hover:via-purple-500/10 group-hover:to-pink-500/20 transition-all duration-500 blur-xl -z-10" />
                
                {/* Icon */}
                <div 
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 sm:mb-5 shadow-lg
                    transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl`}
                >
                  <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-md" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="flex-grow relative z-10">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 sm:mb-4 leading-relaxed group-hover:text-foreground/70 transition-colors duration-300 text-sm sm:text-base">
                    {service.description}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:gap-2 transition-all relative z-10 text-sm sm:text-base"
                >
                  Get help
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className={`text-center mt-8 sm:mt-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: '0.6s' }}>
          <Link to="/contact">
            <Button className="btn-glass-primary rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg">
              Get Free Consultation
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;