import next from 'next';
import { createServer } from 'http';

const dev = process.env.NODE_ENV !== 'production';
const PORT = parseInt(process.env.PORT || '3000', 10);
const nextApp = next({ dev, hostname: '0.0.0.0', port: PORT });
const handle = nextApp.getRequestHandler();

async function startServer() {
  try {
    await nextApp.prepare();
    
    const server = createServer((req, res) => {
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
