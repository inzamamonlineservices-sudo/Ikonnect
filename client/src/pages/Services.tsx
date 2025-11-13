import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Database,
  Code,
  MessageSquare,
  Search,
  Palette,
  Lightbulb,
  ArrowRight,
  Zap,
  Globe,
  Bot
} from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "ai-&-data-automation",
      name: "Data Automation",
      description: "Streamline your workflows with intelligent data processing, automated reporting, and seamless integrations that save time and reduce errors.",
      longDescription: "Transform your business operations with our comprehensive data automation solutions. We help you eliminate manual processes, reduce errors, and gain valuable insights through automated data collection, processing, and reporting systems.",
      icon: Database,
      color: "text-primary",
      features: [
        "Automated Data Collection",
        "Real-time Processing",
        "Custom Reporting Dashboards",
        "API Integrations",
        "Data Validation & Cleansing",
        "Workflow Automation"
      ],
      benefits: [
        "Save 40+ hours per week",
        "99% accuracy in data processing",
        "Real-time insights",
        "Seamless system integration"
      ],
      technologies: ["Python", "Apache Airflow", "PostgreSQL", "React", "Docker"]
    },
    {
      id: "web-development",
      name: "Web Development",
      description: "Custom web applications built with modern technologies, optimized for performance, scalability, and exceptional user experiences.",
      longDescription: "Create powerful, scalable web applications that drive your business forward. Our expert developers use cutting-edge technologies to build fast, secure, and user-friendly websites and web applications.",
      icon: Code,
      color: "text-chart-2",
      features: [
        "Responsive Web Design",
        "Progressive Web Apps",
        "E-commerce Solutions",
        "Content Management Systems",
        "API Development",
        "Performance Optimization"
      ],
      benefits: [
        "150% increase in user engagement",
        "Mobile-first responsive design",
        "99.9% uptime guarantee",
        "SEO optimized"
      ],
      technologies: ["React", "Node.js", "Next.js", "TypeScript", "Tailwind CSS"]
    },
    {
      id: "ai-chatbots-&-agents",
      name: "AI Chatbots & Agents",
      description: "Intelligent conversational AI solutions that enhance customer service, automate support, and integrate seamlessly with your systems.",
      longDescription: "Revolutionize your customer support with AI-powered chatbots that understand context, provide accurate responses, and learn from every interaction to continuously improve service quality.",
      icon: MessageSquare,
      color: "text-chart-3",
      features: [
        "Natural Language Processing",
        "Multi-platform Integration",
        "Sentiment Analysis",
        "Automated Ticket Routing",
        "24/7 Customer Support",
        "Analytics & Insights"
      ],
      benefits: [
        "80% automation rate",
        "60% increase in satisfaction",
        "24/7 availability",
        "Reduced response time"
      ],
      technologies: ["Python", "TensorFlow", "Dialogflow", "WebSocket", "Node.js"]
    },
    {
      id: "web-extraction",
      name: "Web Extraction",
      description: "Advanced web scraping and data extraction solutions to gather, process, and analyze valuable information from any online source.",
      longDescription: "Unlock the power of web data with our sophisticated extraction tools. We help you gather competitive intelligence, monitor market trends, and automate data collection from any online source.",
      icon: Search,
      color: "text-chart-4",
      features: [
        "Large-scale Data Scraping",
        "Real-time Monitoring",
        "Anti-detection Systems",
        "Data Cleaning & Processing",
        "Competitive Intelligence",
        "Market Research Automation"
      ],
      benefits: [
        "Gather millions of data points",
        "Real-time market insights",
        "Competitive advantage",
        "Automated research"
      ],
      technologies: ["Python", "Scrapy", "Selenium", "BeautifulSoup", "Proxy Networks"]
    },
    {
      id: "graphic-design",
      name: "Graphic Designing",
      description: "Creative visual solutions including branding, UI/UX design, marketing materials, and digital assets that captivate your audience.",
      longDescription: "Bring your brand to life with stunning visual designs that communicate your message effectively. From logos to complete brand identities, we create designs that resonate with your target audience.",
      icon: Palette,
      color: "text-chart-5",
      features: [
        "Brand Identity Design",
        "UI/UX Design",
        "Marketing Materials",
        "Social Media Graphics",
        "Print Design",
        "Digital Assets"
      ],
      benefits: [
        "200% increase in brand recognition",
        "Professional brand identity",
        "Consistent visual language",
        "Enhanced user experience"
      ],
      technologies: ["Figma", "Adobe Creative Suite", "Sketch", "Principle", "InVision"]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-primary/10 border-primary/20 text-primary" data-testid="services-badge">
            <Zap className="w-4 h-4 mr-2" />
            Our Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="services-title">
            Comprehensive <span className="gradient-text">Digital Solutions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-description">
            We offer a complete suite of digital services designed to transform your business operations, 
            enhance customer experiences, and drive sustainable growth through innovative technology solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={service.id} className="service-card hover-lift cursor-pointer group" data-testid={`service-card-${index}`}>
              <CardContent className="p-8 bg-[#ffffff]">
                <div className={`w-16 h-16 bg-${service.color.split('-')[1]}/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-${service.color.split('-')[1]}/30 transition-colors`}>
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-card-foreground">{service.name}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.longDescription}</p>
                
                {/* Key Features */}
                <div className="mb-6">
                  <h3 className="font-semibold text-card-foreground mb-3">Key Features:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className={`w-2 h-2 ${service.color.replace('text-', 'bg-')} rounded-full mr-2`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h3 className="font-semibold text-card-foreground mb-3">Key Benefits:</h3>
                  <div className="space-y-1">
                    {service.benefits.slice(0, 2).map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-sm text-muted-foreground">
                        <ArrowRight className="w-3 h-3 text-chart-2 mr-2" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.slice(0, 3).map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {service.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{service.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="flex-1" data-testid={`service-learn-more-${index}`}>
                    <Link href={`/services/${service.id}`}>
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild data-testid={`service-contact-${index}`}>
                    <Link href="/contact">Get Quote</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Solutions CTA */}
        <Card className="bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-3/10 border-primary/20" data-testid="custom-solutions-cta">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Need Something Custom?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have a unique challenge that doesn't fit into our standard services? We love building custom solutions 
              that perfectly match your specific business requirements and goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild data-testid="custom-solutions-contact">
                <Link href="/contact">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Discuss Your Project
                </Link>
              </Button>
              <Button variant="outline" size="lg" data-testid="custom-solutions-portfolio">
                <Link href="/portfolio">
                  <Globe className="w-5 h-5 mr-2" />
                  View Our Work
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Process Overview */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="process-title">
              Our <span className="gradient-text">Development Process</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="process-description">
              We follow a proven methodology to ensure your project is delivered on time, within budget, and exceeds expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We analyze your requirements and define project scope"
              },
              {
                step: "02", 
                title: "Design",
                description: "Create wireframes, prototypes, and technical architecture"
              },
              {
                step: "03",
                title: "Development",
                description: "Build your solution using agile development practices"
              },
              {
                step: "04",
                title: "Launch",
                description: "Deploy, test, and provide ongoing support and maintenance"
              }
            ].map((phase, index) => (
              <Card key={index} className="text-center" data-testid={`process-step-${index}`}>
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-4">{phase.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                  <p className="text-muted-foreground">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
