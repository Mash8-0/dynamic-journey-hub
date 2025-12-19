import { useEffect, useRef, useState, useMemo } from "react";
import { Rocket, Sparkles, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: "Step 1",
    items: ["Free Consultation", "University & Course Selection"],
  },
  {
    step: "Step 2",
    items: ["Apply", "Offer Letter", "Proceed for EMGS"],
  },
  {
    step: "Step 3",
    items: ["Payment EMGS", "EMGS Online", "EMGS Approval", "eVAL"],
  },
  {
    step: "Step 4",
    items: ["Arrival Follow-up", "Airport Pickup", "Accommodation"],
  },
];

// Generate random particles/stars
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 60 + 20,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 2,
    size: 2 + Math.random() * 4,
    type: Math.random() > 0.5 ? 'star' : 'dot',
  }));
};

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false, false]);
  const [rocketProgress, setRocketProgress] = useState(0);
  const [rocketFinished, setRocketFinished] = useState(false);
  const particles = useMemo(() => generateParticles(20), []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (sectionHeight + windowHeight * 0.5)));
      setRocketProgress(scrollProgress);
      
      // Rocket vanishes when reaching the end
      setRocketFinished(scrollProgress >= 0.92);

      const stepThresholds = [0.15, 0.35, 0.55, 0.75];
      const newVisibleSteps = stepThresholds.map(threshold => scrollProgress >= threshold);
      setVisibleSteps(newVisibleSteps);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="processing" className="py-20 lg:py-32 bg-secondary/50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simple 4-step journey to your dream destination
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Dotted Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            <div className="w-full h-full border-l-2 border-dashed border-primary/40" />
          </div>

          {/* Particle Effects / Stars */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-full pointer-events-none overflow-hidden">
            {particles.map((particle) => {
              const particleTop = rocketProgress * 85;
              const isVisible = particleTop > 5 && !rocketFinished;
              
              return (
                <div
                  key={particle.id}
                  className={`absolute transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    left: `${particle.left}%`,
                    top: `${Math.max(0, particleTop - 15 - particle.delay * 8)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {particle.type === 'star' ? (
                    <Sparkles 
                      className="text-primary animate-pulse" 
                      style={{ 
                        width: particle.size * 2,
                        height: particle.size * 2,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                      }}
                    />
                  ) : (
                    <div 
                      className="rounded-full bg-primary/60 animate-ping"
                      style={{ 
                        width: particle.size,
                        height: particle.size,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration + 1}s`,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Glowing trail behind rocket */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-4 transition-all duration-300 ease-out z-10"
            style={{
              top: '0%',
              height: `${Math.min(rocketProgress * 85, 85)}%`,
              background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--primary) / 0.1) 30%, hsl(var(--primary) / 0.3) 70%, hsl(var(--primary) / 0.6) 100%)',
              filter: 'blur(4px)',
            }}
          />

          {/* Animated Rocket */}
          <div 
            className={`absolute left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ease-out ${
              rocketFinished ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`}
            style={{ 
              top: `${Math.min(rocketProgress * 85, 85)}%`,
            }}
          >
            <div className="relative">
              {/* Rocket glow effect */}
              <div className="absolute inset-0 w-14 h-14 -m-1 rounded-full bg-primary/20 animate-pulse" />
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center shadow-lg animate-pulse-glow">
                <Rocket className="w-6 h-6 text-primary-foreground rotate-[135deg]" />
              </div>
              
              {/* Fire/Flame effect - improved */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                {/* Main flame */}
                <div className="relative">
                  <Flame className="w-5 h-5 text-orange-500 animate-pulse rotate-180" style={{ animationDuration: '0.3s' }} />
                  <Flame className="w-4 h-4 text-yellow-400 animate-pulse rotate-180 absolute top-0 left-1/2 -translate-x-1/2" style={{ animationDuration: '0.2s' }} />
                </div>
                {/* Flame trail */}
                <div className="flex gap-0.5 -mt-1">
                  <div className="w-1.5 h-3 bg-gradient-to-t from-transparent via-orange-400 to-yellow-300 rounded-full animate-pulse" style={{ animationDuration: '0.15s' }} />
                  <div className="w-2 h-4 bg-gradient-to-t from-transparent via-orange-500 to-yellow-400 rounded-full animate-pulse" style={{ animationDuration: '0.2s' }} />
                  <div className="w-1.5 h-3 bg-gradient-to-t from-transparent via-orange-400 to-yellow-300 rounded-full animate-pulse" style={{ animationDuration: '0.15s' }} />
                </div>
                {/* Smoke particles */}
                <div className="flex gap-1 -mt-1">
                  <div className="w-1 h-1 rounded-full bg-orange-300/80 animate-ping" style={{ animationDelay: '0s', animationDuration: '0.5s' }} />
                  <div className="w-1 h-1 rounded-full bg-yellow-300/80 animate-ping" style={{ animationDelay: '0.15s', animationDuration: '0.5s' }} />
                  <div className="w-1 h-1 rounded-full bg-orange-300/80 animate-ping" style={{ animationDelay: '0.3s', animationDuration: '0.5s' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="relative space-y-16 py-8">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              const isVisible = visibleSteps[index];

              return (
                <div
                  key={step.step}
                  className={`relative flex items-center ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  {/* Connection Line - goes to OPPOSITE side of card */}
                  <div 
                    className={`absolute top-1/2 h-0.5 w-16 md:w-24 -translate-y-1/2 transition-all duration-500 ${
                      isLeft 
                        ? "right-1/2 bg-gradient-to-l from-primary to-primary/30" 
                        : "left-1/2 bg-gradient-to-r from-primary to-primary/30"
                    } ${isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
                    style={{ 
                      transformOrigin: isLeft ? "right" : "left",
                      transitionDelay: `${index * 150}ms`
                    }}
                  />

                  {/* Circle indicator at end of line - OPPOSITE side of card */}
                  <div 
                    className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-primary/60 bg-background transition-all duration-500 ${
                      isLeft 
                        ? "right-[calc(50%+4rem)] md:right-[calc(50%+6rem)]" 
                        : "left-[calc(50%+4rem)] md:left-[calc(50%+6rem)]"
                    } ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                    style={{ transitionDelay: `${index * 150 + 100}ms` }}
                  />

                  {/* Step Node on Timeline */}
                  <div 
                    className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-primary bg-background z-10 transition-all duration-500 ${
                      isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  />

                  {/* Card */}
                  <div
                    className={`w-[calc(50%-4rem)] md:w-[calc(50%-5rem)] transition-all duration-700 ${
                      isVisible 
                        ? "opacity-100 translate-x-0" 
                        : isLeft 
                          ? "opacity-0 -translate-x-12" 
                          : "opacity-0 translate-x-12"
                    }`}
                    style={{ transitionDelay: `${index * 200 + 100}ms` }}
                  >
                    {/* Step Badge */}
                    <div 
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary/30 bg-primary/10 mb-4 ${
                        isLeft ? "" : "ml-auto"
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      <span className="text-primary font-semibold text-sm">{step.step}</span>
                    </div>

                    {/* Items */}
                    <div className={`space-y-2 ${isLeft ? "" : "text-right"}`}>
                      {step.items.map((item, itemIndex) => (
                        <div
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 ${
                            isLeft ? "flex-row" : "flex-row-reverse"
                          } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                          style={{ transitionDelay: `${index * 200 + itemIndex * 100 + 200}ms` }}
                        >
                          <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          <span className="text-sm text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End indicator with Apply Now CTA */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center transition-all duration-500 ${
              visibleSteps[3] ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}>
              <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
            </div>
            
            {/* Apply Now CTA Button */}
            <div className={`mt-6 transition-all duration-700 ${
              rocketFinished ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90"
            }`}>
              <Link to="/contact">
                <Button size="lg" className="gradient-bg text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
