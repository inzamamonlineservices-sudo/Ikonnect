import type {
  PortfolioItem,
  Testimonial,
  BlogPost,
  AnalyticsEvent,
  ChatConversation,
  InsertAnalyticsEvent,
} from "@shared/schema";

// In-memory static data for a serverless site
const portfolioItems: PortfolioItem[] = [
  {
    id: "p-1",
    title: "E-commerce Platform",
    description:
      "Modern multi-vendor marketplace with AI-powered recommendations and automated inventory management.",
    category: "web-dev",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&h=600",
    tags: ["React", "Node.js", "AI", "E-commerce"],
    client: "TechFlow Inc",
    year: "2024",
    results: "150% increase in revenue within 6 months",
    process: "Discovery, Design, Development, Testing, Launch",
    technologies: ["React", "Node.js", "MongoDB", "AI/ML"],
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "p-2",
    title: "Analytics Dashboard",
    description:
      "Real-time business intelligence platform with automated reporting and predictive analytics.",
    category: "automation",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=600",
    tags: ["Data Analytics", "Automation", "Dashboard"],
    client: "DataCorp",
    year: "2024",
    results: "40+ hours saved weekly, 99% accuracy in reporting",
    process: "Requirements Analysis, Data Architecture, Development, Integration",
    technologies: ["Python", "React", "PostgreSQL", "D3.js"],
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "p-3",
    title: "Customer Support AI",
    description:
      "Intelligent customer service chatbot with natural language processing and sentiment analysis.",
    category: "ai",
    imageUrl:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&h=600",
    tags: ["AI", "Chatbot", "NLP"],
    client: "RetailMax",
    year: "2023",
    results: "60% increase in customer satisfaction, 80% automation rate",
    process: "AI Training, Integration, Testing, Optimization",
    technologies: ["Python", "TensorFlow", "React", "WebSocket"],
    featured: true,
    createdAt: new Date(),
  },
];

const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Michael Chen",
    position: "CTO",
    company: "TechFlow Inc.",
    content:
      "Ikonnect Service transformed our entire data workflow. Their automation solution saved us 40+ hours per week and eliminated manual errors completely.",
    rating: "5",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100",
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "t-2",
    name: "Sarah Williams",
    position: "Director of Operations",
    company: "RetailMax",
    content:
      "The AI chatbot they developed increased our customer satisfaction by 60% and handles 80% of inquiries automatically. Outstanding work!",
    rating: "5",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&h=100",
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "t-3",
    name: "David Rodriguez",
    position: "Founder",
    company: "GrowthCorp",
    content:
      "Their web development team delivered a beautiful, fast, and scalable platform. Revenue increased by 150% in just 6 months. Highly recommended!",
    rating: "5",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100",
    featured: true,
    createdAt: new Date(),
  },
];

const blogPosts: BlogPost[] = [
  {
    id: "b-1",
    title: "The Future of AI in Business Automation",
    slug: "future-ai-business-automation",
    excerpt:
      "Explore how artificial intelligence is revolutionizing business processes and what it means for the future of work.",
    content: "Artificial intelligence is no longer a futuristic concept...",
    category: "AI",
    author: "Ikonnect Team",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&h=600",
    tags: ["AI", "Automation", "Business"],
    published: true,
    readTime: "5 min read",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "b-2",
    title: "Modern Web Development Trends in 2024",
    slug: "web-development-trends-2024",
    excerpt:
      "Discover the latest trends and technologies shaping web development in 2024.",
    content: "The web development landscape continues to evolve rapidly...",
    category: "Web Dev",
    author: "Ikonnect Team",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&h=600",
    tags: ["Web Development", "React", "Trends"],
    published: true,
    readTime: "7 min read",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const chatConversations: ChatConversation[] = [];
const analyticsEvents: AnalyticsEvent[] = [];

function createSummary() {
  const pageViews = analyticsEvents.filter((e) => e.eventType === "page_view");
  const uniqueVisitors = new Set(
    analyticsEvents.map((e) => e.sessionId).filter(Boolean),
  ).size;
  const counts = new Map<string, number>();
  for (const e of pageViews) {
    const p = e.page || "";
    counts.set(p, (counts.get(p) || 0) + 1);
  }
  const topPages = Array.from(counts.entries())
    .map(([page, views]) => ({ page, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const sessionViewCounts = new Map<string, number>();
  for (const e of pageViews) {
    const sid = e.sessionId || `s-${Math.random().toString(36).slice(2)}`;
    sessionViewCounts.set(sid, (sessionViewCounts.get(sid) || 0) + 1);
  }
  const singleViewSessions = Array.from(sessionViewCounts.values()).filter(
    (v) => v === 1,
  ).length;
  const totalSessions = sessionViewCounts.size || 1;
  const bounceRate = Math.round((singleViewSessions / totalSessions) * 100);

  return {
    totalPageViews: pageViews.length,
    uniqueVisitors,
    topPages,
    bounceRate,
  };
}

export async function getJson(url: string) {
  const u = new URL(url, window.location.origin);
  const path = u.pathname;

  if (path.startsWith("/api/portfolio")) {
    const idMatch = path.match(/^\/api\/portfolio\/(.+)$/);
    if (idMatch) {
      return portfolioItems.find((p) => p.id === idMatch[1]) || null;
    }
    const featured = u.searchParams.get("featured") === "true";
    return featured ? portfolioItems.filter((p) => p.featured) : portfolioItems;
  }

  if (path.startsWith("/api/testimonials")) {
    const featured = u.searchParams.get("featured") === "true";
    return featured ? testimonials.filter((t) => t.featured) : testimonials;
  }

  if (path.startsWith("/api/blog")) {
    const slugMatch = path.match(/^\/api\/blog\/(.+)$/);
    if (slugMatch) {
      return blogPosts.find((b) => b.slug === slugMatch[1]) || null;
    }
    const category = u.searchParams.get("category");
    return category
      ? blogPosts.filter((b) => b.published && b.category === category)
      : blogPosts.filter((b) => b.published);
  }

  if (path === "/api/analytics/summary") {
    return createSummary();
  }

  // Admin/client endpoints return empty arrays for static site
  if (
    path.startsWith("/api/admin/") ||
    path.startsWith("/api/cms/") ||
    path.startsWith("/api/client/")
  ) {
    return [];
  }

  throw new Error(`Static API: GET ${path} not implemented`);
}

export async function postJson(url: string, body: any) {
  const u = new URL(url, window.location.origin);
  const path = u.pathname;

  if (path === "/api/contact") {
    const contact = { ...body, id: `c-${Date.now()}`, createdAt: new Date() };
    return { success: true, contact };
  }

  if (path === "/api/newsletter") {
    const subscription = {
      id: `n-${Date.now()}`,
      email: body?.email,
      subscribedAt: new Date(),
      active: true,
    };
    return { success: true, subscription };
  }

  if (path === "/api/chat") {
    const conversationId = `conv-${Date.now()}`;
    const response =
      "Thanks for reaching out! Our team offers data automation, web development, AI chatbots, and more. Would you like to schedule a consultation or learn about pricing?";
    chatConversations.push({
      id: conversationId,
      sessionId: body?.sessionId || "",
      userQuery: body?.message || "",
      botResponse: response,
      context: body?.context || {},
      satisfaction: null,
      resolved: false,
      createdAt: new Date(),
    } as ChatConversation);
    return { response, conversationId };
  }

  if (path === "/api/chat/feedback") {
    return { success: true };
  }

  if (path === "/api/analytics/event") {
    const parsed: InsertAnalyticsEvent = {
      eventType: body?.eventType,
      page: body?.page,
      data: body?.data || {},
      sessionId: body?.sessionId,
      userAgent: navigator.userAgent,
      ipAddress: "",
      referrer: document.referrer || "",
    } as InsertAnalyticsEvent;
    const event: AnalyticsEvent = {
      ...(parsed as any),
      id: `a-${Date.now()}`,
      createdAt: new Date(),
    } as AnalyticsEvent;
    analyticsEvents.push(event);
    return event;
  }

  // Admin/client routes: acknowledge
  if (
    path.startsWith("/api/admin/") ||
    path.startsWith("/api/cms/") ||
    path.startsWith("/api/client/")
  ) {
    return { success: true };
  }

  throw new Error(`Static API: POST ${path} not implemented`);
}

// Helper to create a fetch-like Response for code expecting response.json()
export function createMockResponse(json: any, status = 200): Response {
  const body = JSON.stringify(json);
  const blob = new Blob([body], { type: "application/json" });
  const init: ResponseInit = { status, headers: { "Content-Type": "application/json" } };
  return new Response(blob, init);
}