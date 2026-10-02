import type { Request, Response } from 'express';

/**
 * Health check serverless handler
 * Endpoint: /api/health (or /api/heath)
 */
export default async function handler(req: Request, res: Response) {
  const accountKey = process.env.LTA_ACCOUNT_KEY || process.env.ACCOUNT_KEY;
  const isKeyConfigured = Boolean(accountKey && accountKey.trim().length > 0);

  return res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime_seconds: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    serverless_pipeline: {
      provider: 'Singapore GovTech LTA DataMall Relay',
      datamall_endpoint: 'https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2',
      account_key_configured: isKeyConfigured,
      required_header: 'AccountKey'
    }
  });
}
