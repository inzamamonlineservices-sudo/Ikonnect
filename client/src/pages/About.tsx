import { Card, CardContent } from "@/components/ui/card";
import Badarpic from "@/assets/Badarpic.png";
import OmerPic from "@/assets/omer Pic (1).png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Inzamampic from "@/assets/Inzamam pic.png";
import AbdullahPic from "@/assets/Abdullah Pic.png";
import MoazamPic from "@/assets/Moazam Pic (1).png";
import TalhaPic from "@/assets/talha Pic (2).png";
import {
  Users,
  Target,
  Lightbulb,
  Award,
  Globe,
  Zap,
  Heart,
  TrendingUp,
  Shield,
  Star,
  ArrowRight
} from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Inzamam",
      position: "CEO & Co-Founder",
      image: Inzamampic,
      bio: "Visionary leader with 10+ years in digital innovation and AI solutions."
    },
    {
      name: "Badar Ud Duja",
      position: "Director of Operations",
      image: Badarpic,
      bio: "Technical expert specializing in scalable architectures and automation systems."
    },
    {
      name: "Moazam Feroz",
      position: "Creative Director",
      image: MoazamPic,
      bio: "Full-stack developer passionate about creating exceptional user experiences."
    },
    {
      name: "Abdullah Fida",
      position: "Website Developer",
      image: AbdullahPic,
      bio: "Creative director with expertise in brand identity and user interface design."
    },
    {
      name: "Omer Daraz",
      position: "Full Stack Developer",
      image: OmerPic,
      
      bio: "AI/ML engineer focused on developing intelligent automation solutions."
    },
    {
      name: "Talha Ahmed",
      position: "SEO Expert",
      image: TalhaPic,
      bio: "Agile project manager ensuring seamless delivery and client satisfaction."
    }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly push boundaries with cutting-edge technologies and creative solutions."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We work closely with our clients as partners to achieve shared success."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in everything we deliver."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We're passionate about technology and helping businesses thrive."
    }
  ];

  const achievements = [
    { icon: TrendingUp, number: "500+", label: "Projects Completed" },
    { icon: Users, number: "200+", label: "Happy Clients" },
    { icon: Globe, number: "25+", label: "Countries Served" },
    { icon: Award, number: "50+", label: "Awards Won" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted"></div>
        
        {/* 3D Animation Placeholder */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-16 h-16 bg-chart-2/20 rounded-full blur-xl animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 bg-primary/10 border-primary/20 text-primary" data-testid="about-badge">
              <Users className="w-4 h-4 mr-2" />
              About Ikonnect Service
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="about-title">
              Driving <span className="gradient-text">Digital Innovation</span><br/>
              Since 2022
              
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8" data-testid="about-description">
              We're a team of passionate technologists, designers, and strategists dedicated to transforming 
              businesses through cutting-edge digital solutions and AI-powered automation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="hover-lift" data-testid="mission-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-card-foreground">Our Mission</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To empower businesses with innovative digital solutions that drive growth, efficiency, and competitive advantage. 
                  We believe technology should simplify complexities, not create them. Our mission is to bridge the gap between 
                  advanced technology and practical business applications, making digital transformation accessible to organizations of all sizes.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift" data-testid="vision-card">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-chart-2/20 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-chart-2" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-card-foreground">Our Vision</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To become the leading digital innovation partner for businesses worldwide, recognized for delivering 
                  transformative solutions that shape the future of work. We envision a world where intelligent automation 
                  and human creativity work together to solve complex challenges and create unprecedented value.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="values-title">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="values-description">
              The principles that guide everything we do and shape our company culture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover-lift" data-testid={`value-${index}`}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="achievements-title">
              Our <span className="gradient-text">Achievements</span>
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="achievements-description">
              Numbers that reflect our commitment to excellence and client success
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center hover-lift" data-testid={`achievement-${index}`}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{achievement.number}</div>
                  <div className="text-muted-foreground font-medium">{achievement.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="team-title">
              Meet Our <span className="gradient-text">Expert Team</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="team-description">
              Our diverse team of experts brings together years of experience in technology, design, and business strategy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover-lift group" data-testid={`team-member-${index}`}>
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="fit-to-screen object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-card-foreground">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.position}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="story-title">
                Our <span className="gradient-text">Story</span>
              </h2>
            </div>

            <div className="space-y-12">
              <Card className="hover-lift" data-testid="story-founding">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-card-foreground">The Beginning (2022)</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Ikonnect Service was founded with a simple yet ambitious vision: to make advanced technology 
                        accessible to businesses of all sizes. Starting as a small team of passionate developers and designers, 
                        we recognized the growing gap between available technology and practical business implementation.
                      </p>
                    </div>
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                        alt="Team collaboration" 
                        className="rounded-lg w-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift" data-testid="story-growth">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1 relative">
                      <img 
                        src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                        alt="Modern office workspace" 
                        className="rounded-lg w-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
                    </div>
                    <div className="order-1 lg:order-2">
                      <h3 className="text-2xl font-bold mb-4 text-card-foreground">Growth & Innovation (2020-2023)</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Through dedication to excellence and client success, we rapidly expanded our capabilities and team. 
                        We pioneered innovative solutions in AI integration, data automation, and web development, 
                        earning recognition as leaders in digital transformation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift" data-testid="story-present">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-card-foreground">Today & Beyond (2024+)</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Today, Ikonnect Service is a trusted partner to over 200 businesses worldwide. We continue to 
                        innovate with AI-powered solutions, advanced automation systems, and cutting-edge web technologies. 
                        Our commitment to excellence and client success remains at the heart of everything we do.
                      </p>
                    </div>
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                        alt="Technology and innovation" 
                        className="rounded-lg w-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="why-choose-title">
              Why Choose <span className="gradient-text">Ikonnect Service</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Proven Expertise",
                description: "5+ years of experience delivering successful digital transformation projects across industries."
              },
              {
                icon: Zap,
                title: "Cutting-Edge Technology",
                description: "We use the latest technologies and frameworks to ensure your solutions are future-proof."
              },
              {
                icon: Users,
                title: "Client-Centric Approach",
                description: "Your success is our success. We work as an extension of your team to achieve your goals."
              },
              {
                icon: TrendingUp,
                title: "Measurable Results",
                description: "We focus on delivering tangible outcomes that directly impact your business growth."
              },
              {
                icon: Star,
                title: "Quality Assurance",
                description: "Rigorous testing and quality control processes ensure flawless delivery every time."
              },
              {
                icon: Heart,
                title: "Ongoing Support",
                description: "We provide comprehensive support and maintenance to keep your solutions running smoothly."
              }
            ].map((reason, index) => (
              <Card key={index} className="text-center hover-lift" data-testid={`why-choose-${index}`}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <reason.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-3/10">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6" data-testid="cta-title">
              Ready to Work with <span className="gradient-text">Innovation Leaders</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8" data-testid="cta-description">
              Join hundreds of satisfied clients who have transformed their businesses with our digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="glow-effect" asChild data-testid="cta-contact">
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button variant="outline" size="lg" asChild data-testid="cta-portfolio">
                <Link href="/portfolio">
                  View Our Work
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
