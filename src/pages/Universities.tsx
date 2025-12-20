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

            {/* Universities List */}
            {filteredUniversities.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredUniversities.map((uni, index) => (
                  <div
                    key={uni.id}
                    className={`group bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-500 border border-transparent hover:border-primary/20 ${
                      isVisible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${Math.min(index * 0.03, 0.3)}s` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                      {/* Logo */}
                      <div 
                        className={`w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gradient-to-br ${uni.color} flex items-center justify-center flex-shrink-0 shadow-md`}
                      >
                        <span className="text-white font-bold text-lg md:text-xl">{uni.shortName}</span>
                      </div>

                      {/* University Info */}
                      <div className="flex-grow">
                        <h3 className="font-semibold text-foreground text-lg md:text-xl mb-2">
                          {uni.name} ({uni.shortName})
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{uni.location}, Malaysia</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileCheck className="w-4 h-4" />
                            <span>Offer Letter Applicable: <span className="text-green-600 dark:text-green-400 font-medium">Yes</span></span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            uni.type === "Public" 
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" 
                              : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                          }`}>
                            {uni.type}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-row md:flex-col gap-2 flex-shrink-0">
                        <Link to="/contact" className="flex-1 md:flex-none">
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                            Apply Now
                          </Button>
                        </Link>
                        <Link to={`/universities/${uni.id}`} className="flex-1 md:flex-none">
                          <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10">
                            Details
                          </Button>
                        </Link>
                      </div>
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
              <div className="p-6 bg-card rounded-2xl shadow-card">
                <div className="text-3xl font-bold gradient-text mb-2">{universities.length}+</div>
                <div className="text-muted-foreground text-sm">Partner Universities</div>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-card">
                <div className="text-3xl font-bold gradient-text mb-2">{universities.filter(u => u.type === "Public").length}</div>
                <div className="text-muted-foreground text-sm">Public Universities</div>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-card">
                <div className="text-3xl font-bold gradient-text mb-2">{universities.filter(u => u.type === "Private").length}</div>
                <div className="text-muted-foreground text-sm">Private Universities</div>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-card">
                <div className="text-3xl font-bold gradient-text mb-2">100%</div>
                <div className="text-muted-foreground text-sm">Success Rate</div>
              </div>
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
