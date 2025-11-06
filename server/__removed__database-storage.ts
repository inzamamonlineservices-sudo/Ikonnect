import { 
  type User, 
  type InsertUser, 
  type Contact, 
  type InsertContact,
  type Newsletter,
  type InsertNewsletter,
  type PortfolioItem,
  type InsertPortfolioItem,
  type BlogPost,
  type InsertBlogPost,
  type Testimonial,
  type InsertTestimonial,
  type CmsContent,
  type InsertCmsContent,
  type ClientProject,
  type InsertClientProject,
  type Client,
  type InsertClient,
  type AnalyticsEvent,
  type InsertAnalyticsEvent,
  type ChatConversation,
  type InsertChatConversation,
  users,
  contacts,
  newsletters,
  portfolioItems,
  blogPosts,
  testimonials,
  cmsContent,
  clientProjects,
  clients,
  analyticsEvents,
  chatConversations
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte, sql } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Newsletter
  subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscribers(): Promise<Newsletter[]>;
  
  // Portfolio
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItem(id: string): Promise<PortfolioItem | undefined>;
  getFeaturedPortfolioItems(): Promise<PortfolioItem[]>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  
  // Blog
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // CMS Content
  getCmsContent(): Promise<CmsContent[]>;
  getCmsContentByKey(key: string): Promise<CmsContent | undefined>;
  createCmsContent(content: InsertCmsContent): Promise<CmsContent>;
  updateCmsContent(key: string, content: Partial<InsertCmsContent>): Promise<CmsContent>;

  // Client Projects
  getClientProjects(clientId?: string): Promise<ClientProject[]>;
  getClientProject(id: string): Promise<ClientProject | undefined>;
  createClientProject(project: InsertClientProject): Promise<ClientProject>;
  updateClientProject(id: string, project: Partial<InsertClientProject>): Promise<ClientProject>;

  // Clients
  getClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client | undefined>;
  getClientByEmail(email: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, client: Partial<InsertClient>): Promise<Client>;

  // Analytics
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsEvents(startDate?: Date, endDate?: Date): Promise<AnalyticsEvent[]>;
  getAnalyticsSummary(): Promise<{
    totalPageViews: number;
    uniqueVisitors: number;
    topPages: { page: string; views: number; }[];
    bounceRate: number;
  }>;

  // Chat
  createChatConversation(conversation: InsertChatConversation): Promise<ChatConversation>;
  getChatConversations(sessionId?: string): Promise<ChatConversation[]>;
  updateChatSatisfaction(id: string, satisfaction: number): Promise<ChatConversation>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Contacts
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  // Newsletter
  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const [existing] = await db.select().from(newsletters).where(eq(newsletters.email, insertNewsletter.email));
    
    if (existing) {
      if (!existing.active) {
        // Reactivate subscription
        const [updated] = await db
          .update(newsletters)
          .set({ active: true })
          .where(eq(newsletters.email, insertNewsletter.email))
          .returning();
        return updated;
      }
      return existing;
    }

    const [newsletter] = await db.insert(newsletters).values(insertNewsletter).returning();
    return newsletter;
  }

  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return await db.select().from(newsletters).where(eq(newsletters.active, true));
  }

  // Portfolio
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
  }

  async getPortfolioItem(id: string): Promise<PortfolioItem | undefined> {
    const [item] = await db.select().from(portfolioItems).where(eq(portfolioItems.id, id));
    return item;
  }

  async getFeaturedPortfolioItems(): Promise<PortfolioItem[]> {
    return await db.select().from(portfolioItems)
      .where(eq(portfolioItems.featured, true))
      .orderBy(desc(portfolioItems.createdAt));
  }

  async createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const [item] = await db.insert(portfolioItems).values(insertItem).returning();
    return item;
  }

  // Blog
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(and(eq(blogPosts.published, true), eq(blogPosts.category, category)))
      .orderBy(desc(blogPosts.createdAt));
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertPost).returning();
    return post;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials)
      .where(eq(testimonials.featured, true))
      .orderBy(desc(testimonials.createdAt));
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }

  // CMS Content
  async getCmsContent(): Promise<CmsContent[]> {
    return await db.select().from(cmsContent).orderBy(desc(cmsContent.updatedAt));
  }

  async getCmsContentByKey(key: string): Promise<CmsContent | undefined> {
    const [content] = await db.select().from(cmsContent).where(eq(cmsContent.key, key));
    return content;
  }

  async createCmsContent(insertContent: InsertCmsContent): Promise<CmsContent> {
    const [content] = await db.insert(cmsContent).values(insertContent).returning();
    return content;
  }

  async updateCmsContent(key: string, updateContent: Partial<InsertCmsContent>): Promise<CmsContent> {
    const [content] = await db
      .update(cmsContent)
      .set({ ...updateContent, updatedAt: new Date() })
      .where(eq(cmsContent.key, key))
      .returning();
    return content;
  }

  // Client Projects
  async getClientProjects(clientId?: string): Promise<ClientProject[]> {
    if (clientId) {
      return await db.select().from(clientProjects)
        .where(eq(clientProjects.clientId, clientId))
        .orderBy(desc(clientProjects.updatedAt));
    }
    return await db.select().from(clientProjects).orderBy(desc(clientProjects.updatedAt));
  }

  async getClientProject(id: string): Promise<ClientProject | undefined> {
    const [project] = await db.select().from(clientProjects).where(eq(clientProjects.id, id));
    return project;
  }

  async createClientProject(insertProject: InsertClientProject): Promise<ClientProject> {
    const [project] = await db.insert(clientProjects).values(insertProject).returning();
    return project;
  }

  async updateClientProject(id: string, updateProject: Partial<InsertClientProject>): Promise<ClientProject> {
    const [project] = await db
      .update(clientProjects)
      .set({ ...updateProject, updatedAt: new Date() })
      .where(eq(clientProjects.id, id))
      .returning();
    return project;
  }

  // Clients
  async getClients(): Promise<Client[]> {
    return await db.select().from(clients).orderBy(desc(clients.createdAt));
  }

  async getClient(id: string): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client;
  }

  async getClientByEmail(email: string): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.email, email));
    return client;
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const [client] = await db.insert(clients).values(insertClient).returning();
    return client;
  }

  async updateClient(id: string, updateClient: Partial<InsertClient>): Promise<Client> {
    const [client] = await db
      .update(clients)
      .set({ ...updateClient, updatedAt: new Date() })
      .where(eq(clients.id, id))
      .returning();
    return client;
  }

  // Analytics
  async createAnalyticsEvent(insertEvent: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [event] = await db.insert(analyticsEvents).values(insertEvent).returning();
    return event;
  }

  async getAnalyticsEvents(startDate?: Date, endDate?: Date): Promise<AnalyticsEvent[]> {
    if (startDate && endDate) {
      return await db.select().from(analyticsEvents)
        .where(and(
          gte(analyticsEvents.createdAt, startDate),
          lte(analyticsEvents.createdAt, endDate)
        ))
        .orderBy(desc(analyticsEvents.createdAt));
    }
    return await db.select().from(analyticsEvents).orderBy(desc(analyticsEvents.createdAt));
  }

  async getAnalyticsSummary(): Promise<{
    totalPageViews: number;
    uniqueVisitors: number;
    topPages: { page: string; views: number; }[];
    bounceRate: number;
  }> {
    // This is a simplified implementation - in production you'd want more sophisticated analytics
    const events = await db.select().from(analyticsEvents);
    const pageViews = events.filter(e => e.eventType === 'page_view');
    
    const uniqueVisitors = new Set(pageViews.map(e => e.sessionId)).size;
    const pageViewCounts = pageViews.reduce((acc, view) => {
      acc[view.page] = (acc[view.page] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topPages = Object.entries(pageViewCounts)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    return {
      totalPageViews: pageViews.length,
      uniqueVisitors,
      topPages,
      bounceRate: 0.35 // Placeholder - would need more complex calculation
    };
  }

  // Chat
  async createChatConversation(insertConversation: InsertChatConversation): Promise<ChatConversation> {
    const [conversation] = await db.insert(chatConversations).values(insertConversation).returning();
    return conversation;
  }

  async getChatConversations(sessionId?: string): Promise<ChatConversation[]> {
    if (sessionId) {
      return await db.select().from(chatConversations)
        .where(eq(chatConversations.sessionId, sessionId))
        .orderBy(chatConversations.createdAt);
    }
    return await db.select().from(chatConversations).orderBy(desc(chatConversations.createdAt));
  }

  async updateChatSatisfaction(id: string, satisfaction: number): Promise<ChatConversation> {
    const [conversation] = await db
      .update(chatConversations)
      .set({ satisfaction, resolved: true })
      .where(eq(chatConversations.id, id))
      .returning();
    return conversation;
  }
}