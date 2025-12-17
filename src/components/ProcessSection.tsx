import { useEffect, useRef } from "react";

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

const ProcessSection = () => {
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

    const cards = sectionRef.current?.querySelectorAll(".process-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
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

        {/* Process Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`process-card animate-on-scroll relative`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step Number */}
                <div className="relative z-10 flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center shadow-soft animate-pulse-glow">
                    <span className="text-primary-foreground font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-300">
                  <h4 className="text-primary font-semibold text-sm mb-4 tracking-wide">
                    {step.step}
                  </h4>
                  <ul className="space-y-3">
                    {step.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-foreground"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary/60" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
