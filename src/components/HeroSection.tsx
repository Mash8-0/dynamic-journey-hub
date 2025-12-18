import { Button } from "@/components/ui/button";
import { ArrowRight, Stamp, GraduationCap, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const CountUp = ({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
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
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-3xl font-bold text-foreground">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="min-h-screen relative overflow-hidden pt-20" style={{ background: 'var(--gradient-hero)' }}>
      {/* Background decorative elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-block">
              <span className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                Professional Consultancy
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Your Future Begins{" "}
              <span className="gradient-text">Beyond Borders</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              Premium visa & education consultation crafted for your global journey — clear, practical and personal.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="gradient-bg text-primary-foreground hover:opacity-90 shadow-soft transition-all hover:shadow-hover group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border hover:bg-secondary transition-all"
              >
                Free Assessment
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-12 pt-8">
              <div className="animate-fade-in-up delay-200">
                <CountUp end={1500} suffix="+" duration={2000} />
                <div className="text-sm text-muted-foreground">Cases Solved</div>
              </div>
              <div className="animate-fade-in-up delay-300">
                <CountUp end={55} suffix="+" duration={1500} />
                <div className="text-sm text-muted-foreground">Partner Universities</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Floating Badges */}
          <div className="relative h-[400px] lg:h-[500px] hidden lg:block">
            {/* Floating Badge 1 */}
            <div className="absolute top-0 right-20 animate-float">
              <div className="bg-card rounded-2xl px-6 py-4 shadow-card flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Stamp className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">Visa Experts</span>
              </div>
            </div>
            
            {/* Floating Badge 2 */}
            <div className="absolute top-1/3 right-0 animate-float-delayed">
              <div className="bg-card rounded-2xl px-6 py-4 shadow-card flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">1.5K+ Success</span>
              </div>
            </div>
            
            {/* Floating Badge 3 */}
            <div className="absolute bottom-1/4 right-16 animate-float delay-300">
              <div className="bg-card rounded-2xl px-6 py-4 shadow-card flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">Study Abroad</span>
              </div>
            </div>
            
            {/* Decorative circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-dashed border-primary/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-primary/10" />
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
