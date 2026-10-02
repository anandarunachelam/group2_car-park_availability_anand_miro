import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import healthHandler from './api/health.ts';
import carparkAvailabilityHandler from './api/carpark-availability.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Health checks
  app.all(['/api/health', '/api/heath'], (req, res) => {
    return healthHandler(req, res);
  });

  // Carpark availability serverless endpoints
  app.all([
    '/api/carpark-availability',
    '/api/carpark_availability',
    '/api/carpark%20availability',
    '/api/carpark availability'
  ], (req, res) => {
    return carparkAvailabilityHandler(req, res);
  });

  // Development: Mount Vite middlewares
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve dist output
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ParkSpot SG] Server listening on port ${PORT}`);
  });
}

startServer();
