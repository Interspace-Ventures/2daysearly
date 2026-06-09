import next from 'next';
import { createServer } from 'http';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, port: 5000 });
const handle = nextApp.getRequestHandler();

const PORT = parseInt(process.env.PORT || '5000');

async function startServer() {
  try {
    await nextApp.prepare();
    
    const CANONICAL_HOST = '2daysearly.com';

    const server = createServer((req, res) => {
      // In production, forward the default *.replit.app domain to the
      // canonical custom domain. Gated to production so the dev preview
      // (served on *.replit.dev inside an iframe) is never redirected.
      if (!dev) {
        const host = (req.headers.host || '').split(':')[0];
        if (host.endsWith('.replit.app')) {
          res.statusCode = 308;
          res.setHeader('Location', `https://${CANONICAL_HOST}${req.url || '/'}`);
          res.end();
          return;
        }
      }

      handle(req, res);
    });

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Next.js app running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
