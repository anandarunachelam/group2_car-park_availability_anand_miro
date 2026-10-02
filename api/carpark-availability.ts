import type { Request, Response } from 'express';

const LTA_DATAMALL_URL = 'https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2';

export interface LtaCarparkRecord {
  CarParkID: string;
  Area: string;
  Development: string;
  Location: string; // e.g. "1.2985 103.8522"
  AvailableLots: number;
  LotType: string; // C: Car, H: Heavy, Y: Motorcycle
  Agency: string; // HDB, LTA, URA
}

export interface LtaDataMallResponse {
  'odata.metadata'?: string;
  value: LtaCarparkRecord[];
}

/**
 * Fetch a single page from LTA DataMall
 */
export async function fetchLtaPage(accountKey: string, skip: number = 0): Promise<LtaDataMallResponse> {
  const url = new URL(LTA_DATAMALL_URL);
  if (skip > 0) {
    url.searchParams.set('$skip', String(skip));
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      AccountKey: accountKey.trim(),
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(`LTA DataMall error (HTTP ${response.status}): ${errorBody || response.statusText}`);
  }

  return response.json() as Promise<LtaDataMallResponse>;
}

/**
 * Fetch all available records from LTA DataMall (pages of 500)
 */
export async function fetchAllLtaRecords(accountKey: string, maxPages = 6): Promise<LtaCarparkRecord[]> {
  const allRecords: LtaCarparkRecord[] = [];
  let skip = 0;
  let hasMore = true;
  let pageCount = 0;

  while (hasMore && pageCount < maxPages) {
    const data = await fetchLtaPage(accountKey, skip);
    const records = data.value || [];
    allRecords.push(...records);

    if (records.length < 500) {
      hasMore = false;
    } else {
      skip += 500;
      pageCount++;
    }
  }

  return allRecords;
}

/**
 * Serverless API handler for Carpark Availability
 * Endpoint: /api/carpark-availability (or /api/carpark availability)
 */
export default async function handler(req: Request, res: Response) {
  // Extract account key from environment or client header/query if provided
  const headerKey = req.headers['accountkey'] || req.headers['x-account-key'];
  const accountKey = (typeof headerKey === 'string' && headerKey.trim())
    ? headerKey.trim()
    : (process.env.LTA_ACCOUNT_KEY || process.env.ACCOUNT_KEY || '').trim();

  // If no account key is configured yet
  if (!accountKey) {
    return res.status(200).json({
      success: false,
      configured: false,
      error: 'LTA_ACCOUNT_KEY is not configured',
      message: 'Please set LTA_ACCOUNT_KEY in your environment or .env file. Live requests need the header: AccountKey: <LTA_ACCOUNT_KEY>.',
      endpoint: LTA_DATAMALL_URL,
      instructions: {
        step1: 'Register for an AccountKey at https://datamall.lta.gov.sg/',
        step2: 'Add LTA_ACCOUNT_KEY="your_key_here" to your environment or .env file',
        step3: 'Call this endpoint to receive live HDB, LTA, and URA parking lot telemetry'
      },
      timestamp: new Date().toISOString()
    });
  }

  try {
    const skipParam = req.query.skip || req.query['$skip'];
    const skip = skipParam ? parseInt(String(skipParam), 10) || 0 : 0;
    const fetchAll = req.query.all === 'true' || req.query.all === '1';
    const agencyFilter = typeof req.query.agency === 'string' ? req.query.agency.toUpperCase() : null;
    const searchQuery = typeof req.query.search === 'string' ? req.query.search.toLowerCase() : null;

    let records: LtaCarparkRecord[] = [];

    if (fetchAll) {
      records = await fetchAllLtaRecords(accountKey);
    } else {
      const data = await fetchLtaPage(accountKey, skip);
      records = data.value || [];
    }

    // Apply optional agency filter (HDB, LTA, URA)
    if (agencyFilter) {
      records = records.filter(r => r.Agency && r.Agency.toUpperCase() === agencyFilter);
    }

    // Apply optional search filter
    if (searchQuery) {
      records = records.filter(r => 
        (r.Development && r.Development.toLowerCase().includes(searchQuery)) ||
        (r.Area && r.Area.toLowerCase().includes(searchQuery)) ||
        (r.CarParkID && r.CarParkID.toLowerCase().includes(searchQuery))
      );
    }

    return res.status(200).json({
      success: true,
      configured: true,
      endpoint: LTA_DATAMALL_URL,
      total_retrieved: records.length,
      skip,
      timestamp: new Date().toISOString(),
      data: records
    });
  } catch (error: any) {
    console.error('Error fetching LTA DataMall telemetry:', error);
    return res.status(502).json({
      success: false,
      configured: true,
      error: 'Failed to fetch from LTA DataMall',
      details: error.message || String(error),
      endpoint: LTA_DATAMALL_URL,
      timestamp: new Date().toISOString()
    });
  }
}
