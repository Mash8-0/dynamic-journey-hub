import { useEffect, useRef, useState } from "react";
import { MapPin, Search, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { universities } from "@/data/universities";

const Universities = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<"All" | "Public" | "Private">("All");
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredUniversities = universities.filter(uni => {
    const matchesFilter = filter === "All" || uni.type === filter;
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          uni.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          uni.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <section className="py-20 lg:py-32 bg-background" ref={sectionRef}>
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Our Partner <span className="gradient-text">Universities</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                We work with {universities.length}+ top Malaysian universities to help you achieve your academic goals
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search universities by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6 rounded-full border-muted-foreground/20"
                />
              </div>
              
              {/* Filter Buttons */}
              <div className="flex justify-center gap-3 flex-wrap">
                {(["All", "Public", "Private"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      filter === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {type} {type !== "All" && "Universities"}
                  </button>
                ))}
              </div>
            </div>

            {/* Universities Grid */}
            {filteredUniversities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredUniversities.map((uni, index) => (
                  <div
                    key={uni.id}
                    className={`group relative bg-card rounded-2xl p-6 shadow-card transition-all duration-500 border border-transparent flex flex-col overflow-hidden
                      hover:shadow-[0_8px_40px_-5px_hsl(245_58%_51%/0.25)] hover:border-indigo-500/30 hover:-translate-y-1
                      before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-indigo-500/0 before:to-purple-500/0 before:transition-all before:duration-500
                      hover:before:from-indigo-500/5 hover:before:to-purple-500/10
                      ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                    style={{ animationDelay: `${Math.min(index * 0.05, 0.4)}s` }}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-100 group-hover:from-indigo-500/20 group-hover:via-purple-500/10 group-hover:to-pink-500/20 transition-all duration-500 blur-xl -z-10" />
                    
                    {/* Logo */}
                    <div 
                      className={`relative w-20 h-20 rounded-xl bg-gradient-to-br ${uni.color} flex items-center justify-center mb-4 shadow-lg 
                        transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl`}
                    >
                      <span className="text-white font-bold text-lg drop-shadow-md">{uni.shortName}</span>
                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* University Info */}
                    <div className="flex-grow relative z-10">
                      <h3 className="font-semibold text-foreground text-base mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                        {uni.name}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2 group-hover:text-foreground/70 transition-colors duration-300">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>{uni.location}, Malaysia</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                        <FileCheck className="w-4 h-4 flex-shrink-0" />
                        <span>Offer Letter: <span className="text-green-600 dark:text-green-400 font-medium">Yes</span></span>
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                        uni.type === "Public" 
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40" 
                          : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40"
                      }`}>
                        {uni.type}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-border/50 group-hover:border-indigo-500/20 transition-colors duration-300 relative z-10">
                      <Link to="/contact" className="flex-1">
                        <Button size="sm" className="w-full btn-glass-primary rounded-lg group-hover:shadow-md transition-shadow duration-300">
                          Apply Now
                        </Button>
                      </Link>
                      <Link to={`/universities/${uni.id}`} className="flex-1">
                        <Button size="sm" variant="ghost" className="w-full btn-glass-outline rounded-lg">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No universities found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: `${universities.length}+`, label: "Partner Universities" },
                { value: universities.filter(u => u.type === "Public").length, label: "Public Universities" },
                { value: universities.filter(u => u.type === "Private").length, label: "Private Universities" },
                { value: "100%", label: "Success Rate" },
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className={`group relative p-6 bg-card rounded-2xl shadow-card overflow-hidden transition-all duration-500 hover:shadow-hover hover:-translate-y-1
                    before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-500/0 before:to-purple-500/0 before:transition-all before:duration-500
                    hover:before:from-indigo-500/5 hover:before:to-purple-500/10
                    ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="relative z-10">
                    <div className="text-3xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                    <div className="text-muted-foreground text-sm group-hover:text-foreground/70 transition-colors duration-300">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Universities;
