import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Globe, GraduationCap, Building, Star, Clock, BookOpen, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getUniversityById, Program } from "@/data/universities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Group programs by level
const groupProgramsByLevel = (programs: Program[]) => {
  const levels = ["Foundation", "Diploma", "Bachelor", "Master", "PhD"] as const;
  const grouped: Record<string, Program[]> = {};
  
  levels.forEach(level => {
    const filtered = programs.filter(p => p.level === level);
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
  const university = id ? getUniversityById(id) : undefined;

  if (!university) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">University Not Found</h1>
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className={`bg-gradient-to-r ${university.color} py-20`}>
          <div className="container mx-auto px-4">
            <Link to="/universities" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Universities
            </Link>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r ${university.color} bg-clip-text text-transparent">
                  {university.shortName}
                </span>
              </div>
              
              <div className="text-white">
                <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-0">
                  {university.type} University
                </Badge>
                <h1 className="text-3xl md:text-5xl font-display font-bold mb-2">
                  {university.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {university.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Est. {university.established}
                  </span>
                  {university.ranking && (
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {university.ranking}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
                    <Building className="h-6 w-6 text-primary" />
                    About
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {university.description}
                  </p>
                </div>

                {/* Programs Offered */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Programs Offered
                  </h2>
                  
                  {/* Program Level Summary */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
                    {(["Foundation", "Diploma", "Bachelor", "Master", "PhD"] as const).map((level) => {
                      const count = university.programs.filter(p => p.level === level).length;
                      if (count === 0) return null;
                      return (
                        <div 
                          key={level}
                          className={`relative overflow-hidden rounded-xl p-4 bg-gradient-to-br ${getLevelColor(level)} text-white text-center group hover:scale-105 transition-transform duration-300`}
                        >
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="text-2xl font-bold">{count}</div>
                          <div className="text-xs font-medium opacity-90">{level}</div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Tabbed Program View */}
                  <Tabs defaultValue={Object.keys(groupProgramsByLevel(university.programs))[0]} className="w-full">
                    <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1 rounded-xl mb-6">
                      {Object.keys(groupProgramsByLevel(university.programs)).map((level) => (
                        <TabsTrigger 
                          key={level} 
                          value={level}
                          className={`flex-1 min-w-[80px] data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg`}
                        >
                          {level}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {Object.entries(groupProgramsByLevel(university.programs)).map(([level, programs]) => (
                      <TabsContent key={level} value={level} className="mt-0">
                        <div className="grid gap-4">
                          {programs.map((program, index) => (
                            <div
                              key={index}
                              className="group relative overflow-hidden bg-muted/30 hover:bg-muted/60 rounded-xl p-5 transition-all duration-300 border border-border/50 hover:border-border hover:shadow-md"
                            >
                              {/* Decorative gradient line */}
                              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getLevelColor(level)}`} />
                              
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pl-3">
                                <div className="flex-1">
                                  <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${getLevelColor(level)} text-white shrink-0`}>
                                      <BookOpen className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                                        {program.name}
                                      </h3>
                                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        {program.faculty}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                                  <Badge className={`${getLevelBadgeClass(level)} border-0`}>
                                    {program.level}
                                  </Badge>
                                  <Badge variant="outline" className="flex items-center gap-1">
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
                  
                  {/* Total Programs Count */}
                  <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-sm text-muted-foreground">
                    <span>Total Programs Available</span>
                    <Badge variant="secondary" className="text-base">
                      {university.programs.length} Programs
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full justify-start">
                        <Globe className="mr-2 h-4 w-4" />
                        Visit Website
                      </Button>
                    </a>
                    <Link to="/contact" className="block">
                      <Button className="w-full">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Highlights */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-semibold mb-4">Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {university.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-0">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-semibold mb-4">Facilities</h3>
                  <ul className="space-y-2">
                    {university.facilities.map((facility, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
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
