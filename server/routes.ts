import { Router } from 'express';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Add more API routes here as needed

export { router as routes };
