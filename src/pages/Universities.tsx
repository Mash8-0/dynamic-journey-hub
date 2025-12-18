import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const allUniversities = [
  // Public Universities
  { name: "Universiti Malaya", shortName: "UM", location: "Kuala Lumpur", color: "from-blue-600 to-blue-800", type: "Public" },
  { name: "Universiti Putra Malaysia", shortName: "UPM", location: "Serdang", color: "from-green-600 to-green-800", type: "Public" },
  { name: "Universiti Kebangsaan Malaysia", shortName: "UKM", location: "Bangi", color: "from-red-600 to-red-800", type: "Public" },
  { name: "Universiti Teknologi Malaysia", shortName: "UTM", location: "Johor Bahru", color: "from-purple-600 to-purple-800", type: "Public" },
  { name: "Universiti Sains Malaysia", shortName: "USM", location: "Penang", color: "from-yellow-500 to-orange-600", type: "Public" },
  { name: "Universiti Teknologi MARA", shortName: "UiTM", location: "Shah Alam", color: "from-purple-500 to-indigo-600", type: "Public" },
  { name: "Universiti Utara Malaysia", shortName: "UUM", location: "Sintok", color: "from-emerald-500 to-teal-600", type: "Public" },
  { name: "Universiti Malaysia Sabah", shortName: "UMS", location: "Kota Kinabalu", color: "from-cyan-500 to-blue-600", type: "Public" },
  { name: "Universiti Malaysia Sarawak", shortName: "UNIMAS", location: "Kota Samarahan", color: "from-amber-500 to-orange-600", type: "Public" },
  { name: "Universiti Pendidikan Sultan Idris", shortName: "UPSI", location: "Tanjung Malim", color: "from-rose-500 to-pink-600", type: "Public" },
  { name: "Universiti Malaysia Terengganu", shortName: "UMT", location: "Kuala Terengganu", color: "from-sky-500 to-blue-600", type: "Public" },
  { name: "Universiti Malaysia Pahang", shortName: "UMP", location: "Kuantan", color: "from-lime-500 to-green-600", type: "Public" },
  { name: "Universiti Malaysia Perlis", shortName: "UniMAP", location: "Perlis", color: "from-violet-500 to-purple-600", type: "Public" },
  { name: "Universiti Teknikal Malaysia Melaka", shortName: "UTeM", location: "Melaka", color: "from-fuchsia-500 to-pink-600", type: "Public" },
  { name: "Universiti Tun Hussein Onn Malaysia", shortName: "UTHM", location: "Batu Pahat", color: "from-orange-500 to-red-600", type: "Public" },
  { name: "Universiti Sultan Zainal Abidin", shortName: "UniSZA", location: "Kuala Terengganu", color: "from-teal-500 to-cyan-600", type: "Public" },
  
  // Private Universities
  { name: "Taylor's University", shortName: "TU", location: "Subang Jaya", color: "from-indigo-600 to-indigo-800", type: "Private" },
  { name: "Sunway University", shortName: "SU", location: "Petaling Jaya", color: "from-orange-500 to-red-600", type: "Private" },
  { name: "UCSI University", shortName: "UCSI", location: "Cheras", color: "from-teal-600 to-teal-800", type: "Private" },
  { name: "Monash University Malaysia", shortName: "MUM", location: "Bandar Sunway", color: "from-slate-600 to-slate-800", type: "Private" },
  { name: "University of Nottingham Malaysia", shortName: "UNM", location: "Semenyih", color: "from-blue-700 to-blue-900", type: "Private" },
  { name: "Heriot-Watt University Malaysia", shortName: "HWUM", location: "Putrajaya", color: "from-red-700 to-red-900", type: "Private" },
  { name: "INTI International University", shortName: "INTI", location: "Nilai", color: "from-green-600 to-emerald-700", type: "Private" },
  { name: "Asia Pacific University", shortName: "APU", location: "Kuala Lumpur", color: "from-red-500 to-orange-600", type: "Private" },
  { name: "Multimedia University", shortName: "MMU", location: "Cyberjaya", color: "from-blue-500 to-indigo-600", type: "Private" },
  { name: "HELP University", shortName: "HELP", location: "Kuala Lumpur", color: "from-green-500 to-teal-600", type: "Private" },
  { name: "SEGi University", shortName: "SEGi", location: "Kota Damansara", color: "from-blue-600 to-cyan-600", type: "Private" },
  { name: "Management & Science University", shortName: "MSU", location: "Shah Alam", color: "from-amber-600 to-yellow-500", type: "Private" },
  { name: "Limkokwing University", shortName: "LUCT", location: "Cyberjaya", color: "from-red-600 to-pink-600", type: "Private" },
  { name: "Universiti Tunku Abdul Rahman", shortName: "UTAR", location: "Kampar", color: "from-emerald-600 to-green-700", type: "Private" },
  { name: "MAHSA University", shortName: "MAHSA", location: "Bandar Saujana Putra", color: "from-sky-600 to-blue-700", type: "Private" },
  { name: "Perdana University", shortName: "PU", location: "Serdang", color: "from-violet-600 to-purple-700", type: "Private" },
];

const Universities = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<"All" | "Public" | "Private">("All");

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

  const filteredUniversities = filter === "All" 
    ? allUniversities 
    : allUniversities.filter(uni => uni.type === filter);

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
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                We work with {allUniversities.length}+ top Malaysian universities to help you achieve your academic goals
              </p>
              
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {filteredUniversities.map((uni, index) => (
                <div
                  key={uni.name}
                  className={`group bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-500 cursor-pointer border border-transparent hover:border-primary/20 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
                >
                  {/* Logo Placeholder with Gradient */}
                  <div 
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${uni.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}
                  >
                    <span className="text-white font-bold text-sm">{uni.shortName}</span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm lg:text-base mb-2 line-clamp-2">
                    {uni.name}
                  </h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{uni.location}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    uni.type === "Public" 
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" 
                      : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                  }`}>
                    {uni.type}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-6 bg-card rounded-2xl shadow-card">
                <div className="text-3xl font-bold gradient-text mb-2">{allUniversities.length}+</div>
                <div className="text-muted-foreground text-sm">Partner Universities</div>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-card">
                <div className="text-3xl font-bold gradient-text mb-2">{allUniversities.filter(u => u.type === "Public").length}</div>
                <div className="text-muted-foreground text-sm">Public Universities</div>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-card">
                <div className="text-3xl font-bold gradient-text mb-2">{allUniversities.filter(u => u.type === "Private").length}</div>
                <div className="text-muted-foreground text-sm">Private Universities</div>
              </div>
              <div className="p-6 bg-card rounded-2xl shadow-card">
                <div className="text-3xl font-bold gradient-text mb-2">100%</div>
                <div className="text-muted-foreground text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Universities;
