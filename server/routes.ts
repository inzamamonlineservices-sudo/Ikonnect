import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";

import { registerApiRoutes } from "./api-routes";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register new API routes
  await registerApiRoutes(app);
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.subscribeNewsletter(newsletterData);
      res.json({ success: true, subscription });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid email format", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to subscribe to newsletter" 
        });
      }
    }
  });

  // Get portfolio items
  app.get("/api/portfolio", async (req, res) => {
    try {
      const { featured } = req.query;
      const items = featured === 'true' 
        ? await storage.getFeaturedPortfolioItems()
        : await storage.getPortfolioItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch portfolio items" 
      });
    }
  });

  // Get portfolio item by ID
  app.get("/api/portfolio/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const item = await storage.getPortfolioItem(id);
      if (!item) {
        res.status(404).json({ 
          success: false, 
          message: "Portfolio item not found" 
        });
        return;
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch portfolio item" 
      });
    }
  });

  // Get blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const { category } = req.query;
      const posts = category 
        ? await storage.getBlogPostsByCategory(category as string)
        : await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch blog posts" 
      });
    }
  });

  // Get blog post by slug
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPost(slug);
      if (!post) {
        res.status(404).json({ 
          success: false, 
          message: "Blog post not found" 
        });
        return;
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch blog post" 
      });
    }
  });

  // Get testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const { featured } = req.query;
      const testimonials = featured === 'true'
        ? await storage.getFeaturedTestimonials()
        : await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testimonials" 
      });
    }
  });

  const httpServer = createServer(app);
  
  // WebSocket server for real-time features
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws: WebSocket) => {
    console.log('New WebSocket connection established');
    
    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        
        // Handle different message types
        switch (data.type) {
          case 'subscribe':
            // Subscribe to specific channels (e.g., project updates, chat)
            (ws as any).channels = data.channels || [];
            ws.send(JSON.stringify({ type: 'subscribed', channels: data.channels }));
            break;
            
          case 'ping':
            ws.send(JSON.stringify({ type: 'pong' }));
            break;
            
          default:
            console.log('Unknown WebSocket message type:', data.type);
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
    
    // Send welcome message
    ws.send(JSON.stringify({ 
      type: 'welcome', 
      message: 'Connected to Ikonnect Service real-time updates' 
    }));
  });
  
  // Broadcast function for real-time updates
  (httpServer as any).broadcast = (channel: string, data: any) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        const clientChannels = (client as any).channels || [];
        if (clientChannels.includes(channel)) {
          client.send(JSON.stringify({ type: 'broadcast', channel, data }));
        }
      }
    });
  };
  
  return httpServer;
}
