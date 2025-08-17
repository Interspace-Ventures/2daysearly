import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import type { Server } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Skip static file serving in development - Vite will handle this

interface ExtendedResponse extends Response {
  json: (body: any) => this;
}

// Middleware to log API requests
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  (res as ExtendedResponse).json = function (bodyJson: any) {
    capturedJsonResponse = bodyJson;
    return originalResJson.call(res, bodyJson);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

class ServerError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'ServerError';
  }
}

// Error handling middleware
const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ServerError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    const status = 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  }
  console.error(err);
};

const startServer = async () => {
  try {
    // Always use Vite in development
    const isProduction = process.env.NODE_ENV === "production";
    log(`Running in ${isProduction ? "production" : "development"} mode`);
    
    const server = registerRoutes(app);
    
    if (!isProduction) {
      log("Setting up Vite development server...");
      await setupVite(app, server);
    } else {
      log("Setting up static file serving...");
      serveStatic(app);
    }

    app.use(errorHandler);

    const tryPort = (port: number): Promise<void> => {
      return new Promise((resolve, reject) => {
        server.listen(port, "0.0.0.0")
          .once('listening', () => {
            log(`Server running at http://0.0.0.0:${port}`);
            log('Server is ready to handle requests');
            resolve();
          })
          .once('error', (error: NodeJS.ErrnoException) => {
            if (error.code === 'EADDRINUSE') {
              server.close();
              resolve(tryPort(port + 1));
            } else {
              reject(error);
            }
          });
      });
    };

    // Changed default port to 5000
    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
    await tryPort(PORT);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

const setupServerErrorHandling = (server: Server) => {
  server.on('error', (error: NodeJS.ErrnoException) => {
    log(`Server error: ${error.message}`);
    if (error.code === 'EADDRINUSE') {
      log('Address already in use, retrying...');
      setTimeout(() => {
        server.close();
        const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
        server.listen(PORT, "0.0.0.0");
      }, 1000);
    }
  });
};

startServer();

export { app };