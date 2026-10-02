import React, { useState } from 'react';
import { Carpark, AvailabilityTier, AgencyFilter } from '../types';
import { INITIAL_CARPARKS } from '../data/mockData';

interface LiveMapScreenProps {
  searchQuery: string;
}

export const LiveMapScreen: React.FC<LiveMapScreenProps> = ({ searchQuery }) => {
  const [carparks, setCarparks] = useState<Carpark[]>(INITIAL_CARPARKS);
  const [selectedTier, setSelectedTier] = useState<AvailabilityTier>('all');
  const [activeAgencies, setActiveAgencies] = useState<AgencyFilter[]>([
    'HDB',
    'URA',
    'LTA Commercial',
    'Shopping Malls'
  ]);
  const [selectedCarparkId, setSelectedCarparkId] = useState<string>('suntec');
  const [optimizerActive, setOptimizerActive] = useState<boolean>(true);
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [navigationModalOpen, setNavigationModalOpen] = useState<boolean>(false);
  const [routeReservedToast, setRouteReservedToast] = useState<string | null>(null);

  const selectedCarpark = carparks.find(c => c.id === selectedCarparkId) || carparks[0];

  const toggleAgency = (agency: AgencyFilter) => {
    setActiveAgencies(prev =>
      prev.includes(agency)
        ? prev.filter(a => a !== agency)
        : [...prev, agency]
    );
  };

  const resetFilters = () => {
    setSelectedTier('all');
    setActiveAgencies(['HDB', 'URA', 'LTA Commercial', 'Shopping Malls']);
  };

  // Filter carparks
  const filteredCarparks = carparks.filter(c => {
    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = c.name.toLowerCase().includes(q) || 
                    c.area.toLowerCase().includes(q) ||
                    (c.code && c.code.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Availability tier
    if (selectedTier !== 'all' && c.statusTier !== selectedTier) {
      return false;
    }

    // Agency filter
    if (activeAgencies.length > 0 && !activeAgencies.includes(c.agencyCategory)) {
      return false;
    }

    return true;
  });

  const handleStartNavigation = (carpark: Carpark) => {
    setSelectedCarparkId(carpark.id);
    setNavigationModalOpen(true);
  };

  const handleTriggerReroute = (carpark: Carpark) => {
    if (carpark.rerouteSuggestion) {
      setRouteReservedToast(`Autonomous Reroute: Reserved vacancy at ${carpark.rerouteSuggestion.name} (Bypassing bottleneck)`);
      setTimeout(() => setRouteReservedToast(null), 4000);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toast Notification */}
      {routeReservedToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#006c49] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-xl">check_circle</span>
          <span className="font-label-md text-sm">{routeReservedToast}</span>
          <button onClick={() => setRouteReservedToast(null)} className="ml-2 hover:opacity-80">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Sub-header / Problem & Strategic Goal Banner */}
      <section className="w-full bg-[#eff4ff] px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2 text-[#006c49]">
              <span className="material-symbols-outlined text-lg">local_parking</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                Government Open Data Protocol • Singapore Core
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-[#0b1c30] tracking-tight">
              Find parking in downtown Singapore without wasting precious time.
            </h1>
            <p className="font-body-md text-body-md text-[#45464d]">
              Unified real-time telemetric streams direct from Land Transport Authority (LTA DataMall), Housing &amp; Development Board (HDB), and Urban Redevelopment Authority (URA) with predictive queue modeling.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            <div className="bg-[#d3e4fe] px-3.5 py-2 rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0b1c30] text-lg">commute</span>
              <span className="font-label-md text-label-md text-[#0b1c30]">Central Business District (Zone 1)</span>
            </div>
            <button
              onClick={() => setOptimizerActive(!optimizerActive)}
              className={`px-3.5 py-2 rounded-lg font-label-md text-label-md shadow-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                optimizerActive 
                  ? 'bg-black text-white hover:bg-[#213145]' 
                  : 'bg-white text-[#45464d] border border-[#c6c6cd]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">tune</span>
              <span>{optimizerActive ? 'Optimizer Active' : 'Manual Mode'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar (Glanceable Civic Metrics) */}
      <section className="w-full bg-[#e5eeff] px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="bg-white p-3.5 rounded-lg shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#45464d]">
                Tracked Carparks
              </span>
              <span className="material-symbols-outlined text-[#76777d] text-lg">domain</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-metric-display text-metric-display text-[#0b1c30]">2,140</span>
              <span className="font-body-sm text-body-sm text-[#45464d]">Across SG</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-lg shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#45464d]">
                Downtown Lots Available
              </span>
              <span className="material-symbols-outlined text-[#006c49] text-lg">directions_car</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-metric-display text-metric-display text-[#006c49]">4,892</span>
              <span className="font-body-sm text-body-sm text-[#45464d] font-medium">Vacant</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-lg shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#45464d]">
                Feed Latency
              </span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006c49] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006c49]"></span>
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-metric-display text-metric-display text-[#0b1c30]">12s</span>
              <span className="font-body-sm text-body-sm text-[#45464d] truncate">via LTA DataMall</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-lg shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#45464d]">
                Time Saved
              </span>
              <span className="material-symbols-outlined text-[#497cff] text-lg">hourglass_top</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-metric-display text-metric-display text-[#0b1c30]">18 mins</span>
              <span className="font-body-sm text-body-sm text-[#45464d]">per driver trip</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Dual-Engine Console (Split Layout) */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel: Discovery Controls & Smart Feed (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Filters Card */}
            <div className="bg-white p-4 rounded-xl shadow-md space-y-4 border border-[#eff4ff]">
              {/* Availability Segment Tabs */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-label-sm text-[#45464d] uppercase tracking-wider">
                  Availability Status Filter
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-[#eff4ff] rounded-lg">
                  <button
                    onClick={() => setSelectedTier('all')}
                    className={`py-1.5 px-2 rounded text-center transition-all cursor-pointer font-label-sm text-label-sm ${
                      selectedTier === 'all'
                        ? 'bg-white text-[#0b1c30] shadow-xs font-bold'
                        : 'text-[#45464d] hover:text-[#0b1c30]'
                    }`}
                  >
                    All ({carparks.length})
                  </button>
                  <button
                    onClick={() => setSelectedTier('green')}
                    className={`py-1.5 px-2 rounded text-center transition-all cursor-pointer font-label-sm text-label-sm flex items-center justify-center gap-1 ${
                      selectedTier === 'green'
                        ? 'bg-white text-[#0b1c30] shadow-xs font-bold'
                        : 'text-[#45464d] hover:text-[#0b1c30]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
                    <span>&gt;50</span>
                  </button>
                  <button
                    onClick={() => setSelectedTier('amber')}
                    className={`py-1.5 px-2 rounded text-center transition-all cursor-pointer font-label-sm text-label-sm flex items-center justify-center gap-1 ${
                      selectedTier === 'amber'
                        ? 'bg-white text-[#0b1c30] shadow-xs font-bold'
                        : 'text-[#45464d] hover:text-[#0b1c30]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#497cff]"></span>
                    <span>10-50</span>
                  </button>
                  <button
                    onClick={() => setSelectedTier('red')}
                    className={`py-1.5 px-2 rounded text-center transition-all cursor-pointer font-label-sm text-label-sm flex items-center justify-center gap-1 ${
                      selectedTier === 'red'
                        ? 'bg-white text-[#0b1c30] shadow-xs font-bold'
                        : 'text-[#45464d] hover:text-[#0b1c30]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                    <span>&lt;10</span>
                  </button>
                </div>
              </div>

              {/* Agency Multi-tags */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-[#45464d] uppercase tracking-wider">
                    Public &amp; Private Feeds
                  </span>
                  <button
                    onClick={resetFilters}
                    className="font-label-sm text-label-sm text-[#497cff] hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(['HDB', 'URA', 'LTA Commercial', 'Shopping Malls'] as AgencyFilter[]).map((agency) => {
                    const active = activeAgencies.includes(agency);
                    return (
                      <button
                        key={agency}
                        onClick={() => toggleAgency(agency)}
                        className={`px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1 shadow-xs transition-all cursor-pointer ${
                          active
                            ? 'bg-[#dce9ff] text-[#0b1c30] font-semibold'
                            : 'bg-[#eff4ff] text-[#76777d] opacity-60 hover:opacity-100'
                        }`}
                      >
                        <span>{agency}</span>
                        {active && <span className="material-symbols-outlined text-xs">check</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Carpark Cards List */}
            <div className="space-y-3">
              {filteredCarparks.length === 0 ? (
                <div className="bg-white p-8 rounded-xl text-center text-[#76777d]">
                  <span className="material-symbols-outlined text-3xl mb-2">search_off</span>
                  <p className="font-body-md text-sm">No carparks match your filter criteria.</p>
                  <button onClick={resetFilters} className="mt-2 text-xs font-bold text-[#006c49] hover:underline">
                    Reset all filters
                  </button>
                </div>
              ) : (
                filteredCarparks.map((carpark) => {
                  const isSelected = carpark.id === selectedCarparkId;

                  return (
                    <article
                      key={carpark.id}
                      onClick={() => setSelectedCarparkId(carpark.id)}
                      className={`bg-white p-4 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer group border ${
                        isSelected
                          ? 'border-[#006c49] ring-2 ring-[#006c49]/20'
                          : 'border-[#eff4ff] hover:border-[#c6c6cd]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h3 className="font-headline-sm text-headline-sm text-[#0b1c30] group-hover:text-[#497cff] transition-colors">
                              {carpark.name}
                            </h3>
                            {carpark.subtitleTag && (
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                carpark.statusTier === 'red'
                                  ? 'bg-[#ffdad6] text-[#ba1a1a]'
                                  : 'bg-[#dce9ff] text-[#45464d]'
                              }`}>
                                {carpark.subtitleTag}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 font-body-sm text-body-sm text-[#45464d] flex-wrap">
                            <span className="flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-xs">near_me</span>
                              {carpark.distanceKm} km
                            </span>
                            <span>•</span>
                            <span>{carpark.systemType}</span>
                            <span>•</span>
                            <span>Agency: {carpark.agency}</span>
                          </div>
                        </div>

                        {/* Availability Count Pill */}
                        <div className="flex flex-col items-end shrink-0">
                          <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-md text-label-md font-bold ${
                            carpark.statusTier === 'green'
                              ? 'bg-[#6cf8bb]/40 text-[#00714d]'
                              : carpark.statusTier === 'amber'
                              ? 'bg-[#dce9ff] text-[#0b1c30]'
                              : 'bg-[#ffdad6] text-[#ba1a1a]'
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${
                              carpark.statusTier === 'green'
                                ? 'bg-[#006c49]'
                                : carpark.statusTier === 'amber'
                                ? 'bg-[#497cff]'
                                : 'bg-[#ba1a1a]'
                            }`}></span>
                            <span>{carpark.availableLots} Lots</span>
                          </div>
                          <span className={`font-label-sm text-label-sm font-semibold mt-0.5 ${
                            carpark.statusTier === 'green'
                              ? 'text-[#006c49]'
                              : carpark.statusTier === 'amber'
                              ? 'text-[#497cff]'
                              : 'text-[#ba1a1a]'
                          }`}>
                            {carpark.statusLabel}
                          </span>
                        </div>
                      </div>

                      {/* Smart Diversion Notice (for congested lots) */}
                      {carpark.rerouteSuggestion && (
                        <div className="my-2 bg-[#ffdad6]/50 p-2 rounded-lg flex items-center justify-between text-[#93000a] text-xs">
                          <div className="flex items-center gap-1.5 font-medium">
                            <span className="material-symbols-outlined text-sm">alt_route</span>
                            <span>Divert to {carpark.rerouteSuggestion.name} ({carpark.rerouteSuggestion.vacantLots} lots open)</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTriggerReroute(carpark);
                            }}
                            className="font-bold underline cursor-pointer hover:text-black"
                          >
                            Auto-Reroute
                          </button>
                        </div>
                      )}

                      {/* Bottom rate & action bar */}
                      <div className="mt-3 pt-2.5 bg-[#eff4ff] p-2.5 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[#76777d] text-sm">payments</span>
                          <span className="font-label-md text-label-md text-[#0b1c30] font-semibold">
                            {carpark.rateDescription}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartNavigation(carpark);
                          }}
                          className="bg-black text-white px-3 py-1 rounded text-xs font-semibold flex items-center gap-1 hover:bg-[#213145] transition-colors cursor-pointer"
                        >
                          <span>Navigate</span>
                          <span className="material-symbols-outlined text-xs">arrow_forward</span>
                        </button>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel: Real-Time Vector Map View (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4 sticky top-20">
            <div className="relative w-full h-[620px] rounded-xl overflow-hidden bg-[#dce9ff] shadow-xl flex flex-col justify-between p-4 border border-[#c6c6cd]/40">
              {/* Stylized Canvas Background with Singapore Geographic Aesthetics */}
              <div 
                className="absolute inset-0 w-full h-full bg-[#f0f4fc]"
                style={{ transform: `scale(${mapZoom})`, transformOrigin: 'center center', transition: 'transform 0.3s ease-out' }}
              >
                {/* SVG Waterway: Singapore River & Marina Bay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  {/* Marina Bay Basin */}
                  <path
                    d="M 500,280 C 650,220 850,260 880,480 C 900,600 750,680 580,620 C 480,580 430,420 500,280 Z"
                    fill="#bfe1fb"
                    opacity="0.8"
                  />
                  {/* Singapore River Meander */}
                  <path
                    d="M -40,320 C 120,310 220,380 340,370 C 440,360 480,310 520,300"
                    fill="none"
                    stroke="#bfe1fb"
                    strokeWidth="36"
                    strokeLinecap="round"
                  />
                  {/* Coastline / East Coast Parkway Bridge */}
                  <path
                    d="M 450,120 L 720,240 L 980,360"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="10"
                    strokeDasharray="6 4"
                    opacity="0.9"
                  />
                  {/* Urban Grid Major Arterials (Nicoll Highway, Shenton Way, Marina Blvd) */}
                  <path d="M 80,180 L 950,180" stroke="#ffffff" strokeWidth="6" opacity="0.85" />
                  <path d="M 160,-20 L 320,680" stroke="#ffffff" strokeWidth="6" opacity="0.85" />
                  <path d="M 420,-20 L 600,680" stroke="#ffffff" strokeWidth="6" opacity="0.85" />
                  <path d="M 280,240 C 400,240 500,320 620,340 L 800,420" stroke="#ffffff" strokeWidth="8" opacity="0.9" />

                  {/* Landmarks Labels */}
                  <text x="700" y="380" fill="#0b1c30" fontSize="12" fontWeight="700" opacity="0.4">
                    Marina Bay Sands
                  </text>
                  <text x="260" y="330" fill="#0b1c30" fontSize="12" fontWeight="700" opacity="0.4">
                    Singapore River / Boat Quay
                  </text>
                  <text x="440" y="160" fill="#0b1c30" fontSize="12" fontWeight="700" opacity="0.4">
                    Marina Centre
                  </text>
                  <text x="320" y="580" fill="#0b1c30" fontSize="12" fontWeight="700" opacity="0.4">
                    Tanjong Pagar / Shenton
                  </text>
                </svg>
              </div>

              {/* Interactive Color Legend Bar (Top Layer) */}
              <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-2 bg-white/95 backdrop-blur-md p-2.5 rounded-lg shadow-sm border border-[#c6c6cd]/30">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="font-label-sm text-label-sm font-bold text-[#0b1c30]">LIVE CAPACITY:</span>
                  <div className="flex items-center gap-1 font-label-sm text-label-sm text-[#0b1c30]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006c49]"></span>
                    <span>Plenty (&gt;50)</span>
                  </div>
                  <div className="flex items-center gap-1 font-label-sm text-label-sm text-[#0b1c30]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#497cff]"></span>
                    <span>Filling Fast (10-50)</span>
                  </div>
                  <div className="flex items-center gap-1 font-label-sm text-label-sm text-[#0b1c30]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
                    <span>Critically Low (&lt;10)</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 font-label-sm text-label-sm text-[#45464d]">
                  <span className="material-symbols-outlined text-xs text-[#006c49] animate-pulse">sensors</span>
                  <span>LTA Feed Synced</span>
                </div>
              </div>

              {/* Map Pins Overlay */}
              <div className="relative z-10 w-full h-full my-auto pointer-events-none">
                {carparks.map((carpark) => {
                  const isSelected = carpark.id === selectedCarparkId;
                  const isGreen = carpark.statusTier === 'green';
                  const isAmber = carpark.statusTier === 'amber';
                  const isRed = carpark.statusTier === 'red';

                  return (
                    <div
                      key={carpark.id}
                      onClick={() => setSelectedCarparkId(carpark.id)}
                      style={{
                        top: `${carpark.mapCoords.topPct}%`,
                        left: `${carpark.mapCoords.leftPct}%`
                      }}
                      className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-115"
                    >
                      <div className="relative flex flex-col items-center">
                        {isSelected && (
                          <span className={`animate-ping absolute -top-1 -left-1 inline-flex h-12 w-12 rounded-full opacity-40 ${
                            isGreen ? 'bg-[#006c49]' : isAmber ? 'bg-[#497cff]' : 'bg-[#ba1a1a]'
                          }`}></span>
                        )}

                        <div className={`px-2.5 py-1 rounded-full shadow-lg font-headline-sm text-headline-sm font-extrabold flex items-center gap-1 ring-2 ring-white text-white ${
                          isGreen ? 'bg-[#006c49]' : isAmber ? 'bg-[#497cff]' : 'bg-[#ba1a1a]'
                        } ${isSelected ? 'scale-110 shadow-2xl ring-3 ring-black' : ''}`}>
                          <span className="material-symbols-outlined text-xs">
                            {isRed ? 'priority_high' : 'local_parking'}
                          </span>
                          <span>{carpark.availableLots}</span>
                        </div>

                        <span className="mt-1 bg-white/95 px-1.5 py-0.5 rounded text-[10px] font-bold text-[#0b1c30] shadow-xs whitespace-nowrap">
                          {carpark.name.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Highlighted Carpark Floating Card (HUD overlay bottom left) */}
              <div className="relative z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-2xl max-w-sm w-full space-y-2.5 border-l-4 border-l-[#006c49] border border-[#c6c6cd]/40">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#006c49] font-bold">
                      Selected Destination
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                      {selectedCarpark.name}
                    </h4>
                    <p className="font-body-sm text-body-sm text-[#45464d]">
                      {selectedCarpark.accessInfo || selectedCarpark.area}
                    </p>
                  </div>
                  <div className="bg-[#6cf8bb]/50 text-[#00714d] px-2.5 py-1 rounded text-center">
                    <span className="font-headline-sm text-headline-sm font-bold block">
                      {selectedCarpark.availableLots}
                    </span>
                    <span className="font-label-sm text-label-sm block -mt-1 font-semibold">Lots Left</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#eff4ff] p-2 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#76777d] text-base">directions_walk</span>
                    <div>
                      <span className="font-label-sm text-label-sm text-[#45464d] block">Walk Time</span>
                      <span className="font-label-md text-label-md text-[#0b1c30] font-bold">
                        {selectedCarpark.walkTimeMins || 3} mins ({selectedCarpark.walkDistanceM || 240}m)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#76777d] text-base">attach_money</span>
                    <div>
                      <span className="font-label-sm text-label-sm text-[#45464d] block">Rate Structure</span>
                      <span className="font-label-md text-label-md text-[#0b1c30] font-bold">
                        ${selectedCarpark.hourlyRate.toFixed(2)}/hr
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setNavigationModalOpen(true)}
                  className="w-full h-11 bg-[#497cff] hover:bg-[#00174b] text-white rounded-lg font-label-lg text-label-lg font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">navigation</span>
                  <span>Direct Navigation via Google Maps / Waze</span>
                </button>
              </div>

              {/* Vector Compass & Map Utilities */}
              <div className="absolute right-4 bottom-4 z-10 flex flex-col gap-1.5">
                <button
                  onClick={() => setMapZoom(1)}
                  aria-label="Center Map"
                  className="w-10 h-10 bg-white text-[#0b1c30] rounded-lg shadow-md flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer border border-[#c6c6cd]/50"
                >
                  <span className="material-symbols-outlined">my_location</span>
                </button>
                <button
                  onClick={() => setMapZoom(prev => Math.min(prev + 0.2, 1.8))}
                  aria-label="Zoom In"
                  className="w-10 h-10 bg-white text-[#0b1c30] rounded-lg shadow-md flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer border border-[#c6c6cd]/50"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
                <button
                  onClick={() => setMapZoom(prev => Math.max(prev - 0.2, 0.8))}
                  aria-label="Zoom Out"
                  className="w-10 h-10 bg-white text-[#0b1c30] rounded-lg shadow-md flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer border border-[#c6c6cd]/50"
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
              </div>
            </div>

            {/* Real-Time Predictive Vacancy Sparkline Container */}
            <div className="bg-white p-4 rounded-xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#eff4ff]">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[#0b1c30]">
                  <span className="material-symbols-outlined text-sm text-[#006c49]">trending_up</span>
                  <span className="font-label-lg text-label-lg font-bold">Downtown Fill-Rate Predictor</span>
                </div>
                <p className="font-body-sm text-body-sm text-[#45464d]">
                  Peak convergence expected around 1:15 PM lunch hour across Raffles Place.
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <svg className="w-36 h-10 text-[#006c49]" fill="none" viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 32 Q 20 28, 40 25 T 80 18 T 110 8 T 140 2"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                  <circle cx="110" cy="8" fill="currentColor" r="3.5" />
                </svg>
                <div className="text-right">
                  <span className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold block">+14%</span>
                  <span className="font-label-sm text-label-sm text-[#76777d] block">Next 30 mins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Municipal Notification Ticker Bar */}
      <section className="w-full bg-black text-white py-2 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-lg mt-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1 bg-[#ba1a1a] px-2 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wide shrink-0">
              <span className="material-symbols-outlined text-xs">warning</span>
              <span>Driver Alert</span>
            </div>
            <p className="font-body-sm text-body-sm truncate text-[#dce9ff]">
              One Raffles Quay is currently <strong className="text-white font-bold">100% full</strong>. 18 drivers rerouted to Marina Bay Link Mall (140 lots open).
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-[#dce9ff]">GovTech Live Feed Active</span>
          </div>
        </div>
      </section>

      {/* Navigation Modal */}
      {navigationModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#c6c6cd]/50 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setNavigationModalOpen(false)}
              className="absolute top-4 right-4 text-[#76777d] hover:text-black p-1 rounded-lg"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#6cf8bb]/40 text-[#006c49] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-lg">near_me</span>
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-[#0b1c30]">
                Live Gantry Navigation
              </h3>
            </div>
            <p className="font-body-sm text-[#45464d] mb-4">
              Routing directly to <strong className="text-black">{selectedCarpark.name}</strong> with real-time gantry clearance.
            </p>

            <div className="bg-[#eff4ff] p-4 rounded-xl space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#45464d]">Target Entrance:</span>
                <strong className="text-[#0b1c30]">{selectedCarpark.accessInfo || 'Main Gantry Ingress'}</strong>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#45464d]">Live Vacancy:</span>
                <span className="font-bold text-[#006c49]">{selectedCarpark.availableLots} Available Lots</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#45464d]">Estimated Parking Fee:</span>
                <strong className="text-[#0b1c30]">{selectedCarpark.rateDescription}</strong>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedCarpark.name + ' Singapore')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full h-11 bg-[#497cff] text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#00174b] transition-colors"
              >
                <span className="material-symbols-outlined">navigation</span>
                <span>Open in Google Maps</span>
              </a>
              <a
                href={`https://waze.com/ul?q=${encodeURIComponent(selectedCarpark.name + ' Singapore')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full h-11 bg-black text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined">directions_car</span>
                <span>Open in Waze (Bypasses Traffic)</span>
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-[#eff4ff] flex justify-between items-center text-xs text-[#76777d]">
              <span>In-Vehicle Unit (IU) handshake ready</span>
              <button
                onClick={() => setNavigationModalOpen(false)}
                className="font-bold text-black hover:underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
