import { useRef, useState } from "react";
import { MapPin, Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUniversities } from "@/hooks/useUniversities";

// Skeleton card component with shimmer effect
const UniversityCardSkeleton = () => (
  <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-card border border-transparent flex flex-col overflow-hidden">
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl mb-4 animate-shimmer" />
    <div className="h-5 w-3/4 mb-2 rounded animate-shimmer" />
    <div className="h-4 w-1/2 mb-2 rounded animate-shimmer" style={{ animationDelay: "0.1s" }} />
    <div className="flex items-center gap-2 mb-3">
      <div className="w-4 h-4 rounded-full animate-shimmer" style={{ animationDelay: "0.15s" }} />
      <div className="h-3 w-24 rounded animate-shimmer" style={{ animationDelay: "0.2s" }} />
    </div>
    <div className="flex flex-wrap gap-1 mb-3">
      <div className="h-4 w-14 rounded animate-shimmer" style={{ animationDelay: "0.25s" }} />
      <div className="h-4 w-12 rounded animate-shimmer" style={{ animationDelay: "0.3s" }} />
      <div className="h-4 w-16 rounded animate-shimmer" style={{ animationDelay: "0.35s" }} />
    </div>
    <div className="h-6 w-16 rounded-full animate-shimmer" style={{ animationDelay: "0.4s" }} />
    <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
      <div className="h-8 flex-1 rounded-lg animate-shimmer" style={{ animationDelay: "0.45s" }} />
      <div className="h-8 flex-1 rounded-lg animate-shimmer" style={{ animationDelay: "0.5s" }} />
    </div>
  </div>
);

const Universities = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"All" | "Public" | "Private">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: universities = [], isLoading, error } = useUniversities();

  const filteredUniversities = universities.filter((uni) => {
    const matchesFilter = filter === "All" || uni.type === filter;
    const matchesSearch =
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <section className="py-12 sm:py-16 lg:py-24 bg-background" ref={sectionRef}>
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
                Our Partner <span className="gradient-text">Universities</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6 text-sm sm:text-base px-4">
                We work with {universities.length}+ top Malaysian universities to help you achieve your academic goals
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
                <Search className="absolute left-7 sm:left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search universities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-5 sm:py-6 rounded-full border-muted-foreground/20 text-sm sm:text-base"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex justify-center gap-2 sm:gap-3 flex-wrap px-4">
                {(["All", "Public", "Private"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all text-sm sm:text-base ${
                      filter === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Something went wrong</h3>
                <p className="text-muted-foreground">Please try again later</p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <UniversityCardSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Universities Grid */}
            {!isLoading && !error && filteredUniversities.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredUniversities.map((uni, index) => (
                  <div
                    key={uni.id}
                    className="group relative bg-card rounded-2xl p-4 sm:p-6 shadow-card transition-all duration-500 border border-transparent flex flex-col overflow-hidden
                      hover:shadow-[0_8px_40px_-5px_hsl(245_58%_51%/0.25)] hover:border-indigo-500/30 hover:-translate-y-1
                      before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-indigo-500/0 before:to-purple-500/0 before:transition-all before:duration-500
                      hover:before:from-indigo-500/5 hover:before:to-purple-500/10
                      animate-fade-in-up"
                    style={{ animationDelay: `${Math.min(index * 0.05, 0.4)}s` }}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-100 group-hover:from-indigo-500/20 group-hover:via-purple-500/10 group-hover:to-pink-500/20 transition-all duration-500 blur-xl -z-10" />

                    {/* Logo */}
                    <div
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br ${uni.color} flex items-center justify-center mb-4 shadow-lg 
                        transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl`}
                    >
                      <span className="text-white font-bold text-sm sm:text-lg drop-shadow-md">{uni.shortName}</span>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* University Info */}
                    <div className="flex-grow relative z-10">
                      <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                        {uni.name}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm mb-3 group-hover:text-foreground/70 transition-colors duration-300">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{uni.location}, Malaysia</span>
                      </div>

                      {/* Program Levels */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {(["Foundation", "Diploma", "Bachelor", "Master", "PhD"] as const).map((level) => {
                          const hasLevel = uni.programs.some((p) => p.level === level);
                          if (!hasLevel) return null;
                          return (
                            <span
                              key={level}
                              className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                            >
                              {level}
                            </span>
                          );
                        })}
                      </div>

                      <span
                        className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          uni.type === "Public"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40"
                            : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40"
                        }`}
                      >
                        {uni.type}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-border/50 group-hover:border-indigo-500/20 transition-colors duration-300 relative z-10">
                      <Link to="/contact" className="flex-1">
                        <Button size="sm" className="w-full btn-glass-primary rounded-lg group-hover:shadow-md transition-shadow duration-300 text-xs sm:text-sm">
                          Apply
                        </Button>
                      </Link>
                      <Link to={`/universities/${uni.id}`} className="flex-1">
                        <Button size="sm" variant="ghost" className="w-full btn-glass-outline rounded-lg text-xs sm:text-sm">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && filteredUniversities.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No universities found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}

            {/* Stats */}
            {!isLoading && !error && (
              <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                {[
                  { value: `${universities.length}+`, label: "Partner Universities" },
                  { value: universities.filter((u) => u.type === "Public").length, label: "Public Universities" },
                  { value: universities.filter((u) => u.type === "Private").length, label: "Private Universities" },
                  { value: "100%", label: "Success Rate" },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="group relative p-4 sm:p-6 bg-card rounded-2xl shadow-card overflow-hidden transition-all duration-500 hover:shadow-hover hover:-translate-y-1
                      before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-500/0 before:to-purple-500/0 before:transition-all before:duration-500
                      hover:before:from-indigo-500/5 hover:before:to-purple-500/10
                      animate-fade-in-up"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <div className="relative z-10">
                      <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground text-xs sm:text-sm group-hover:text-foreground/70 transition-colors duration-300">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Universities;
