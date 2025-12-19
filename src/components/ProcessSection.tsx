import { useEffect, useRef, useState, useMemo } from "react";
import { Rocket, Sparkles, MessageCircle, GraduationCap, FileText, Mail, Shield, CreditCard, Globe, CheckCircle, FileCheck, Plane, Car, Home, LucideIcon, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface StepItem {
  text: string;
  icon: LucideIcon;
}

interface Step {
  step: string;
  items: StepItem[];
  color: string;
}

const steps: Step[] = [
  {
    step: "Step 1",
    color: "from-violet-500 to-purple-600",
    items: [
      { text: "Free Consultation", icon: MessageCircle },
      { text: "University & Course Selection", icon: GraduationCap },
    ],
  },
  {
    step: "Step 2",
    color: "from-blue-500 to-cyan-500",
    items: [
      { text: "Apply", icon: FileText },
      { text: "Offer Letter", icon: Mail },
      { text: "Proceed for EMGS", icon: Shield },
    ],
  },
  {
    step: "Step 3",
    color: "from-emerald-500 to-teal-500",
    items: [
      { text: "Payment EMGS", icon: CreditCard },
      { text: "EMGS Online", icon: Globe },
      { text: "EMGS Approval", icon: CheckCircle },
      { text: "eVAL", icon: FileCheck },
    ],
  },
  {
    step: "Step 4",
    color: "from-amber-500 to-orange-500",
    items: [
      { text: "Arrival Follow-up", icon: Plane },
      { text: "Airport Pickup", icon: Car },
      { text: "Accommodation", icon: Home },
    ],
  },
];

// Generate random particles/stars
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 80 + 10,
    delay: Math.random() * 2,
    duration: 0.5 + Math.random() * 1.5,
    size: 3 + Math.random() * 6,
    type: Math.random() > 0.3 ? 'star' : 'spark',
  }));
};

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false, false]);
  const [rocketProgress, setRocketProgress] = useState(0);
  const [rocketFinished, setRocketFinished] = useState(false);
  const particles = useMemo(() => generateParticles(30), []);

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
      
      // Rocket vanishes when reaching the CTA button
      setRocketFinished(scrollProgress >= 0.95);

      const stepThresholds = [0.15, 0.35, 0.55, 0.75];
      const newVisibleSteps = stepThresholds.map(threshold => scrollProgress >= threshold);
      setVisibleSteps(newVisibleSteps);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="processing" className="py-20 lg:py-32 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden" ref={sectionRef}>
      {/* Floating animated background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large floating blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl animate-float" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-[15%] left-[8%] w-4 h-4 border-2 border-violet-400/20 rounded-full animate-float" style={{ animationDuration: '6s' }} />
        <div className="absolute top-[25%] right-[12%] w-6 h-6 border-2 border-cyan-400/20 rotate-45 animate-float" style={{ animationDuration: '7s', animationDelay: '0.5s' }} />
        <div className="absolute top-[40%] left-[5%] w-3 h-3 bg-emerald-400/15 rounded-full animate-float" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-[55%] right-[8%] w-5 h-5 border-2 border-amber-400/20 rounded-lg rotate-12 animate-float" style={{ animationDuration: '8s', animationDelay: '0.3s' }} />
        <div className="absolute top-[70%] left-[10%] w-4 h-4 bg-pink-400/10 rotate-45 animate-float" style={{ animationDuration: '6s', animationDelay: '1.5s' }} />
        <div className="absolute top-[80%] right-[15%] w-3 h-3 border-2 border-purple-400/20 rounded-full animate-float" style={{ animationDuration: '7s', animationDelay: '0.8s' }} />
        
        {/* Additional floating elements on both sides */}
        <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-violet-300/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[35%] right-[20%] w-2 h-2 bg-cyan-300/20 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-[60%] left-[15%] w-2 h-2 bg-emerald-300/20 rounded-full animate-ping" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
        <div className="absolute top-[85%] right-[10%] w-2 h-2 bg-amber-300/20 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
        
        {/* Drifting lines */}
        <div className="absolute top-[20%] left-[3%] w-16 h-0.5 bg-gradient-to-r from-transparent via-violet-400/10 to-transparent rotate-45 animate-float" style={{ animationDuration: '9s' }} />
        <div className="absolute top-[50%] right-[5%] w-20 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -rotate-12 animate-float" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-[75%] left-[7%] w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent rotate-12 animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Your Journey Starts Here</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Our <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Process</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A simple 4-step journey to your dream destination
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Gradient Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
            <div className="w-full h-full bg-gradient-to-b from-violet-500/20 via-cyan-500/20 via-emerald-500/20 to-amber-500/20 rounded-full" />
          </div>

          {/* Rocket Trail - Colorful gradient */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-2 transition-all duration-300 ease-out z-10 rounded-full"
            style={{
              top: '0%',
              height: `${Math.min(rocketProgress * 95, 95)}%`,
              background: 'linear-gradient(to bottom, hsl(270 60% 60% / 0.2) 0%, hsl(200 80% 55% / 0.4) 30%, hsl(160 70% 50% / 0.5) 60%, hsl(35 90% 55% / 0.6) 100%)',
              boxShadow: '0 0 20px hsl(270 60% 60% / 0.3)',
            }}
          />

          {/* Particle Effects / Stars */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-48 h-full pointer-events-none overflow-hidden">
            {particles.map((particle) => {
              const particleTop = rocketProgress * 95;
              const isVisible = particleTop > 5 && !rocketFinished;
              
              return (
                <div
                  key={particle.id}
                  className={`absolute transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    left: `${particle.left}%`,
                    top: `${Math.max(0, particleTop - 10 - particle.delay * 5)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {particle.type === 'star' ? (
                    <Star 
                      className="text-amber-400 fill-amber-400 animate-pulse" 
                      style={{ 
                        width: particle.size,
                        height: particle.size,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                        filter: 'drop-shadow(0 0 4px hsl(45 95% 60%))',
                      }}
                    />
                  ) : (
                    <div 
                      className="rounded-full animate-ping"
                      style={{ 
                        width: particle.size,
                        height: particle.size,
                        background: `linear-gradient(135deg, hsl(${Math.random() * 60 + 20} 90% 60%), hsl(${Math.random() * 60 + 280} 80% 65%))`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration + 0.5}s`,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Animated Rocket */}
          <div 
            className={`absolute left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ease-out ${
              rocketFinished ? 'opacity-0 scale-0 rotate-45' : 'opacity-100 scale-100 rotate-0'
            }`}
            style={{ 
              top: `${Math.min(rocketProgress * 95, 95)}%`,
            }}
          >
            <div className="relative">
              {/* Outer glow rings */}
              <div className="absolute inset-0 w-20 h-20 -m-4 rounded-full bg-gradient-to-r from-violet-500/30 to-cyan-500/30 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-0 w-16 h-16 -m-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 animate-pulse" />
              
              {/* Rocket body */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex items-center justify-center shadow-2xl border-2 border-white/20">
                <Rocket className="w-7 h-7 text-white rotate-[135deg] drop-shadow-lg" />
              </div>
              
              {/* Fire/Flame effect - More realistic */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-end justify-center gap-0.5">
                {/* Core flame */}
                <div className="w-2 h-6 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-full animate-pulse opacity-90" 
                  style={{ animationDuration: '0.15s', transform: 'rotate(-12deg)', filter: 'blur(0.5px)' }} />
                <div className="w-3.5 h-9 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-200 rounded-full animate-pulse" 
                  style={{ animationDuration: '0.1s', filter: 'blur(0.3px)' }} />
                <div className="w-2 h-6 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-full animate-pulse opacity-90" 
                  style={{ animationDuration: '0.15s', transform: 'rotate(12deg)', filter: 'blur(0.5px)' }} />
              </div>
              
              {/* Inner hot core */}
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 w-5 h-5 bg-gradient-to-t from-yellow-400 to-white rounded-full blur-sm animate-pulse" 
                style={{ animationDuration: '0.08s' }} />
              
              {/* Smoke trail */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white/10 rounded-full blur-md animate-pulse" 
                style={{ animationDuration: '0.3s' }} />
            </div>
          </div>

          {/* Steps */}
          <div className="relative space-y-20 py-8">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              const isVisible = visibleSteps[index];

              return (
                <div
                  key={step.step}
                  className={`relative flex ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  {/* Step Node on Timeline - Center point */}
                  <div 
                    className={`absolute left-1/2 top-7 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${step.color} z-10 transition-all duration-500 shadow-lg ${
                      isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                    style={{ 
                      transitionDelay: `${index * 150}ms`,
                      boxShadow: `0 0 12px hsl(var(--primary) / 0.4)`,
                    }}
                  />

                  {/* Connection Line with drawing animation - from center to card center */}
                  <div 
                    className={`absolute top-7 -translate-y-1/2 h-[2px] overflow-hidden ${
                      isLeft 
                        ? "right-[50%] w-[calc(25%+2rem)] md:w-[calc(25%+2.5rem)]" 
                        : "left-[50%] w-[calc(25%+2rem)] md:w-[calc(25%+2.5rem)]"
                    }`}
                  >
                    {/* Base line */}
                    <div 
                      className={`absolute inset-0 transition-all duration-1000 ease-out ${
                        isVisible ? "scale-x-100" : "scale-x-0"
                      }`}
                      style={{ 
                        transformOrigin: isLeft ? "right" : "left",
                        transitionDelay: `${index * 150}ms`,
                        background: `linear-gradient(${isLeft ? 'to left' : 'to right'}, hsl(var(--primary) / 0.8), hsl(var(--primary) / 0.2))`,
                      }}
                    />
                    {/* Animated glow traveling along the line */}
                    <div 
                      className={`absolute inset-y-0 w-10 transition-opacity duration-500 ${
                        isVisible ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ 
                        background: `linear-gradient(${isLeft ? 'to left' : 'to right'}, transparent, hsl(var(--primary)), transparent)`,
                        animation: isVisible ? `${isLeft ? 'drawLineLeft' : 'drawLineRight'} 1.2s ease-out ${index * 150 + 100}ms forwards` : 'none',
                        filter: 'blur(1px)',
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`w-[calc(50%-4rem)] md:w-[calc(50%-5rem)] transition-all duration-700 ${
                      isVisible 
                        ? "opacity-100 translate-x-0" 
                        : isLeft 
                          ? "opacity-0 -translate-x-16" 
                          : "opacity-0 translate-x-16"
                    }`}
                    style={{ transitionDelay: `${index * 200 + 100}ms` }}
                  >
                    {/* Step Badge - Glossy glass effect */}
                    <div 
                      className={`inline-flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-br from-card/90 via-card/80 to-muted/60 border border-border/40 backdrop-blur-xl mb-4 group hover:scale-105 transition-all duration-300 ${
                        isLeft ? "" : "ml-auto"
                      }`}
                      style={{
                        boxShadow: '0 8px 32px -8px hsl(var(--primary) / 0.2), 0 4px 16px -4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.05)'
                      }}
                    >
                      <span className={`w-9 h-9 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-sm font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {index + 1}
                      </span>
                      <span className="text-foreground font-semibold text-lg">{step.step}</span>
                    </div>

                    {/* Items */}
                    <div className={`space-y-3 ${isLeft ? "" : "text-right"}`}>
                      {step.items.map((item, itemIndex) => {
                        const ItemIcon = item.icon;
                        return (
                          <div
                            key={item.text}
                            className={`flex items-center gap-3 p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/40 shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1.5 hover:bg-card/90 cursor-pointer transition-all duration-300 group ${
                              isLeft ? "flex-row" : "flex-row-reverse"
                            } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                            style={{ transitionDelay: `${index * 200 + itemIndex * 100 + 200}ms` }}
                          >
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                              <ItemIcon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Apply Now CTA Button - Celebration effect */}
          <div className="relative mt-16 flex justify-center">
            <div className={`transition-all duration-1000 ${
              rocketFinished ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-75"
            }`}>
              {/* Celebration burst rings */}
              {rocketFinished && (
                <>
                  <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-r from-violet-500/30 via-cyan-500/30 to-amber-500/30 animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse" style={{ animationDuration: '1.5s' }} />
                  
                  {/* Sparkle decorations */}
                  <Sparkles className="absolute -top-6 -left-6 w-5 h-5 text-amber-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <Sparkles className="absolute -top-4 -right-8 w-4 h-4 text-violet-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  <Star className="absolute -bottom-4 -left-8 w-4 h-4 text-cyan-400 fill-cyan-400 animate-bounce" style={{ animationDelay: '0.3s' }} />
                  <Star className="absolute -bottom-6 -right-6 w-5 h-5 text-pink-400 fill-pink-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
                </>
              )}
              
              <div className={`relative ${rocketFinished ? 'animate-bounce' : ''}`} style={{ animationDuration: '2s' }}>
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold shadow-2xl hover:shadow-violet-500/30 transition-all duration-500 px-10 py-7 text-lg rounded-2xl border border-white/20"
                    style={{
                      boxShadow: rocketFinished 
                        ? '0 0 40px hsl(270 60% 55% / 0.5), 0 0 80px hsl(280 70% 60% / 0.3), 0 10px 40px -10px rgba(0,0,0,0.3)' 
                        : '0 10px 40px -10px rgba(0,0,0,0.3)'
                    }}
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;