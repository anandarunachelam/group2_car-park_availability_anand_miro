export type NavTab = 
  | 'live-map' 
  | 'downtown-hotspots' 
  | 'agency-feeds' 
  | 'my-saved-lots';

export type AvailabilityTier = 'all' | 'green' | 'amber' | 'red';
export type AgencyFilter = 'HDB' | 'URA' | 'LTA Commercial' | 'Shopping Malls';

export interface Carpark {
  id: string;
  name: string;
  subtitleTag?: string;
  code?: string;
  area: string;
  distanceKm: number;
  agency: 'HDB' | 'URA' | 'LTA Commercial' | 'Commercial/LTA' | 'URA Commercial' | 'URA/CapitaLand';
  agencyCategory: AgencyFilter;
  systemType: string;
  capacity: number;
  availableLots: number;
  rateDescription: string;
  hourlyRate: number;
  statusTier: 'green' | 'amber' | 'red';
  statusLabel: string;
  notes?: string;
  rerouteSuggestion?: {
    name: string;
    vacantLots: number;
    walkMins: number;
  };
  mapCoords: {
    topPct: number;
    leftPct: number;
  };
  walkTimeMins?: number;
  walkDistanceM?: number;
  accessInfo?: string;
}

export interface HotspotZone {
  id: string;
  zoneNumber: string;
  category: string;
  name: string;
  description: string;
  occupancyPct: number;
  statusBadge: string;
  saturationLabel: string;
  saturationLevel: 'normal' | 'tight' | 'critical';
  avgWaitMins: number;
  availableLots: number;
  totalLots: number;
  advisory?: string;
  highlightedLotsText?: string;
}

export interface WalkAlternative {
  congestedName: string;
  congestedInfo: string;
  alternativeName: string;
  alternativeDetails: string;
  walkDistance: string;
  priceDelta: string;
  timeSaved: string;
  timeSavedNote: string;
}

export interface AgencyStreamRow {
  code: string;
  name: string;
  area: string;
  agency: 'LTA' | 'HDB' | 'URA';
  system: string;
  systemIcon: string;
  capacity: number;
  availableLots: number;
  status: 'Available' | 'Filling Fast' | 'Full / Critical';
  statusType: 'green' | 'amber' | 'red';
  ping: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SavedCarparkItem {
  id: string;
  tag: string;
  location: string;
  name: string;
  code: string;
  distance: string;
  availableLots: number;
  totalLots?: number;
  statusBadge: string;
  statusColor: 'green' | 'amber' | 'red';
  rate: string;
  reroute?: {
    name: string;
    vacantLots: number;
    walkMins: number;
  };
}

export interface ParkingHistoryItem {
  id: string;
  location: string;
  dateTime: string;
  duration: string;
  paymentMethod: string;
  rateSaved: string;
  status: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'alert' | 'info' | 'success';
  unread: boolean;
}
