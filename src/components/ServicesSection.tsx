import { useEffect, useRef } from "react";
import { MessageSquare, GraduationCap, Stamp, Plane, Home, Award, ArrowRight } from "lucide-react";

const services = [
  {
    icon: MessageSquare,
    title: "Free Consultation",
    description: "Personal counselling, course & country selection, and application roadmap at no charge.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: GraduationCap,
    title: "University Admissions",
    description: "SOP & LOR review, application management, document checks and follow-ups.",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Stamp,
    title: "Visa Assistance",
    description: "Document checklist, application submission, interview prep and follow-up.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Plane,
    title: "Air Ticketing & Travel",
    description: "Student fares, flight planning, and flexible ticketing options.",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    icon: Home,
    title: "Accommodation & Arrival",
    description: "Pre-arranged housing, airport pickup and orientation.",
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    icon: Award,
    title: "Scholarships & Funding",
    description: "Find scholarships and assist with application documents.",
    color: "bg-amber-500/10 text-amber-600",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll(".service-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-20 lg:py-32 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive support for your educational journey abroad
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`service-card animate-on-scroll group bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-500 cursor-pointer border border-transparent hover:border-primary/20`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-5 transition-transform group-hover:scale-110`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {service.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all"
              >
                Get help
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
