import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Users, Target, Award, Heart, Lightbulb, Eye, Linkedin, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ceoFounderImage from "@/assets/ceo-founder.jpg";
import coFounderImage from "@/assets/co-founder-coo.png";

const teamMembers = [
  {
    name: "Ahmad Rahman",
    role: "Founder & CEO",
    image: ceoFounderImage,
    bio: "With over 15 years in international education, Ahmad founded VisaRoute to help students achieve their global education dreams.",
    linkedin: "#",
    email: "ahmad@visaroute.com",
    isFounder: true,
    imagePosition: "object-top",
  },
  {
    name: "Sarah Chen",
    role: "Co-Founder & COO",
    image: coFounderImage,
    bio: "Sarah brings 12 years of operations expertise, ensuring every student receives personalized attention and support.",
    linkedin: "#",
    email: "sarah@visaroute.com",
    isCoFounder: true,
    imagePosition: "object-[center_20%]",
  },
  {
    name: "Dr. Michael Tan",
    role: "Head of Admissions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Former university admissions officer with deep knowledge of application processes.",
    linkedin: "#",
    email: "michael@visaroute.com",
  },
  {
    name: "Priya Sharma",
    role: "Senior Visa Consultant",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Expert in Malaysian visa regulations with 8+ years helping students navigate immigration.",
    linkedin: "#",
    email: "priya@visaroute.com",
  },
  {
    name: "James Wong",
    role: "Student Success Manager",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    bio: "Dedicated to ensuring every student's journey from application to graduation is smooth.",
    linkedin: "#",
    email: "james@visaroute.com",
  },
  {
    name: "Aisha Malik",
    role: "University Relations",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    bio: "Builds and maintains partnerships with top Malaysian universities.",
    linkedin: "#",
    email: "aisha@visaroute.com",
  },
];

const TeamMemberCard = ({ member }: { member: typeof teamMembers[0] }) => {
  const isLeader = member.isFounder || member.isCoFounder;
  const imagePosition = member.imagePosition || "object-center";
  
  return (
    <Card className={`group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
      isLeader ? 'bg-gradient-to-br from-primary/5 via-card to-accent/5 border-primary/20' : 'bg-card'
    }`}>
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <div className={`aspect-square ${isLeader ? 'bg-gradient-to-br from-primary/20 to-accent/20' : 'bg-muted'}`}>
            <img
              src={member.image}
              alt={member.name}
              className={`w-full h-full object-cover ${imagePosition} transition-transform duration-500 group-hover:scale-110`}
            />
          </div>
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <div className="flex gap-3">
              <a
                href={member.linkedin}
                className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors"
                aria-label={`${member.name}'s LinkedIn`}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${member.email}`}
                className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors"
                aria-label={`Email ${member.name}`}
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          {/* Badge for founders */}
          {isLeader && (
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full shadow-lg">
                {member.isFounder ? 'Founder' : 'Co-Founder'}
              </span>
            </div>
          )}
        </div>
        <div className="p-6 text-center">
          <h3 className={`font-display font-bold mb-1 ${isLeader ? 'text-xl' : 'text-lg'}`}>
            {member.name}
          </h3>
          <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
          <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const About = () => {
  const founders = teamMembers.filter(m => m.isFounder || m.isCoFounder);
  const team = teamMembers.filter(m => !m.isFounder && !m.isCoFounder);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About Us - VisaRoute | Your Trusted Education Partner"
        description="Learn about VisaRoute's mission to help students achieve their dreams of studying in Malaysia. Meet our experienced team of education consultants."
        keywords="about visaroute, education consultants, study abroad team, malaysia education experts"
      />
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary/50 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wider uppercase mb-4">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-6">
                Your Trusted Partner in <br />
                <span className="gradient-text">Global Education</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                We are dedicated to helping students achieve their dreams of studying abroad with personalized guidance and expert support.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
                <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 md:p-10 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-6 flex items-center gap-3">
                    <span>Our Mission</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                    At VisaRoute, we believe every student deserves the opportunity to access world-class education. Our mission is to bridge the gap between ambitious students and top universities in Malaysia.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We are committed to providing transparent, personalized guidance that empowers students to make informed decisions about their educational journey. Through integrity, dedication, and expertise, we transform dreams into reality.
                  </p>
                  <div className="mt-8 pt-6 border-t border-border/50">
                    <p className="text-primary font-semibold italic">
                      "Empowering dreams, one student at a time."
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
                <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 md:p-10 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                    <Eye className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-6 flex items-center gap-3">
                    <span>Our Vision</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                    To be the most trusted and recognized education consultancy in the region, known for our unwavering commitment to student success and ethical practices.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We envision a world where geographical and financial barriers don't limit educational aspirations. By 2030, we aim to help 10,000+ students achieve their academic goals in Malaysia's finest institutions.
                  </p>
                  <div className="mt-8 pt-6 border-t border-border/50">
                    <p className="text-primary font-semibold italic">
                      "Creating pathways to global opportunities."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "10+", label: "Years Experience" },
                { value: "1.5K+", label: "Happy Students" },
                { value: "55+", label: "Partner Universities" },
                { value: "98%", label: "Success Rate" },
              ].map((stat, i) => (
                <div key={i} className="bg-card p-6 rounded-2xl shadow-card text-center hover:shadow-xl transition-shadow">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wider uppercase mb-4">
                Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Meet Our <span className="gradient-text">Founders</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Visionary leaders who started VisaRoute with a passion for education and student success.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {founders.map((member, i) => (
                <TeamMemberCard key={i} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wider uppercase mb-4">
                Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                The Experts Behind <span className="gradient-text">Your Success</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Our dedicated team of professionals is committed to guiding you every step of the way.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <TeamMemberCard key={i} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wider uppercase mb-4">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                What We <span className="gradient-text">Stand For</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Users, title: "Expert Team", desc: "Experienced counselors dedicated to your success" },
                { icon: Target, title: "Personalized Approach", desc: "Tailored solutions for every student's needs" },
                { icon: Award, title: "Proven Results", desc: "High success rate with top universities" },
                { icon: Heart, title: "Student First", desc: "Your dreams are our priority" },
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
