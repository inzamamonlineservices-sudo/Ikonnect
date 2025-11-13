import { useEffect, useState } from "react";
import LogoSrc from "@assets/company-logo.png";
import { removeWhiteBackground } from "@/lib/imageUtils";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [processedLogo, setProcessedLogo] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Process the JPG to remove its white background in-browser
  useEffect(() => {
    let mounted = true;
    removeWhiteBackground(LogoSrc, { threshold: 245, crop: true, scale: 1.1 })
      .then((url) => {
        if (mounted) setProcessedLogo(url);
      })
      .catch(() => {
        // Fallback: keep original
        if (mounted) setProcessedLogo(null);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const services = [
    { name: "AI & Data Automation", href: "/services/ai-&-data-automation" },
    { name: "Web Development", href: "/services/web-development" },
    { name: "AI Chatbots & Agents", href: "/services/ai-chatbots-&-agents" },
    { name: "Data Extraction & Analysis", href: "/services/web-extraction" },
    { name: "Graphic Design", href: "/services/graphic-design" },
  ];

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border transition-colors duration-200 ${
        scrolled ? "bg-white shadow-sm" : "bg-background/80 backdrop-blur-md"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-testid="logo-link">
            {processedLogo ? (
              <img
                src={processedLogo}
                alt="Ikonnect Services Logo"
                className="h-16 md:h-20 w-auto object-contain select-none"
              />
            ) : (
              // Fallback to blend mode if processing fails
              <img
                src={LogoSrc}
                alt="Ikonnect Services Logo"
                className="h-16 md:h-20 w-auto object-contain [mix-blend-mode:multiply] select-none"
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className={`flex items-center transition-colors ${scrolled ? "text-black" : "text-foreground"} hover:text-primary`} data-testid="nav-services">
                      {item.name}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {services.map((service) => (
                        <DropdownMenuItem key={service.name} asChild>
                          <Link href={service.href} className="w-full" data-testid={`nav-service-${service.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            {service.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.href}
                    className={`${scrolled ? "text-black" : "text-foreground"} hover:text-primary transition-colors ${
                      location === item.href ? "text-primary" : ""
                    }`}
                    data-testid={`nav-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button asChild className="hidden md:flex" data-testid="header-cta-button">
            <Link href="/contact">Get Started</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" data-testid="mobile-menu-trigger">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div>
                        <Link
                          href={item.href}
                          className="block text-foreground hover:text-primary transition-colors text-lg font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                          data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                        >
                          {item.name}
                        </Link>
                        <div className="ml-4 mt-2 space-y-2">
                          {services.map((service) => (
                            <Link
                              key={service.name}
                              href={service.href}
                              className="block text-muted-foreground hover:text-primary transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                              data-testid={`mobile-nav-service-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-foreground hover:text-primary transition-colors text-lg font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <Button asChild className="mt-6" data-testid="mobile-cta-button">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
