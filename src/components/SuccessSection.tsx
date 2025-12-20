import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Ahmed",
    country: "Australia",
    university: "University of Melbourne",
    image: "SA",
    text: "VisaRoute made my dream of studying in Australia a reality. Their step-by-step guidance was invaluable!",
    rating: 5,
  },
  {
    name: "Mohammad Rahman",
    country: "Canada",
    university: "University of Toronto",
    image: "MR",
    text: "Professional service from start to finish. They handled everything from applications to visa processing.",
    rating: 5,
  },
  {
    name: "Fatima Khan",
    country: "UK",
    university: "University of Oxford",
    image: "FK",
    text: "I was overwhelmed by the visa process until VisaRoute helped me. Now I'm living my dream in the UK!",
    rating: 5,
  },
];

const CountUp = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-bold gradient-text">
      {count}
      {suffix}
    </div>
  );
};

const SuccessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="success" className="py-20 lg:py-32 bg-secondary/50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <CountUp end={400} suffix="+" />
            <p className="text-muted-foreground mt-2">Happy Students</p>
          </div>
          <div className="text-center">
            <CountUp end={55} suffix="+" />
            <p className="text-muted-foreground mt-2">Universities</p>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold gradient-text flex items-center justify-center gap-3">
              <svg viewBox="0 0 56 28" className="w-12 h-6 lg:w-16 lg:h-8 rounded shadow-md">
                <rect width="56" height="28" fill="#CC0001"/>
                <rect y="2" width="56" height="2" fill="#FFF"/>
                <rect y="6" width="56" height="2" fill="#FFF"/>
                <rect y="10" width="56" height="2" fill="#FFF"/>
                <rect y="14" width="56" height="2" fill="#FFF"/>
                <rect y="18" width="56" height="2" fill="#FFF"/>
                <rect y="22" width="56" height="2" fill="#FFF"/>
                <rect y="26" width="56" height="2" fill="#FFF"/>
                <rect width="28" height="14" fill="#010066"/>
                <circle cx="12" cy="7" r="5" fill="#FFCC00"/>
                <circle cx="13.5" cy="7" r="4" fill="#010066"/>
                <polygon points="22,3 23,6 26,6 24,8 25,11 22,9 19,11 20,8 18,6 21,6" fill="#FFCC00"/>
              </svg>
              <span>Malaysia</span>
            </div>
            <p className="text-muted-foreground mt-2">Your Destination</p>
          </div>
          <div className="text-center">
            <CountUp end={98} suffix="%" />
            <p className="text-muted-foreground mt-2">Success Rate</p>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from students who achieved their dreams with us
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.university}, {testimonial.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessSection;
