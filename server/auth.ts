import session from "express-session";
import createMemoryStore from "memorystore";
import type { Express, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";
const SESSION_SECRET = process.env.SESSION_SECRET || "your-super-secret-session-key-change-in-production";

// Session configuration
export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const MemoryStore = createMemoryStore(session);
  const sessionStore = new MemoryStore({
    checkPeriod: sessionTtl, // prune expired entries every week
  });

  return session({
    secret: SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: sessionTtl,
    },
  });
}

// JWT token generation
export function generateToken(clientId: string): string {
  return jwt.sign({ clientId, type: 'client' }, JWT_SECRET, { expiresIn: '7d' });
}

export function generateAdminToken(userId: string): string {
  return jwt.sign({ userId, type: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
}

// JWT verification
export function verifyToken(token: string): { clientId?: string; userId?: string; type: 'client' | 'admin' } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Middleware for client authentication
export function requireClientAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '') || req.session?.clientToken;
  
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const decoded = verifyToken(token);
  if (!decoded || decoded.type !== 'client') {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  (req as any).clientId = decoded.clientId;
  next();
}

// Middleware for admin authentication
export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '') || req.session?.adminToken;
  
  if (!token) {
    return res.status(401).json({ message: "Admin authentication required" });
  }

  const decoded = verifyToken(token);
  if (!decoded || decoded.type !== 'admin') {
    return res.status(401).json({ message: "Admin access required" });
  }

  (req as any).userId = decoded.userId;
  next();
}