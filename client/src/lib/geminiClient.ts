import { GoogleGenAI } from "@google/genai";

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function generateChatResponseClient(
  messages: ChatMessage[],
  context?: Record<string, any>
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  if (!apiKey) {
    return "The AI service is not configured. Please add VITE_GEMINI_API_KEY to your environment.";
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemPrompt = `You are an AI assistant for Ikonnect Service, a leading digital innovation company.
Recent conversation context: ${context ? JSON.stringify(context) : 'None'}`;

  const conversationText = messages
    .filter(msg => msg.role !== 'system')
    .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
    .join('\n');

  const fullPrompt = `${systemPrompt}\n\nConversation:\n${conversationText}\n\nAssistant:`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: fullPrompt,
  });

  return response.text || "I’m unable to generate a response right now. Please try again.";
}