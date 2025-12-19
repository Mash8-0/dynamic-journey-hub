import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Globe, GraduationCap, Building, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getUniversityById } from "@/data/universities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
                  <div className="grid gap-4">
                    {university.programs.map((program, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                      >
                        <div>
                          <h3 className="font-semibold text-foreground">{program.name}</h3>
                          <p className="text-sm text-muted-foreground">{program.faculty}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                          <Badge variant="outline">{program.level}</Badge>
                          <Badge variant="secondary">{program.duration}</Badge>
                        </div>
                      </div>
                    ))}
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
