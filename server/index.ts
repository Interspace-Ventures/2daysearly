import next from 'next';
import { createServer } from 'http';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, port: 5000 });
const handle = nextApp.getRequestHandler();

const PORT = parseInt(process.env.PORT || '5000');

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
