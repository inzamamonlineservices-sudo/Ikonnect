import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Database,
  Code,
  MessageSquare,
  Search,
  Palette,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";

export default function ServiceDetail() {
  const [, params] = useRoute("/services/:service");
  const serviceId = params?.service;

  const services: Record<string, any> = {
    "ai-&-data-automation": {
      name: "AI & Data Automation",
      description: "Streamline your workflows with intelligent data processing, automated reporting, and seamless integrations that save time and reduce errors.",
      longDescription: "Transform your business operations with our comprehensive data automation solutions. We eliminate manual processes, reduce errors, and provide valuable insights through automated data collection, processing, and reporting systems. Our solutions scale with your business and integrate seamlessly with your existing infrastructure.",
      icon: Database,
      color: "text-primary",
      heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
      features: [
        "Automated Data Collection & Processing",
        "Real-time Monitoring & Alerts",
        "Custom Reporting Dashboards",
        "API Integrations & Webhooks",
        "Data Validation & Cleansing",
        "Workflow Automation & Optimization",
        "Cloud & On-premise Solutions",
        "Scalable Architecture Design"
      ],
      benefits: [
        { title: "Time Savings", description: "Save 40+ hours per week on manual data tasks", icon: Zap },
        { title: "Accuracy", description: "99% accuracy in data processing and reporting", icon: CheckCircle },
        { title: "Real-time Insights", description: "Get instant access to business intelligence", icon: TrendingUp },
        { title: "Seamless Integration", description: "Works with your existing tools and systems", icon: Shield }
      ],
      process: [
        {
          title: "Data Assessment",
          description: "We analyze your current data workflows and identify automation opportunities."
        },
        {
          title: "Solution Design",
          description: "Create a custom automation architecture tailored to your specific needs."
        },
        {
          title: "Implementation",
          description: "Build and deploy the automation system with minimal disruption to your operations."
        },
        {
          title: "Optimization",
          description: "Monitor performance and continuously optimize for better results."
        }
      ],
      technologies: ["Python", "Apache Airflow", "PostgreSQL", "Redis", "Docker", "AWS/Azure", "React", "FastAPI"],
      useCases: [
        "Financial Reporting Automation",
        "Inventory Management Systems",
        "Customer Data Processing",
        "Marketing Campaign Analytics",
        "Supply Chain Optimization",
        "Quality Assurance Automation"
      ]
    },
    "web-development": {
      name: "Web Development",
      description: "Custom web applications built with modern technologies, optimized for performance, scalability, and exceptional user experiences.",
      longDescription: "Create powerful, scalable web applications that drive your business forward. Our expert developers use cutting-edge technologies to build fast, secure, and user-friendly websites and web applications that deliver exceptional performance across all devices and platforms.",
      icon: Code,
      color: "text-chart-2",
      heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
      features: [
        "Responsive Web Design",
        "Progressive Web Applications",
        "E-commerce Solutions",
        "Content Management Systems",
        "API Development & Integration",
        "Performance Optimization",
        "SEO & Accessibility",
        "Security Implementation"
      ],
      benefits: [
        { title: "User Engagement", description: "150% increase in user engagement and conversions", icon: Users },
        { title: "Mobile-First", description: "Responsive design that works perfectly on all devices", icon: CheckCircle },
        { title: "High Performance", description: "99.9% uptime with lightning-fast load times", icon: Zap },
        { title: "SEO Optimized", description: "Built-in SEO best practices for better rankings", icon: TrendingUp }
      ],
      process: [
        {
          title: "Requirements Analysis",
          description: "Understand your business goals and technical requirements."
        },
        {
          title: "UI/UX Design",
          description: "Create intuitive designs that provide excellent user experiences."
        },
        {
          title: "Development",
          description: "Build your application using modern frameworks and best practices."
        },
        {
          title: "Testing & Launch",
          description: "Comprehensive testing followed by deployment and ongoing support."
        }
      ],
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "MongoDB", "PostgreSQL", "AWS"],
      useCases: [
        "Corporate Websites",
        "E-commerce Platforms",
        "SaaS Applications",
        "Customer Portals",
        "Booking Systems",
        "Learning Management Systems"
      ]
    },
    "ai-chatbots-&-agents": {
      name: "AI Chatbots & Agents",
      description: "Intelligent conversational AI solutions that enhance customer service, automate support, and integrate seamlessly with your systems.",
      longDescription: "Revolutionize your customer support with AI-powered chatbots that understand context, provide accurate responses, and learn from every interaction. Our solutions integrate with your existing systems to provide 24/7 support while reducing costs and improving customer satisfaction.",
      icon: MessageSquare,
      color: "text-chart-3",
      heroImage: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
      features: [
        "Natural Language Processing",
        "Multi-platform Integration",
        "Sentiment Analysis",
        "Automated Ticket Routing",
        "24/7 Customer Support",
        "Analytics & Insights",
        "Multilingual Support",
        "Voice Integration"
      ],
      benefits: [
        { title: "Automation Rate", description: "80% of customer inquiries handled automatically", icon: Zap },
        { title: "Satisfaction", description: "60% increase in customer satisfaction scores", icon: Star },
        { title: "Availability", description: "24/7 support without additional staffing costs", icon: Shield },
        { title: "Response Time", description: "Instant responses reduce customer wait times", icon: TrendingUp }
      ],
      process: [
        {
          title: "Use Case Analysis",
          description: "Identify the best automation opportunities for your customer service."
        },
        {
          title: "AI Training",
          description: "Train the AI model with your specific business knowledge and FAQs."
        },
        {
          title: "Integration",
          description: "Seamlessly integrate with your existing customer service platforms."
        },
        {
          title: "Optimization",
          description: "Continuously improve performance based on customer interactions."
        }
      ],
      technologies: ["Python", "TensorFlow", "Dialogflow", "Rasa", "WebSocket", "Node.js", "React", "OpenAI"],
      useCases: [
        "Customer Support Automation",
        "Lead Qualification",
        "Appointment Scheduling",
        "Order Status Tracking",
        "Technical Support",
        "Sales Assistance"
      ]
    },
    "web-extraction": {
      name: "Data Extraction & Analysis",
      description: "Advanced web scraping and data extraction solutions to gather, process, and analyze valuable information from any online source.",
      longDescription: "Unlock the power of web data with our sophisticated extraction tools. We help you gather competitive intelligence, monitor market trends, and automate data collection from any online source while respecting website terms and implementing robust anti-detection systems.",
      icon: Search,
      color: "text-chart-4",
      heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
      features: [
        "Large-scale Data Scraping",
        "Real-time Monitoring",
        "Anti-detection Systems",
        "Data Cleaning & Processing",
        "Competitive Intelligence",
        "Market Research Automation",
        "API Endpoint Creation",
        "Data Visualization"
      ],
      benefits: [
        { title: "Data Volume", description: "Gather millions of data points efficiently", icon: Zap },
        { title: "Real-time Insights", description: "Monitor market changes as they happen", icon: TrendingUp },
        { title: "Competitive Edge", description: "Stay ahead with competitive intelligence", icon: Shield },
        { title: "Automation", description: "Automated research saves countless hours", icon: CheckCircle }
      ],
      process: [
        {
          title: "Target Analysis",
          description: "Identify the best data sources and extraction strategies."
        },
        {
          title: "Scraper Development",
          description: "Build robust scrapers that handle various website structures."
        },
        {
          title: "Data Processing",
          description: "Clean, validate, and structure the extracted data."
        },
        {
          title: "Delivery & Monitoring",
          description: "Provide data through APIs or dashboards with ongoing monitoring."
        }
      ],
      technologies: ["Python", "Scrapy", "Selenium", "BeautifulSoup", "Proxy Networks", "MongoDB", "Elasticsearch", "Docker"],
      useCases: [
        "Price Monitoring",
        "Product Catalog Extraction",
        "News & Social Media Monitoring",
        "Real Estate Data Collection",
        "Job Market Analysis",
        "Review & Rating Aggregation"
      ]
    },
    "graphic-design": {
      name: "Graphic Designing",
      description: "Creative visual solutions including branding, UI/UX design, marketing materials, and digital assets that captivate your audience.",
      longDescription: "Bring your brand to life with stunning visual designs that communicate your message effectively. From logos to complete brand identities, we create designs that resonate with your target audience and drive engagement across all touchpoints.",
      icon: Palette,
      color: "text-chart-5",
      heroImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
      features: [
        "Brand Identity Design",
        "UI/UX Design",
        "Marketing Materials",
        "Social Media Graphics",
        "Print Design",
        "Digital Assets",
        "Website Graphics",
        "Packaging Design"
      ],
      benefits: [
        { title: "Brand Recognition", description: "200% increase in brand recognition", icon: Star },
        { title: "Professional Identity", description: "Cohesive brand identity across all platforms", icon: CheckCircle },
        { title: "Visual Consistency", description: "Consistent visual language and messaging", icon: Shield },
        { title: "User Experience", description: "Enhanced user experience through great design", icon: Users }
      ],
      process: [
        {
          title: "Brand Discovery",
          description: "Understand your brand values, target audience, and goals."
        },
        {
          title: "Concept Development",
          description: "Create initial concepts and design directions."
        },
        {
          title: "Design Refinement",
          description: "Refine designs based on feedback and brand requirements."
        },
        {
          title: "Final Delivery",
          description: "Deliver final assets with brand guidelines and usage instructions."
        }
      ],
      technologies: ["Figma", "Adobe Creative Suite", "Sketch", "Principle", "InVision", "After Effects", "Blender", "Webflow"],
      useCases: [
        "Logo & Brand Identity",
        "Website & App Design",
        "Marketing Campaigns",
        "Social Media Content",
        "Business Cards & Stationery",
        "Packaging & Product Design"
      ]
    }
  };

  const service = serviceId ? services[serviceId] : null;

  if (!service) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">The service you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 bg-primary/10 border-primary/20 text-primary" data-testid="service-badge">
                <service.icon className="w-4 h-4 mr-2" />
                {service.name}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="service-title">
                {service.name.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{service.name.split(' ').slice(-1)}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8" data-testid="service-description">
                {service.longDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="glow-effect" asChild data-testid="service-cta-primary">
                  <Link href="/contact">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" asChild data-testid="service-cta-secondary">
                  <Link href="/portfolio">View Our Work</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={service.heroImage} 
                alt={service.name}
                className="rounded-xl shadow-2xl"
                data-testid="service-hero-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="benefits-title">
              Key <span className="gradient-text">Benefits</span>
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="benefits-description">
              Discover how our {service.name.toLowerCase()} solutions can transform your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.benefits.map((benefit: any, index: number) => (
              <Card key={index} className="text-center hover-lift" data-testid={`benefit-${index}`}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="features-title">
              Core <span className="gradient-text">Features</span>
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="features-description">
              Comprehensive features designed to meet all your {service.name.toLowerCase()} needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-center p-4 bg-card rounded-lg" data-testid={`feature-${index}`}>
                <CheckCircle className="w-5 h-5 text-chart-2 mr-3 flex-shrink-0" />
                <span className="text-card-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="process-title">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="process-description">
              We follow a proven methodology to ensure project success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step: any, index: number) => (
              <Card key={index} className="text-center" data-testid={`process-step-${index}`}>
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-4">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="technologies-title">
              Technologies <span className="gradient-text">We Use</span>
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="technologies-description">
              Cutting-edge tools and frameworks for optimal results
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {service.technologies.map((tech: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-lg px-4 py-2" data-testid={`technology-${index}`}>
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="use-cases-title">
              Use <span className="gradient-text">Cases</span>
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="use-cases-description">
              Real-world applications of our {service.name.toLowerCase()} solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.useCases.map((useCase: string, index: number) => (
              <Card key={index} className="hover-lift" data-testid={`use-case-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="text-card-foreground font-medium">{useCase}</span>
                  </div>
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
              Ready to Get Started with <span className="gradient-text">{service.name}</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8" data-testid="cta-description">
              Let's discuss how our {service.name.toLowerCase()} solutions can transform your business operations and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="glow-effect" asChild data-testid="cta-contact">
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button variant="outline" size="lg" asChild data-testid="cta-portfolio">
                <Link href="/portfolio">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
