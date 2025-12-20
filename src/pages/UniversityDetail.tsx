import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Globe, GraduationCap, Building, Star, Clock, BookOpen, Users, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUniversity, Program } from "@/hooks/useUniversities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UniversityLogo from "@/components/UniversityLogo";

// Group programs by level
const groupProgramsByLevel = (programs: Program[]) => {
  const levels = ["Foundation", "Diploma", "Bachelor", "Master", "PhD"] as const;
  const grouped: Record<string, Program[]> = {};

  levels.forEach((level) => {
    const filtered = programs.filter((p) => p.level === level);
    if (filtered.length > 0) {
      grouped[level] = filtered;
    }
  });

  return grouped;
};

// Get level color
const getLevelColor = (level: string) => {
  switch (level) {
    case "Foundation":
      return "from-amber-500 to-orange-500";
    case "Diploma":
      return "from-emerald-500 to-green-500";
    case "Bachelor":
      return "from-blue-500 to-indigo-500";
    case "Master":
      return "from-purple-500 to-violet-500";
    case "PhD":
      return "from-rose-500 to-pink-500";
    default:
      return "from-gray-500 to-slate-500";
  }
};

const getLevelBadgeClass = (level: string) => {
  switch (level) {
    case "Foundation":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
    case "Diploma":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
    case "Bachelor":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
    case "Master":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
    case "PhD":
      return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
  }
};

const UniversityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: university, isLoading, error } = useUniversity(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading university details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">University Not Found</h1>
            <p className="text-muted-foreground mb-6">The university you're looking for doesn't exist.</p>
            <Link to="/universities">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Universities
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const groupedPrograms = groupProgramsByLevel(university.programs);
  const programLevels = Object.keys(groupedPrograms);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className={`bg-gradient-to-r ${university.color} py-12 sm:py-16 lg:py-20`}>
          <div className="container mx-auto px-4">
            <Link to="/universities" className="inline-flex items-center text-white/80 hover:text-white mb-4 sm:mb-6 transition-colors text-sm sm:text-base">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Universities
            </Link>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <UniversityLogo
                logoUrl={university.logoUrl}
                shortName={university.shortName}
                color={university.color}
                size="lg"
                className="bg-white flex-shrink-0"
              />

              <div className="text-white">
                <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-0 text-xs sm:text-sm">
                  {university.type} University
                </Badge>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-2">
                  {university.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-white/90 text-xs sm:text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    {university.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    Est. {university.established}
                  </span>
                  {university.ranking && (
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                      {university.ranking}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                {/* About */}
                <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-card">
                  <h2 className="text-xl sm:text-2xl font-display font-bold mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    About
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {university.description}
                  </p>
                </div>

                {/* Programs Offered */}
                <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-card">
                  <h2 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    Programs Offered
                  </h2>

                  {/* Program Level Summary */}
                  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 mb-6 sm:mb-8">
                    {(["Foundation", "Diploma", "Bachelor", "Master", "PhD"] as const).map((level) => {
                      const count = university.programs.filter((p) => p.level === level).length;
                      if (count === 0) return null;
                      return (
                        <div
                          key={level}
                          className={`relative overflow-hidden rounded-xl p-3 sm:p-4 bg-gradient-to-br ${getLevelColor(level)} text-white text-center group hover:scale-105 transition-transform duration-300`}
                        >
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="text-xl sm:text-2xl font-bold">{count}</div>
                          <div className="text-[10px] sm:text-xs font-medium opacity-90">{level}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tabbed Program View */}
                  {programLevels.length > 0 && (
                    <Tabs defaultValue={programLevels[0]} className="w-full">
                      <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1 rounded-xl mb-4 sm:mb-6">
                        {programLevels.map((level) => (
                          <TabsTrigger
                            key={level}
                            value={level}
                            className="flex-1 min-w-[60px] sm:min-w-[80px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg text-xs sm:text-sm py-1.5 sm:py-2"
                          >
                            {level}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {Object.entries(groupedPrograms).map(([level, programs]) => (
                        <TabsContent key={level} value={level} className="mt-0">
                          <div className="grid gap-3 sm:gap-4">
                            {programs.map((program, index) => (
                              <div
                                key={index}
                                className="group relative overflow-hidden bg-muted/30 hover:bg-muted/60 rounded-xl p-4 sm:p-5 transition-all duration-300 border border-border/50 hover:border-border hover:shadow-md"
                              >
                                {/* Decorative gradient line */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getLevelColor(level)}`} />

                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 pl-3">
                                  <div className="flex-1">
                                    <div className="flex items-start gap-2 sm:gap-3">
                                      <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${getLevelColor(level)} text-white shrink-0`}>
                                        <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                                      </div>
                                      <div>
                                        <h3 className="font-semibold text-foreground text-sm sm:text-lg group-hover:text-primary transition-colors">
                                          {program.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 flex items-center gap-1">
                                          <Users className="w-3 h-3" />
                                          {program.faculty}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-2 sm:justify-end pl-6 sm:pl-0">
                                    <Badge className={`${getLevelBadgeClass(level)} border-0 text-xs`}>
                                      {program.level}
                                    </Badge>
                                    <Badge variant="outline" className="flex items-center gap-1 text-xs">
                                      <Clock className="w-3 h-3" />
                                      {program.duration}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  )}

                  {/* Total Programs Count */}
                  <div className="mt-4 sm:mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                    <span>Total Programs Available</span>
                    <Badge variant="secondary" className="text-sm sm:text-base">
                      {university.programs.length} Programs
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4 sm:space-y-6">
                {/* Quick Actions */}
                <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-card">
                  <h3 className="font-semibold mb-4 text-sm sm:text-base">Quick Actions</h3>
                  <div className="space-y-3">
                    <a href={university.website} target="_blank" rel="noopener noreferrer" className="w-full block">
                      <Button variant="outline" className="w-full justify-start text-sm">
                        <Globe className="mr-2 h-4 w-4" />
                        Visit Website
                      </Button>
                    </a>
                    <Link to="/contact" className="block">
                      <Button className="w-full text-sm">Apply Now</Button>
                    </Link>
                  </div>
                </div>

                {/* Highlights */}
                <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-card">
                  <h3 className="font-semibold mb-4 text-sm sm:text-base">Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {university.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-0 text-xs sm:text-sm">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-card">
                  <h3 className="font-semibold mb-4 text-sm sm:text-base">Facilities</h3>
                  <ul className="space-y-2">
                    {university.facilities.map((facility, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UniversityDetail;
