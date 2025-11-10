import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.1.0',
  });
});

// API routes
app.get('/api/v1', (req: Request, res: Response) => {
  res.json({
    message: 'Quantified Me API v1',
    endpoints: {
      health: '/health',
      auth: '/api/v1/auth',
      metrics: '/api/v1/metrics',
      insights: '/api/v1/insights',
    },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
  });
});

// Start server
app.listen(port, () => {
  console.log(`⚡️ Quantified Me API listening on port ${port}`);
  console.log(`🏥 Health check: http://localhost:${port}/health`);
});

export default app;
