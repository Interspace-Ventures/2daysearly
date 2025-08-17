import type { Express } from "express";
import { createServer, type Server } from "http";

export function registerRoutes(app: Express): Server {
  // API routes go here
  // prefix all routes with /api

  // Note: Catch-all route for client-side routing is handled by Vite middleware in development
  // and by serveStatic in production

  const httpServer = createServer(app);
  return httpServer;
}
