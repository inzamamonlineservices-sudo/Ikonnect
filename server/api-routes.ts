import type { Express } from "express";
import { generateChatResponse } from "./gemini";
import { getSession, requireAdminAuth } from "./auth";
import { insertAnalyticsEventSchema, type AnalyticsEvent, type ChatConversation } from "@shared/schema";
import { z } from "zod";
import { nanoid } from "nanoid";

export function registerApiRoutes(app: Express) {
  // Setup session middleware
  app.use(getSession());

  // In-memory stores to eliminate database usage
  const chatConversations: ChatConversation[] = [];
  const analyticsEvents: AnalyticsEvent[] = [];

  // AI Chatbot routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId, context } = req.body;
      
      if (!message || !sessionId) {
        return res.status(400).json({ message: "Message and session ID are required" });
      }

      // Build conversation context from in-memory history
      const conversationHistory = chatConversations.filter(c => c.sessionId === sessionId);
      const messages = conversationHistory.map(c => ([
        { role: 'user' as const, content: c.userQuery },
        { role: 'assistant' as const, content: c.botResponse }
      ])).flat();
      
      // Add current message
      messages.push({ role: 'user', content: message });
      
      // Generate AI response
      const aiResponse = await generateChatResponse(messages, context);
      
      const conversationId = nanoid();
      chatConversations.push({
        id: conversationId,
        sessionId,
        userQuery: message,
        botResponse: aiResponse,
        context: context || {},
        satisfaction: null,
        resolved: false,
        createdAt: new Date()
      } as ChatConversation);

      res.json({ response: aiResponse, conversationId });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  app.post("/api/chat/feedback", async (req, res) => {
    try {
      const { conversationId, satisfaction } = req.body;
      
      if (!conversationId || !satisfaction) {
        return res.status(400).json({ message: "Conversation ID and satisfaction rating are required" });
      }
      
      const convo = chatConversations.find(c => c.id === conversationId);
      if (!convo) return res.status(404).json({ message: "Conversation not found" });
      (convo as any).satisfaction = satisfaction;
      res.json({ success: true, conversation: convo });
    } catch (error) {
      console.error("Feedback error:", error);
      res.status(500).json({ message: "Failed to record feedback" });
    }
  });

  // Analytics routes (in-memory)
  app.post("/api/analytics/event", async (req, res) => {
    try {
      const { eventType, page, data, sessionId } = req.body;
      const parsed = insertAnalyticsEventSchema.parse({
        eventType,
        page,
        data: data || {},
        sessionId,
        userAgent: req.headers['user-agent'] || '',
        ipAddress: req.ip || '',
        referrer: req.headers.referer || ''
      });
      const event: AnalyticsEvent = { ...parsed, id: nanoid(), createdAt: new Date() } as AnalyticsEvent;
      analyticsEvents.push(event);
      res.json(event);
    } catch (error) {
      console.error("Analytics error:", error);
      res.status(500).json({ message: "Failed to record analytics event" });
    }
  });

  app.get("/api/analytics/summary", requireAdminAuth, async (_req, res) => {
    try {
      const pageViews = analyticsEvents.filter(e => e.eventType === 'page_view');
      const uniqueVisitors = new Set(analyticsEvents.map(e => e.sessionId).filter(Boolean)).size;
      const counts = new Map<string, number>();
      for (const e of pageViews) {
        const p = e.page || '';
        counts.set(p, (counts.get(p) || 0) + 1);
      }
      const topPages = Array.from(counts.entries())
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      const sessionViewCounts = new Map<string, number>();
      for (const e of pageViews) {
        const sid = e.sessionId || nanoid();
        sessionViewCounts.set(sid, (sessionViewCounts.get(sid) || 0) + 1);
      }
      const singleViewSessions = Array.from(sessionViewCounts.values()).filter(v => v === 1).length;
      const totalSessions = sessionViewCounts.size || 1;
      const bounceRate = Math.round((singleViewSessions / totalSessions) * 100);

      res.json({ totalPageViews: pageViews.length, uniqueVisitors, topPages, bounceRate });
    } catch (error) {
      console.error("Analytics summary error:", error);
      res.status(500).json({ message: "Failed to get analytics summary" });
    }
  });

  // CMS routes removed to eliminate database usage

  // Client portal routes removed (no database)

  // Admin client management routes removed (no database)

  // Admin project routes removed (no database)
}