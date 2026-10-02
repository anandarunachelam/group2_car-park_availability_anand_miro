import React, { useState } from 'react';
import { SAVED_CARPARKS, PARKING_HISTORY, APP_ASSETS } from '../data/mockData';
import { SavedCarparkItem } from '../types';

export const MySavedLotsScreen: React.FC = () => {
  const [savedCarparks, setSavedCarparks] = useState<SavedCarparkItem[]>(SAVED_CARPARKS);
  const [showAddSpotModal, setShowAddSpotModal] = useState<boolean>(false);
  const [showVehicleSettings, setShowVehicleSettings] = useState<boolean>(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);
  const [alertActive, setAlertActive] = useState<boolean>(false);
  const [optimizationGoal, setOptimizationGoal] = useState<'walk' | 'rate' | 'vacancy'>('walk');
  const [routeReserved, setRouteReserved] = useState<boolean>(false);

  // Form states for Add Spot
  const [newSpotName, setNewSpotName] = useState('');
  const [newSpotTag, setNewSpotTag] = useState('Office Spot');
  const [newSpotLocation, setNewSpotLocation] = useState('');
  const [newSpotRate, setNewSpotRate] = useState('$2.40 / hr');

  const handleAddSpot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpotName) return;

    const newSpot: SavedCarparkItem = {
      id: `saved-${Date.now()}`,
      tag: newSpotTag,
      location: newSpotLocation || 'Central Area',
      name: newSpotName,
      code: `SP-${Math.floor(100 + Math.random() * 900)}`,
      distance: '1.0 km away',
      availableLots: Math.floor(20 + Math.random() * 120),
      totalLots: 250,
      statusBadge: 'Lots Available',
      statusColor: 'green',
      rate: newSpotRate
    };

    setSavedCarparks([newSpot, ...savedCarparks]);
    setShowAddSpotModal(false);
    setNewSpotName('');
    setNewSpotLocation('');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-[1440px] mx-auto flex flex-col gap-8">
        {/* Top Identity & Telemetry Bar */}
        <div className="w-full bg-white rounded-xl p-6 shadow-xs border border-[#eff4ff] flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-96 h-96 bg-[#dce9ff] rounded-full blur-3xl opacity-40 pointer-events-none"></div>

          {/* User Profile Snapshot */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative shrink-0">
              <img
                alt="Leonard profile avatar"
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-full object-cover shadow-md ring-4 ring-[#eff4ff]"
                src={APP_ASSETS.profileAvatar}
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 bg-[#006c49] rounded-full flex items-center justify-center text-white shadow-xs">
                <span className="material-symbols-outlined text-[13px]">bolt</span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-headline-lg text-headline-lg text-[#0b1c30] tracking-tight font-extrabold">
                  Welcome back, Leonard
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e5eeff] text-[#45464d] font-label-sm text-label-sm font-bold">
                  CBD Frequent Pass
                </span>
              </div>
              <p className="font-body-md text-body-md text-[#45464d]">
                Live telemetry synched with LTA GovTech Open Data gateway • 4 active smart monitors
              </p>
            </div>
          </div>

          {/* Linked Vehicle & In-Vehicle Unit (IU) */}
          <div className="flex items-center gap-3.5 p-3.5 bg-[#eff4ff] rounded-xl relative z-10 shrink-0 border border-[#c6c6cd]/30">
            <div className="w-12 h-12 rounded-lg bg-[#d3e4fe] flex items-center justify-center text-black">
              <span className="material-symbols-outlined text-2xl">directions_car</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                  Mercedes-Benz C200
                </span>
                <span className="font-label-md text-label-md bg-black text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  SGX 4821 K
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
                <span className="font-label-sm text-label-sm text-[#006c49] font-semibold">
                  IU 19482012 Paired (LTA EPS Live Sync)
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowVehicleSettings(true)}
              aria-label="Vehicle Settings"
              className="ml-2 p-1.5 text-[#45464d] hover:text-[#0b1c30] hover:bg-white rounded-lg transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined">settings_suggest</span>
            </button>
          </div>
        </div>

        {/* Monthly Efficiency & Analytics Strip */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-xs border border-[#eff4ff] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-[#45464d] uppercase tracking-wider font-semibold">
                Trips Completed
              </span>
              <span className="material-symbols-outlined text-[#131b2e]">route</span>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="font-headline-xl text-headline-xl text-[#0b1c30] font-extrabold">14</span>
              <span className="font-label-sm text-label-sm text-[#006c49] font-semibold">+3 this week</span>
            </div>
            <span className="font-body-sm text-body-sm text-[#45464d] mt-1">
              Downtown &amp; Marina Bay journeys
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-xs border border-[#eff4ff] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-[#45464d] uppercase tracking-wider font-semibold">
                Circling Time Saved
              </span>
              <span className="material-symbols-outlined text-[#006c49]">hourglass_disabled</span>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-headline-xl text-headline-xl text-[#0b1c30] font-extrabold">4.2</span>
              <span className="font-headline-sm text-headline-sm text-[#0b1c30]">hrs</span>
              <span className="font-label-sm text-label-sm text-[#006c49] font-semibold ml-1">~18 mins/trip</span>
            </div>
            <span className="font-body-sm text-body-sm text-[#45464d] mt-1">
              Zero idle queue time logged
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-xs border border-[#eff4ff] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-[#45464d] uppercase tracking-wider font-semibold">
                ERP &amp; Rate Savings
              </span>
              <span className="material-symbols-outlined text-[#497cff]">savings</span>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="font-headline-xl text-headline-xl text-[#0b1c30] font-extrabold">$28.00</span>
              <span className="font-label-sm text-label-sm text-[#497cff] font-semibold">Off-peak cuts</span>
            </div>
            <span className="font-body-sm text-body-sm text-[#45464d] mt-1">
              Via automated smart rate routing
            </span>
          </div>

          <div className="bg-[#131b2e] text-white p-5 rounded-xl shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#d3e4fe]/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between text-[#dce9ff]">
              <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">
                Predictive Guard
              </span>
              <span className="material-symbols-outlined text-[#6ffbbe]">verified_user</span>
            </div>
            <div className="mt-3">
              <span className="font-headline-md text-headline-md text-white font-bold">
                Optimal Routes
              </span>
              <p className="font-body-sm text-body-sm text-[#dce9ff] mt-0.5">
                Automated vacancy fallbacks active for CBD afternoon peaks
              </p>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#6ffbbe] animate-ping"></span>
              <span className="font-label-sm text-label-sm text-[#6ffbbe]">Telemetry syncing every 30s</span>
            </div>
          </div>
        </div>

        {/* Main Dynamic Section: Saved Lots & Smart Planner Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Saved Frequent Carparks (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-black">bookmark_manager</span>
                <h2 className="font-headline-md text-headline-md text-[#0b1c30] font-bold">
                  Saved Frequent Carparks
                </h2>
              </div>
              <button
                onClick={() => setShowAddSpotModal(true)}
                className="font-label-md text-label-md text-[#0b1c30] bg-[#e5eeff] px-3.5 py-1.5 rounded-lg hover:bg-[#dce9ff] transition-colors flex items-center gap-1 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add Spot
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {savedCarparks.map((spot) => (
                <div
                  key={spot.id}
                  className="bg-white p-5 rounded-xl shadow-xs hover:shadow-md transition-shadow flex flex-col gap-3.5 border border-[#eff4ff]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center shrink-0 text-[#0b1c30]">
                        <span className="material-symbols-outlined">
                          {spot.tag.includes('Office')
                            ? 'corporate_fare'
                            : spot.tag.includes('Weekend')
                            ? 'shopping_bag'
                            : spot.tag.includes('Hawker')
                            ? 'restaurant'
                            : 'fitness_center'}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-label-sm text-label-sm bg-[#dce9ff] text-[#0b1c30] px-1.5 py-0.5 rounded font-bold uppercase">
                            {spot.tag}
                          </span>
                          <span className="font-body-sm text-body-sm text-[#45464d]">
                            • {spot.location}
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-[#0b1c30] mt-0.5 font-bold">
                          {spot.name}
                        </h3>
                        <p className="font-body-sm text-body-sm text-[#45464d]">
                          LTA EPS ID: {spot.code} • {spot.distance}
                        </p>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div
                      className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full ${
                        spot.statusColor === 'red'
                          ? 'bg-[#ffdad6] text-[#93000a]'
                          : spot.statusColor === 'amber'
                          ? 'bg-[#dce9ff] text-[#0b1c30]'
                          : 'bg-[#6cf8bb]/40 text-[#006c49]'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          spot.statusColor === 'red'
                            ? 'bg-[#ba1a1a] animate-pulse'
                            : spot.statusColor === 'amber'
                            ? 'bg-[#76777d]'
                            : 'bg-[#006c49]'
                        }`}
                      ></span>
                      <span className="font-headline-sm text-headline-sm font-bold">
                        {spot.availableLots}
                      </span>
                      <span className="font-label-sm text-label-sm uppercase font-semibold">
                        {spot.statusBadge.replace(/^\d+\s*/, '')}
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Reroute Alert if present */}
                  {spot.reroute && (
                    <div className="bg-[#eff4ff] p-3 rounded-lg flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-[#0b1c30]">
                        <span className="material-symbols-outlined text-[#006c49]">alt_route</span>
                        <span className="font-body-sm text-body-sm">
                          <strong className="font-label-md">Dynamic Reroute:</strong> Suggest parking at{' '}
                          <strong>{spot.reroute.name}</strong> ({spot.reroute.vacantLots} lots vacant, {spot.reroute.walkMins} mins walk)
                        </span>
                      </div>
                      <button
                        onClick={() => alert(`Rerouting navigation to ${spot.reroute?.name}`)}
                        className="shrink-0 bg-black text-white font-label-sm text-label-sm px-3 py-1.5 rounded hover:bg-[#131b2e] transition-colors cursor-pointer"
                      >
                        Reroute
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-body-sm text-body-sm text-[#45464d]">
                      Current Rate: <strong>{spot.rate}</strong>
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => alert(`Alert active for ${spot.name}: You will be notified when vacancy falls below 15 lots.`)}
                        className="font-label-md text-label-md text-[#0b1c30] flex items-center gap-1 hover:text-[#45464d] cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">notifications_active</span> Alert Me
                      </button>
                      <button
                        onClick={() => alert(`Initiating direct navigation to ${spot.name}`)}
                        className="font-label-md text-label-md text-white bg-black px-3.5 py-1.5 rounded-lg flex items-center gap-1 hover:bg-[#213145] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">near_me</span> Direct
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Smart Parking Route Planner Tool (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-black">route</span>
              <h2 className="font-headline-md text-headline-md text-[#0b1c30] font-bold">
                Smart Route Planner
              </h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-xs border border-[#eff4ff] flex flex-col gap-4">
              <form className="flex flex-col gap-3.5" onSubmit={(e) => e.preventDefault()}>
                {/* Destination Input */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-[#0b1c30] font-semibold flex items-center justify-between">
                    <span>Destination in Singapore</span>
                    <span className="text-[#45464d] font-normal font-body-sm">CBD / Downtown</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#76777d] pointer-events-none">
                      pin_drop
                    </span>
                    <input
                      className="w-full h-11 pl-10 pr-4 bg-[#eff4ff] rounded-lg font-body-md text-body-md text-[#0b1c30] focus:outline-none focus:bg-white focus:ring-2 focus:ring-black transition-all"
                      type="text"
                      defaultValue="One Raffles Place, CBD"
                    />
                  </div>
                </div>

                {/* Arrival Time & Duration */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-label-md text-[#0b1c30] font-semibold">Arrival Time</label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-2.5 text-[#76777d] pointer-events-none text-base">
                        schedule
                      </span>
                      <input
                        className="w-full h-10 pl-8 pr-2 bg-[#eff4ff] rounded-lg font-body-md text-body-md text-[#0b1c30] focus:outline-none"
                        type="text"
                        defaultValue="Today, 1:15 PM"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-label-md text-[#0b1c30] font-semibold">Duration</label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-2.5 text-[#76777d] pointer-events-none text-base">
                        timelapse
                      </span>
                      <select className="w-full h-10 pl-8 pr-4 bg-[#eff4ff] rounded-lg font-body-md text-body-md text-[#0b1c30] focus:outline-none appearance-none cursor-pointer">
                        <option>1 Hour</option>
                        <option value="2" selected>2 Hours</option>
                        <option>3 Hours</option>
                        <option>Full Day (8 hrs)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Priority Optimization Goal */}
                <div className="flex flex-col gap-1 pt-1">
                  <label className="font-label-md text-label-md text-[#0b1c30] font-semibold">
                    Priority Optimization Goal
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-[#eff4ff] p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setOptimizationGoal('walk')}
                      className={`py-1.5 px-1 text-center rounded font-label-sm text-label-sm transition-all cursor-pointer ${
                        optimizationGoal === 'walk'
                          ? 'bg-white text-[#0b1c30] shadow-xs font-bold'
                          : 'text-[#45464d] hover:text-[#0b1c30]'
                      }`}
                    >
                      Shortest Walk
                    </button>
                    <button
                      type="button"
                      onClick={() => setOptimizationGoal('rate')}
                      className={`py-1.5 px-1 text-center rounded font-label-sm text-label-sm transition-all cursor-pointer ${
                        optimizationGoal === 'rate'
                          ? 'bg-white text-[#0b1c30] shadow-xs font-bold'
                          : 'text-[#45464d] hover:text-[#0b1c30]'
                      }`}
                    >
                      Cheapest Rate
                    </button>
                    <button
                      type="button"
                      onClick={() => setOptimizationGoal('vacancy')}
                      className={`py-1.5 px-1 text-center rounded font-label-sm text-label-sm transition-all cursor-pointer ${
                        optimizationGoal === 'vacancy'
                          ? 'bg-white text-[#0b1c30] shadow-xs font-bold'
                          : 'text-[#45464d] hover:text-[#0b1c30]'
                      }`}
                    >
                      High Vacancy
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRouteReserved(true)}
                  className="w-full h-11 bg-black text-white rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-[#213145] transition-colors mt-1 shadow-xs cursor-pointer font-bold"
                >
                  <span className="material-symbols-outlined text-lg">calculate</span>
                  Optimize Carpark &amp; Reserve Route
                </button>
              </form>

              {/* Result Highlight Card */}
              <div className="bg-[#eff4ff] rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden border border-[#dce9ff]">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm bg-[#6cf8bb] text-[#00714d] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">stars</span> Recommended Lot
                  </span>
                  <span className="font-label-sm text-label-sm text-[#006c49] font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#006c49]"></span> 88 Vacant Lots
                  </span>
                </div>

                <div>
                  <h4 className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                    Capital Tower Basement 2
                  </h4>
                  <p className="font-body-sm text-body-sm text-[#45464d] mt-0.5">
                    168 Robinson Road • Sheltered Walkway direct to One Raffles Place
                  </p>
                </div>

                {/* Key Metric Micro-Bento */}
                <div className="grid grid-cols-3 gap-1 bg-white p-2.5 rounded-lg border border-[#e5eeff]">
                  <div className="flex flex-col items-center justify-center p-1 text-center">
                    <span className="font-body-sm text-[11px] text-[#45464d]">Walking</span>
                    <span className="font-label-lg text-label-lg font-bold text-[#0b1c30]">3 mins</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-1 text-center border-x border-[#eff4ff]">
                    <span className="font-body-sm text-[11px] text-[#45464d]">Est. Cost</span>
                    <span className="font-label-lg text-label-lg font-bold text-[#0b1c30]">$7.00</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-1 text-center">
                    <span className="font-body-sm text-[11px] text-[#45464d]">Reliability</span>
                    <span className="font-label-lg text-label-lg font-bold text-[#006c49]">98% High</span>
                  </div>
                </div>

                {/* Direct Actions */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => alert('Starting GPS turn-by-turn navigation to Capital Tower Basement 2!')}
                    className="w-full h-11 bg-black text-white rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-[#213145] transition-colors shadow-xs cursor-pointer font-bold"
                  >
                    <span className="material-symbols-outlined">navigation</span>
                    Start Direct Navigation
                  </button>

                  <button
                    type="button"
                    onClick={() => setAlertActive(!alertActive)}
                    className="w-full h-10 bg-white text-[#0b1c30] hover:bg-[#e5eeff] rounded-lg font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#c6c6cd]/50"
                  >
                    <span className="material-symbols-outlined text-base">notification_add</span>
                    {alertActive ? 'Alert Activated ✓' : 'Set Critical Availability Alert (<10 Lots)'}
                  </button>

                  {alertActive && (
                    <div className="p-2.5 bg-[#6cf8bb]/30 text-[#00714d] rounded-lg font-body-sm text-body-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#006c49] text-base">check_circle</span>
                      <span>Active: SMS alert will trigger to +65 9182 **** if lots fall below 10.</span>
                    </div>
                  )}

                  {routeReserved && (
                    <div className="p-2.5 bg-[#dce9ff] text-[#0b1c30] rounded-lg font-body-sm text-body-sm flex items-center justify-between">
                      <span className="font-semibold">✓ Route reservation token synced to IU 19482012</span>
                      <button onClick={() => setRouteReserved(false)} className="text-xs underline">Dismiss</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Congestion Watch Banner */}
            <div className="bg-white p-4 rounded-xl shadow-xs border border-[#eff4ff] flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center shrink-0 text-[#0b1c30]">
                <span className="material-symbols-outlined text-base">info</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-label-md text-label-md text-[#0b1c30] font-bold">
                  LTA Congestion Watch: Shenton Way
                </span>
                <p className="font-body-sm text-body-sm text-[#45464d]">
                  ERP gantry surcharge of $2.00 in effect from 1:00 PM - 2:00 PM for inbound financial district routes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Parking History & Commuter Trip Timeline */}
        <div className="w-full bg-white rounded-xl p-6 shadow-xs border border-[#eff4ff] flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-headline-md text-headline-md text-[#0b1c30] font-bold">
                Recent Parking History &amp; Validations
              </h3>
              <p className="font-body-md text-body-md text-[#45464d]">
                Verified transactions automatically audited against LTA ERP &amp; URA e-Receipts
              </p>
            </div>
            <button
              onClick={() => setShowInvoiceModal(true)}
              className="font-label-md text-label-md text-[#0b1c30] bg-[#eff4ff] px-4 py-2 rounded-lg hover:bg-[#dce9ff] transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer font-semibold"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Export Tax Invoice
            </button>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr className="text-[#45464d] font-label-md text-label-md uppercase tracking-wider bg-[#eff4ff] rounded-lg">
                  <th className="py-3 px-4 rounded-l-lg">Carpark Location</th>
                  <th className="py-3 px-4">Date &amp; Time</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Payment / EPS</th>
                  <th className="py-3 px-4">Rate Saved</th>
                  <th className="py-3 px-4 rounded-r-lg text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff4ff]">
                {PARKING_HISTORY.map((item) => (
                  <tr key={item.id} className="hover:bg-[#eff4ff]/50 transition-colors">
                    <td className="py-3 px-4 font-label-lg text-label-lg text-[#0b1c30] flex items-center gap-2">
                      <span className="material-symbols-outlined text-black text-base">local_parking</span>
                      {item.location}
                    </td>
                    <td className="py-3 px-4 text-[#45464d]">{item.dateTime}</td>
                    <td className="py-3 px-4 text-[#0b1c30] font-semibold">{item.duration}</td>
                    <td className="py-3 px-4 text-[#0b1c30]">{item.paymentMethod}</td>
                    <td className="py-3 px-4 text-[#006c49] font-semibold">{item.rateSaved}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#00714d] font-label-sm text-label-sm font-bold">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Spot Modal */}
      {showAddSpotModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c6c6cd]/50 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowAddSpotModal(false)}
              className="absolute top-4 right-4 text-[#76777d] hover:text-black p-1"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="font-headline-md text-headline-md font-bold text-[#0b1c30] mb-2">
              Add Frequent Spot
            </h3>
            <p className="font-body-sm text-[#45464d] mb-4">
              Pin a carpark to your daily telemetry monitor for automated queue diversion alerts.
            </p>

            <form onSubmit={handleAddSpot} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#0b1c30] mb-1">Carpark Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marina One West Tower"
                  value={newSpotName}
                  onChange={(e) => setNewSpotName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#c6c6cd] rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0b1c30] mb-1">Spot Tag</label>
                <select
                  value={newSpotTag}
                  onChange={(e) => setNewSpotTag(e.target.value)}
                  className="w-full px-3 py-2 border border-[#c6c6cd] rounded-lg text-sm bg-white"
                >
                  <option>Office Spot</option>
                  <option>Weekend Family</option>
                  <option>Hawker Lunch Spot</option>
                  <option>Gym / Evening</option>
                  <option>Client Meeting Hub</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0b1c30] mb-1">Location Road / Landmark</label>
                <input
                  type="text"
                  placeholder="e.g. 7 Straits View"
                  value={newSpotLocation}
                  onChange={(e) => setNewSpotLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-[#c6c6cd] rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0b1c30] mb-1">Typical Rate Structure</label>
                <input
                  type="text"
                  value={newSpotRate}
                  onChange={(e) => setNewSpotRate(e.target.value)}
                  className="w-full px-3 py-2 border border-[#c6c6cd] rounded-lg text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSpotModal(false)}
                  className="px-4 py-2 border border-[#c6c6cd] rounded-lg text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-slate-800"
                >
                  Save Carpark
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Vehicle Settings Modal */}
      {showVehicleSettings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c6c6cd]/50 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowVehicleSettings(false)}
              className="absolute top-4 right-4 text-[#76777d] hover:text-black p-1"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="font-headline-md text-headline-md font-bold text-[#0b1c30] mb-1">
              Vehicle &amp; IU Configuration
            </h3>
            <p className="font-body-sm text-[#45464d] mb-4">
              Synced with Land Transport Authority (LTA) Electronic Parking System (EPS).
            </p>

            <div className="space-y-3 bg-[#eff4ff] p-4 rounded-xl text-sm">
              <div className="flex justify-between py-1 border-b border-[#dce9ff]">
                <span className="text-[#45464d]">Make &amp; Model</span>
                <strong className="text-[#0b1c30]">Mercedes-Benz C200</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#dce9ff]">
                <span className="text-[#45464d]">License Plate</span>
                <span className="bg-black text-white px-2 py-0.5 rounded font-mono font-bold text-xs">
                  SGX 4821 K
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#dce9ff]">
                <span className="text-[#45464d]">On-Board Unit (OBU / IU)</span>
                <strong className="text-[#0b1c30]">19482012</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#45464d]">Payment Gateway</span>
                <span className="text-[#006c49] font-bold">NETS Motoring / EZ-Link ERP Sync</span>
              </div>
            </div>

            <div className="mt-4 pt-3 flex justify-end">
              <button
                onClick={() => setShowVehicleSettings(false)}
                className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold hover:bg-slate-800"
              >
                Close Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tax Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#c6c6cd]/50 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowInvoiceModal(false)}
              className="absolute top-4 right-4 text-[#76777d] hover:text-black p-1"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-2xl text-[#006c49]">receipt_long</span>
              <h3 className="font-headline-md text-headline-md font-bold text-[#0b1c30]">
                Monthly Commuter Tax Statement
              </h3>
            </div>
            <p className="font-body-sm text-[#45464d] mb-4">
              IRAS Compliant E-Receipt for Singapore Commercial Parking Expenses.
            </p>

            <div className="border border-[#c6c6cd]/60 rounded-xl p-4 space-y-3 font-mono text-xs bg-[#f8f9ff]">
              <div className="flex justify-between border-b pb-2">
                <span>TAXPAYER: Leonard Tan</span>
                <span>GST REG: 202519482M</span>
              </div>
              <div className="flex justify-between">
                <span>Marina One East Tower (Oct 16)</span>
                <span>$14.20</span>
              </div>
              <div className="flex justify-between">
                <span>Maxwell Food Centre (Oct 14)</span>
                <span>$2.40</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>VivoCity Basement 2 (Oct 12)</span>
                <span>$3.20</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-black">
                <span>TOTAL EXPENSED (SGD):</span>
                <span>$19.80</span>
              </div>
            </div>

            <div className="mt-4 pt-3 flex justify-between items-center">
              <span className="text-xs text-[#006c49] font-bold">✓ Signed with LTA GovTech Hash</span>
              <button
                onClick={() => {
                  alert('Tax invoice PDF downloaded.');
                  setShowInvoiceModal(false);
                }}
                className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold hover:bg-slate-800 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
