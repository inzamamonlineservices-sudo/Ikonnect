import { Link } from "wouter";
import LogoSrc from "@assets/company-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Twitter, Linkedin, Github, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const footerLogoClass = import.meta.env.VITE_FOOTER_LOGO_CLASS ?? "h-21";

  const subscribeNewsletter = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You've been successfully subscribed to our newsletter.",
      });
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter"] });
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      subscribeNewsletter.mutate(email.trim());
    }
  };

  const services = [
    { name: "AI & Data Automation", href: "/services/ai-&-data-automation" },
    { name: "Web Development", href: "/services/web-development" },
    { name: "AI Chatbots & Agents", href: "/services/ai-chatbots-&-agents" },
    { name: "Data Analysis & Extraction", href: "/services/web-extraction" },
    { name: "Graphic Design", href: "/services/graphic-design" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
  
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61582931973311",
      icon: Facebook,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/ikonnect-service/?viewAsMember=true",
      icon: Linkedin,
    },
  
    {
      name: "Instagram",
      href: "https://www.instagram.com/ikonnect.service/",
      icon: Instagram,
    },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6" data-testid="footer-logo">
              <img
                src={LogoSrc}
                alt="Ikonnect Services Logo"
                className={`w-auto object-contain [mix-blend-mode:multiply] select-none ${footerLogoClass}`}
              />
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Transforming businesses through innovative digital solutions, AI-powered automation, and cutting-edge web technologies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    data-testid={`social-${social.name.toLowerCase()}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-6">Services</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`footer-service-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-6">Company</h3>
            <ul className="space-y-4">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`footer-company-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-6">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest insights on digital innovation and AI.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4" data-testid="newsletter-form">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="newsletter-email-input"
              />
              <Button 
                type="submit" 
                className="w-full" 
                disabled={subscribeNewsletter.isPending}
                data-testid="newsletter-submit-button"
              >
                {subscribeNewsletter.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-muted-foreground text-sm">
              © 2025 Ikonnect Service. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-privacy">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-terms">
                Terms of Service
              </Link>
            </div>
         </div>
       </div>
     </div>
   </footer>
  );
}
