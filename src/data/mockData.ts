import { Carpark, HotspotZone, WalkAlternative, AgencyStreamRow, SavedCarparkItem, ParkingHistoryItem, NotificationItem } from '../types';

export const APP_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1VATR7DPgSIW22_MAQpDyWqlNrtYaIin6PDEKUmlNkJyNT4So53hsqEttkPaA7Ojc3pvglKvMroPMcfzC9Bpb_cHqubhv2mIp2pIr38nORBHjYP5xhSe4BdN7Umi9tOYGzcfyglgG9FGWD_dkflJhxQ7OscQKrXxnMUYlrDbbWSc7qRwg95x7PYetOSWxCVGkkWCum_8ZuMvM4bvhJ78q1xT-S-Om_SWWyo5KhfcNEFrUwS6ZUY6XNAdDQ',
  profileAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaRC308Xm27bZIt6hxV26Wcw8lubHtMMPCZuOukX1sItAYPFt2a9sbHT4W6jzVIY_DJEvw4JPbdQHrAiXAiGpfo_MBzwsT4BZSGO5ssiyKjEAuc91Zvc-c3XVtE9f1oGhwVtJjBhsD7ggTbqG2yDKUDfd28R4-Bi5o51aE211N3Yp5w0t4911HMMKfwqC2P3O1KMJWZq6V2R_nyN87C2jcSySqSK0FMOpu33-M5BFOBTZ-R2oNT9oZ',
  mapMarinaBay: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3v93e-wKFg4OWDt9Qju2yR7HB_a3aUbGpMRJ9wBI28Ptmcqd3B9TvjOBZ5uxIgC66qF-mvd5qEfQ6EUvdCA1_timm-AaeksySvwILKSYID9GzmHB1k4vrGLuNLThotfzX88Den-jFO6ogiUfN6CiFaOXWJRTxB9QgP5Xitk7UpbdlbMzH1r8rq3gQv9lIOZKRYJlt_lO3-FgTk-FIxc_gtz30tsLnDbbMj7YVwOwOpBfZCWJB29dR',
  mapDowntownCore: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJGGryU7XoD-TEQ1Ie6h75ThP-p32Q8CdwJfZbH5YM-HR5atJNNHXsTPbcl9_3Jv1-a2Lc8ANbkXG3O6VK0slh-xOvISw9TAvmWXe8GgqBPtL_QNv1EuruwUQEJFhzHl3P9wmtOr9U-HGXGYIFwf0I824HSLrXB7h3gIw4wbAtzwixoH2Bl9Q7nsrM4Tkm3VdTw2Z88MsAgkZWfCpnx000nOBrZypLqGjHsgnVYtJ1w1eySFbURGQp',
};

export const INITIAL_CARPARKS: Carpark[] = [
  {
    id: 'suntec',
    name: 'Suntec City Mall Carpark',
    subtitleTag: 'EPS',
    code: 'STC-01',
    area: 'Downtown Marina Centre',
    distanceKm: 0.4,
    agency: 'Commercial/LTA',
    agencyCategory: 'Shopping Malls',
    systemType: 'Electronic Gantry (EPS)',
    capacity: 3100,
    availableLots: 342,
    rateDescription: '$2.40 / hr (Off-Peak CBD)',
    hourlyRate: 2.40,
    statusTier: 'green',
    statusLabel: 'Available',
    notes: 'Grace: 10 mins • Multi-zone parking towers with EV fast chargers.',
    mapCoords: { topPct: 18, leftPct: 64 },
    walkTimeMins: 3,
    walkDistanceM: 240,
    accessInfo: 'Access via Temasek Boulevard Ramp'
  },
  {
    id: 'raffles',
    name: 'Raffles City Basement',
    subtitleTag: 'EV Ready',
    code: 'RC-B1',
    area: 'Civic District / City Hall',
    distanceKm: 0.8,
    agency: 'URA/CapitaLand',
    agencyCategory: 'LTA Commercial',
    systemType: 'CapitaStar Smart Sensor',
    capacity: 1050,
    availableLots: 48,
    rateDescription: '$3.20 / hr (Standard Rate)',
    hourlyRate: 3.20,
    statusTier: 'amber',
    statusLabel: 'Busy / Filling Fast',
    notes: 'Est. 6 min queue • Bras Basah Road subterranean entrance.',
    mapCoords: { topPct: 36, leftPct: 42 },
    walkTimeMins: 5,
    walkDistanceM: 380,
    accessInfo: 'Access via Bras Basah Rd Underpass'
  },
  {
    id: 'mbfc',
    name: 'Marina Bay Financial Centre',
    subtitleTag: 'Peak',
    code: 'MBFC-T1',
    area: 'Downtown Financial Hub',
    distanceKm: 1.1,
    agency: 'URA Commercial',
    agencyCategory: 'LTA Commercial',
    systemType: 'Smart Sensor Ultrasonic',
    capacity: 410,
    availableLots: 7,
    rateDescription: '$4.50 / hr',
    hourlyRate: 4.50,
    statusTier: 'red',
    statusLabel: 'Almost Full',
    notes: 'Heavy influx from financial tenants. High bottleneck alert.',
    rerouteSuggestion: {
      name: 'Marina One',
      vacantLots: 120,
      walkMins: 2
    },
    mapCoords: { topPct: 68, leftPct: 72 },
    walkTimeMins: 2,
    walkDistanceM: 150,
    accessInfo: 'Access via Marina Boulevard Tunnel'
  },
  {
    id: 'chinatown',
    name: 'Chinatown Complex',
    subtitleTag: 'HDB Budget',
    code: 'CTC-01',
    area: 'Chinatown Historic District',
    distanceKm: 1.5,
    agency: 'HDB',
    agencyCategory: 'HDB',
    systemType: 'EPS Automated',
    capacity: 680,
    availableLots: 185,
    rateDescription: '$1.20 / hr (Gov Central Tier)',
    hourlyRate: 1.20,
    statusTier: 'green',
    statusLabel: 'Available',
    notes: 'Government subsidised municipal rates. Ideal for dining and errands.',
    mapCoords: { topPct: 74, leftPct: 28 },
    walkTimeMins: 6,
    walkDistanceM: 450,
    accessInfo: 'Access via Smith Street / Sago Lane'
  },
  {
    id: 'clarkequay',
    name: 'Clarke Quay Central',
    subtitleTag: 'Riverside',
    code: 'CQC-02',
    area: 'Singapore River Precinct',
    distanceKm: 1.8,
    agency: 'LTA Commercial',
    agencyCategory: 'Shopping Malls',
    systemType: 'Electronic Gantry (EPS)',
    capacity: 480,
    availableLots: 22,
    rateDescription: '$2.80 / hr',
    hourlyRate: 2.80,
    statusTier: 'amber',
    statusLabel: 'Busy',
    notes: 'Eu Tong Sen Street entry. Dining crowd filling lower basements.',
    mapCoords: { topPct: 44, leftPct: 22 },
    walkTimeMins: 7,
    walkDistanceM: 520,
    accessInfo: 'Access via Eu Tong Sen Street'
  },
  {
    id: 'tanjongpagar',
    name: 'Tanjong Pagar Plaza',
    subtitleTag: 'Multi-Storey',
    code: 'TPM-04',
    area: 'Tanjong Pagar CBD Fringe',
    distanceKm: 2.1,
    agency: 'HDB',
    agencyCategory: 'HDB',
    systemType: 'EPS Electronic Barrier',
    capacity: 180,
    availableLots: 3,
    rateDescription: '$1.20 / hr (Season Parking Active)',
    hourlyRate: 1.20,
    statusTier: 'red',
    statusLabel: 'Full (Residents Priority)',
    notes: 'Resident red season lots in effect. Visitor white lots depleted.',
    mapCoords: { topPct: 82, leftPct: 48 },
    walkTimeMins: 8,
    walkDistanceM: 600,
    accessInfo: 'Access via Tanjong Pagar Road'
  }
];

export const HOTSPOT_ZONES: HotspotZone[] = [
  {
    id: 'zone-1',
    zoneNumber: '01',
    category: 'Financial Hub',
    name: 'Marina Bay & Financial District',
    description: 'MBFC Towers 1-3, One Raffles Quay, and Marina Bay Sands underground bays.',
    occupancyPct: 88,
    statusBadge: '88% Occupancy',
    saturationLabel: 'High Hotspot Rating',
    saturationLevel: 'critical',
    avgWaitMins: 14,
    availableLots: 34,
    totalLots: 410,
    highlightedLotsText: '34 / 410'
  },
  {
    id: 'zone-2',
    zoneNumber: '02',
    category: 'Critical Saturation',
    name: 'Raffles Place & Shenton Way',
    description: 'One Raffles Place, Republic Plaza, Singapore Land Tower.',
    occupancyPct: 94,
    statusBadge: '94% Occupancy',
    saturationLabel: 'Severe Bottleneck',
    saturationLevel: 'critical',
    avgWaitMins: 22,
    availableLots: 12,
    totalLots: 620,
    advisory: 'Advisory: Divert to Telok Ayer / Cecil St',
    highlightedLotsText: '12 / 620'
  },
  {
    id: 'zone-3',
    zoneNumber: '03',
    category: 'Mixed Commercial',
    name: 'Tanjong Pagar & Anson Road',
    description: 'Guoco Tower, International Plaza, and Craig Road public carparks.',
    occupancyPct: 65,
    statusBadge: '65% Occupancy',
    saturationLabel: 'Flow Steady',
    saturationLevel: 'tight',
    avgWaitMins: 5,
    availableLots: 148,
    totalLots: 850,
    highlightedLotsText: '148 / 850'
  },
  {
    id: 'zone-4',
    zoneNumber: '04',
    category: 'Retail Corridor',
    name: 'Orchard Shopping Belt',
    description: 'Ion Orchard, Ngee Ann City (Takashimaya), Paragon, Wisma Atria.',
    occupancyPct: 72,
    statusBadge: '72% Occupancy',
    saturationLabel: 'Ion Full • Takashimaya Open',
    saturationLevel: 'tight',
    avgWaitMins: 9,
    availableLots: 110,
    totalLots: 1200,
    highlightedLotsText: '110 Available'
  },
  {
    id: 'zone-5',
    zoneNumber: '05',
    category: 'High Availability',
    name: 'Bugis & Bras Basah',
    description: 'Bugis Junction, Bugis+, National Library Building basement lots.',
    occupancyPct: 41,
    statusBadge: '41% Occupancy',
    saturationLabel: 'Ample Parking at Bugis+',
    saturationLevel: 'normal',
    avgWaitMins: 1,
    availableLots: 294,
    totalLots: 520,
    highlightedLotsText: '294 / 520'
  },
  {
    id: 'zone-6',
    zoneNumber: '06',
    category: 'Civic Heart',
    name: 'City Hall & Civic District',
    description: 'National Gallery SG, The Adelphi, Capitol Piazza, Funan Digital Mall.',
    occupancyPct: 58,
    statusBadge: '58% Occupancy',
    saturationLabel: 'National Gallery Open',
    saturationLevel: 'normal',
    avgWaitMins: 3,
    availableLots: 186,
    totalLots: 440,
    highlightedLotsText: '186 / 440'
  }
];

export const WALK_ALTERNATIVES: WalkAlternative[] = [
  {
    congestedName: 'OUE Bayfront',
    congestedInfo: '4 lots left • $4.20/30m',
    alternativeName: 'UIC Building (5 Shenton)',
    alternativeDetails: '78 bays vacant • Undercover link',
    walkDistance: '240m (3 mins)',
    priceDelta: '-$1.80 cheaper / hr',
    timeSaved: '~15 mins saved',
    timeSavedNote: 'No entry queue delay'
  },
  {
    congestedName: 'Ion Orchard',
    congestedInfo: 'Full • 25m Queue',
    alternativeName: 'Angullia Park Off-Street / Wisma',
    alternativeDetails: '54 bays vacant • Direct alley ingress',
    walkDistance: '180m (2 mins)',
    priceDelta: '-$1.20 cheaper / hr',
    timeSaved: '~22 mins saved',
    timeSavedNote: 'Bypasses Orchard Blvd turn'
  },
  {
    congestedName: 'Marina One West Tower',
    congestedInfo: '92% Occ • Bottleneck',
    alternativeName: 'SGX Centre 2 Basement',
    alternativeDetails: '86 bays vacant • Sheltered walkway',
    walkDistance: '310m (4 mins)',
    priceDelta: '-$0.90 cheaper / hr',
    timeSaved: '~11 mins saved',
    timeSavedNote: 'Avoid Straits View jam'
  }
];

export const HISTORICAL_HOURLY_DATA = [
  { hour: '08h', vacancyPct: 42, status: 'safe' },
  { hour: '09h', vacancyPct: 18, status: 'tight' },
  { hour: '10h', vacancyPct: 12, status: 'critical' },
  { hour: '11h', vacancyPct: 22, status: 'tight' },
  { hour: '12h', vacancyPct: 6, status: 'critical', label: '12h (Lunch Peak)' },
  { hour: '13h', vacancyPct: 8, status: 'critical', label: '13h' },
  { hour: '14h', vacancyPct: 26, status: 'safe' },
  { hour: '15h', vacancyPct: 34, status: 'safe' },
  { hour: '16h', vacancyPct: 30, status: 'safe' },
  { hour: '17h', vacancyPct: 19, status: 'tight' },
  { hour: '18h', vacancyPct: 9, status: 'critical', label: '18h (Evening Rush)' },
  { hour: '19h', vacancyPct: 28, status: 'safe' },
  { hour: '20h', vacancyPct: 48, status: 'safe' }
];

export const AGENCY_STREAM_ROWS: AgencyStreamRow[] = [
  {
    code: 'ACB',
    name: 'Blk 261 Waterloo St',
    area: 'Bugis / Bras Basah',
    agency: 'HDB',
    system: 'Electronic Gantry (EPS)',
    systemIcon: 'directions_car',
    capacity: 210,
    availableLots: 64,
    status: 'Available',
    statusType: 'green',
    ping: '2s ago',
    coordinates: { lat: 1.2985, lng: 103.8522 }
  },
  {
    code: 'U0024',
    name: 'Amoy Street / Telok Ayer Street',
    area: 'Chinatown Historic District',
    agency: 'URA',
    system: 'Coupon/App Gantry',
    systemIcon: 'directions_car',
    capacity: 45,
    availableLots: 4,
    status: 'Full / Critical',
    statusType: 'red',
    ping: '5s ago',
    coordinates: { lat: 1.2801, lng: 103.8475 }
  },
  {
    code: 'LTA-CBD-04',
    name: 'Marina Square Carpark',
    area: 'Downtown Marina Centre',
    agency: 'LTA',
    system: 'Smart Sensor Ultrasonic',
    systemIcon: 'sensors',
    capacity: 980,
    availableLots: 312,
    status: 'Available',
    statusType: 'green',
    ping: '1s ago',
    coordinates: { lat: 1.2917, lng: 103.8576 }
  },
  {
    code: 'TPM',
    name: 'Tanjong Pagar Market',
    area: 'Tanjong Pagar / CBD Fringe',
    agency: 'HDB',
    system: 'Electronic Gantry (EPS)',
    systemIcon: 'directions_car',
    capacity: 180,
    availableLots: 14,
    status: 'Filling Fast',
    statusType: 'amber',
    ping: '6s ago',
    coordinates: { lat: 1.2768, lng: 103.8443 }
  },
  {
    code: 'U0088',
    name: 'Club Street Surface Lots',
    area: 'Ann Siang Hill',
    agency: 'URA',
    system: 'Dual Car & Moto EPS',
    systemIcon: 'motorcycle',
    capacity: 62,
    availableLots: 29,
    status: 'Available',
    statusType: 'green',
    ping: '3s ago',
    coordinates: { lat: 1.2828, lng: 103.8457 }
  },
  {
    code: 'LTA-ORC-12',
    name: 'ION Orchard Parking Basement',
    area: 'Orchard Commercial Core',
    agency: 'LTA',
    system: 'Smart Sensor Ultrasonic',
    systemIcon: 'directions_car',
    capacity: 500,
    availableLots: 8,
    status: 'Full / Critical',
    statusType: 'red',
    ping: '4s ago',
    coordinates: { lat: 1.3040, lng: 103.8319 }
  }
];

export const SAVED_CARPARKS: SavedCarparkItem[] = [
  {
    id: 'saved-1',
    tag: 'Office Spot',
    location: 'Marina Boulevard',
    name: 'Marina Bay Financial Centre Tower 1',
    code: 'MBFC-T1',
    distance: '0.4 km away',
    availableLots: 8,
    totalLots: 410,
    statusBadge: '8 Lots Left (Busy)',
    statusColor: 'red',
    rate: '$3.27 / 30 mins',
    reroute: {
      name: 'Marina One',
      vacantLots: 112,
      walkMins: 2
    }
  },
  {
    id: 'saved-2',
    tag: 'Weekend Family',
    location: 'HarbourFront Walk',
    name: 'VivoCity Basement (B1/B2)',
    code: 'VVC-01',
    distance: '5.8 km away',
    availableLots: 240,
    totalLots: 2180,
    statusBadge: '240 Lots Available',
    statusColor: 'green',
    rate: '$1.60 1st hr, $0.80/sub. 30 mins'
  },
  {
    id: 'saved-3',
    tag: 'Hawker Lunch Spot',
    location: 'URA Carpark',
    name: 'Maxwell Food Centre Surface Carpark',
    code: 'MXW01',
    distance: '1.2 km away',
    availableLots: 19,
    totalLots: 65,
    statusBadge: '19 Filling Fast',
    statusColor: 'amber',
    rate: '$1.20 / 30 mins'
  },
  {
    id: 'saved-4',
    tag: 'Gym / Evening',
    location: 'Kim Seng Promenade',
    name: 'Great World City (Multi-Storey)',
    code: 'GWC-02',
    distance: '3.1 km away',
    availableLots: 185,
    totalLots: 850,
    statusBadge: '185 Lots Available',
    statusColor: 'green',
    rate: '$2.18 / hr (Post 6:00 PM $3.50 entry)'
  }
];

export const PARKING_HISTORY: ParkingHistoryItem[] = [
  {
    id: 'hist-1',
    location: 'Marina One East Tower',
    dateTime: 'Yesterday, 9:04 AM',
    duration: '3 hrs 42 mins',
    paymentMethod: '$14.20 (IU Auto-debit)',
    rateSaved: '+$4.50 (vs MBFC)',
    status: 'Completed'
  },
  {
    id: 'hist-2',
    location: 'Maxwell Food Centre (URA)',
    dateTime: '14 Oct, 12:15 PM',
    duration: '48 mins',
    paymentMethod: '$2.40 (Parking.sg Sync)',
    rateSaved: '-',
    status: 'Completed'
  },
  {
    id: 'hist-3',
    location: 'VivoCity Basement 2',
    dateTime: '12 Oct, 6:30 PM',
    duration: '2 hrs 10 mins',
    paymentMethod: '$3.20 (IU Auto-debit)',
    rateSaved: '+$2.00 (F&B Rebate)',
    status: 'Completed'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Severe Bottleneck: One Raffles Quay',
    description: 'One Raffles Quay is currently 100% full. 18 drivers rerouted to Marina Bay Link Mall (140 lots open).',
    time: '2 mins ago',
    type: 'alert',
    unread: true
  },
  {
    id: 'notif-2',
    title: 'LTA ERP Gantry Notice: Shenton Way',
    description: 'ERP gantry surcharge of $2.00 in effect from 1:00 PM - 2:00 PM for inbound financial district routes.',
    time: '18 mins ago',
    type: 'info',
    unread: true
  },
  {
    id: 'notif-3',
    title: 'High Availability at Suntec City',
    description: '342 open lots in West Wing. Recommended alternative for CBD meetings.',
    time: '45 mins ago',
    type: 'success',
    unread: false
  }
];
