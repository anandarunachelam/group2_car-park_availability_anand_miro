import React, { useState } from 'react';
import { HOTSPOT_ZONES, WALK_ALTERNATIVES, HISTORICAL_HOURLY_DATA, APP_ASSETS } from '../data/mockData';

export const DowntownHotspotsScreen: React.FC = () => {
  const [sliderVal, setSliderVal] = useState<number>(12.5);
  const [alertActive, setAlertActive] = useState<boolean>(false);
  const [reroutedItem, setReroutedItem] = useState<string | null>(null);

  // Time conversion helper
  const getTimeString = (val: number) => {
    const hours = Math.floor(val);
    const minutes = val % 1 === 0.5 ? '30' : '00';
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    const formattedHours = displayHours < 10 ? `0${displayHours}` : `${displayHours}`;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const getTimeLabelAndNotice = (val: number) => {
    if (val >= 8 && val < 10.5) {
      return {
        surgeLabel: 'Morning Inflow Crunch',
        badge: 'High Influx',
        notice: 'Office check-in peaks: Shenton Way and MBFC lots experiencing highest inward velocity'
      };
    } else if (val >= 11.5 && val <= 14) {
      return {
        surgeLabel: 'Lunch Rush Surge',
        badge: 'Peak Volatility',
        notice: 'High lot turnover at Marina Bay Sands & Tanjong Pagar dining perimeter'
      };
    } else if (val >= 17.5 && val <= 19.5) {
      return {
        surgeLabel: 'Evening Outflow & Dining Peak',
        badge: 'Transit Volatility',
        notice: 'ERP Gantry rates transitioning; high volume diverting to Orchard and Bugis'
      };
    } else {
      return {
        surgeLabel: 'Steady State Off-Peak',
        badge: 'Nominal Flow',
        notice: 'Moderate availability across major high-rise office towers'
      };
    }
  };

  const { surgeLabel, badge, notice } = getTimeLabelAndNotice(sliderVal);
  const currentTimeDisplay = `${getTimeString(sliderVal)} • ${surgeLabel}`;

  const setPreset = (val: number) => {
    setSliderVal(val);
  };

  // Dynamically calculate zone occupancy modifier based on simulated hour
  const getZoneDynamicData = (zoneId: string, baseOccupancy: number, baseWait: number) => {
    let multiplier = 1;
    if (sliderVal >= 11.5 && sliderVal <= 14) {
      multiplier = 1.08; // Lunch rush peak
    } else if (sliderVal >= 8 && sliderVal <= 10) {
      multiplier = 0.95; // Morning
    } else if (sliderVal >= 17 && sliderVal <= 19) {
      multiplier = 0.98; // Evening
    } else {
      multiplier = 0.85; // Off peak
    }

    const occupancy = Math.min(Math.round(baseOccupancy * multiplier), 98);
    const wait = Math.max(Math.round(baseWait * multiplier), 1);
    return { occupancy, wait };
  };

  return (
    <div className="flex flex-col w-full">
      {/* Reroute Modal */}
      {reroutedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c6c6cd]/50 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-[#6cf8bb]/40 text-[#006c49] flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-2xl">alt_route</span>
            </div>
            <h3 className="font-headline-md text-headline-md font-bold text-[#0b1c30]">
              Autonomous Reroute Confirmed
            </h3>
            <p className="font-body-sm text-[#45464d] mt-1 mb-4">
              Diverting from congested destination to <strong className="text-black">{reroutedItem}</strong>.
            </p>
            <div className="bg-[#eff4ff] p-3 rounded-lg text-xs space-y-1 mb-4">
              <div className="flex justify-between">
                <span>Time Saved:</span>
                <strong className="text-[#006c49]">~15-22 mins avoided circling</strong>
              </div>
              <div className="flex justify-between">
                <span>Walking Link:</span>
                <span className="text-[#0b1c30]">Direct Sheltered Underground Network</span>
              </div>
            </div>
            <button
              onClick={() => setReroutedItem(null)}
              className="w-full py-2.5 bg-black text-white rounded-lg font-bold text-sm hover:bg-slate-800"
            >
              Continue with Route
            </button>
          </div>
        </div>
      )}

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-[1440px] mx-auto flex flex-col gap-8">
        {/* Top Sub-Header & Live Metric Stream */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-3xl">
            <div className="flex items-center gap-2 text-[#006c49] font-label-sm uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#006c49] animate-ping"></span>
              <span className="font-headline-sm text-label-sm">
                Municipal Mobility Intelligence Engine • GovTech LTA-URA Stream
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-[#0b1c30] tracking-tight font-extrabold">
              Downtown CBD Parking Demand Predictor &amp; Rush Hour Forecaster
            </h1>
            <p className="font-body-md text-body-md text-[#45464d]">
              Time is precious in Singapore's financial core. Real-time sensor aggregation detects high-congestion zones to eliminate circling time and reduce carbon emissions.
            </p>
          </div>

          {/* Quick Telemetry Chips */}
          <div className="flex items-center gap-4 shrink-0 flex-wrap">
            <div className="bg-[#dce9ff] px-4 py-3 rounded-xl shadow-xs flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg text-black">
                <span className="material-symbols-outlined text-xl">timer</span>
              </div>
              <div>
                <div className="font-label-sm text-label-sm text-[#45464d] uppercase font-semibold">
                  Downtown Avg Circling
                </div>
                <div className="font-metric-display text-metric-display text-[#0b1c30] font-bold">
                  14.6 <span className="font-body-sm text-body-sm font-normal text-[#45464d]">mins</span>
                </div>
              </div>
            </div>

            <div className="bg-[#dce9ff] px-4 py-3 rounded-xl shadow-xs flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg text-[#ba1a1a]">
                <span className="material-symbols-outlined text-xl">local_fire_department</span>
              </div>
              <div>
                <div className="font-label-sm text-label-sm text-[#45464d] uppercase font-semibold">
                  Critical Congestion
                </div>
                <div className="font-metric-display text-metric-display text-[#ba1a1a] font-bold">
                  3 Zones
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Time-of-Day Simulator Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#eff4ff] flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00174b] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">schedule</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wide text-[#45464d] font-bold">
                  Simulated Horizon
                </span>
                <div className="font-headline-md text-headline-md text-[#0b1c30] flex items-center gap-2 flex-wrap">
                  <span>{currentTimeDisplay}</span>
                  <span className="bg-[#ffdad6] text-[#93000a] font-label-sm text-label-sm px-2.5 py-0.5 rounded-full uppercase font-bold">
                    {badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-xl">
              <button
                onClick={() => setPreset(8.5)}
                className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                  sliderVal >= 8 && sliderVal <= 10
                    ? 'bg-black text-white shadow-xs font-bold'
                    : 'text-[#45464d] hover:text-[#0b1c30]'
                }`}
              >
                Morning Peak (8–10 AM)
              </button>
              <button
                onClick={() => setPreset(12.5)}
                className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                  sliderVal > 10 && sliderVal <= 14
                    ? 'bg-black text-white shadow-xs font-bold'
                    : 'text-[#45464d] hover:text-[#0b1c30]'
                }`}
              >
                Lunch Rush (12–2 PM)
              </button>
              <button
                onClick={() => setPreset(18.5)}
                className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                  sliderVal > 14
                    ? 'bg-black text-white shadow-xs font-bold'
                    : 'text-[#45464d] hover:text-[#0b1c30]'
                }`}
              >
                Evening Peak (6–8 PM)
              </button>
            </div>
          </div>

          {/* Scrubber Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center font-label-sm text-label-sm text-[#45464d] font-bold">
              <span>08:00 AM (CBD Inflow)</span>
              <span>11:00 AM</span>
              <span className="text-[#ba1a1a] font-extrabold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-pulse"></span>
                12:30 PM (Midday Dining)
              </span>
              <span>03:30 PM</span>
              <span>06:00 PM (ERP Gantry Lift)</span>
              <span>08:00 PM</span>
            </div>

            <div className="relative w-full flex items-center py-2">
              <input
                type="range"
                min="8"
                max="20"
                step="0.5"
                value={sliderVal}
                onChange={(e) => setSliderVal(parseFloat(e.target.value))}
                className="w-full h-3 bg-[#e5eeff] rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>

            <div className="flex items-center justify-between text-[#45464d] font-body-sm text-body-sm">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">history</span>
                Historical Baseline Model (Past 90 Days)
              </span>
              <span className="text-[#006c49] font-label-sm text-label-sm font-semibold">
                {notice}
              </span>
            </div>
          </div>
        </div>

        {/* CBD Zones Grid: Immediate Status & Wait Times */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-[#0b1c30] font-extrabold tracking-tight">
                Key Downtown Hotspots • Live Capacity
              </h2>
              <p className="font-body-md text-body-md text-[#45464d]">
                Live municipal telemetry across 6 primary commercial and retail precincts.
              </p>
            </div>
            <div className="flex items-center gap-4 font-label-sm text-label-sm">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006c49]"></span>
                <span>&lt;60% Vacant</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#565e74]"></span>
                <span>60-85% Tight</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
                <span>&gt;85% Critical</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {HOTSPOT_ZONES.map((zone) => {
              const { occupancy, wait } = getZoneDynamicData(zone.id, zone.occupancyPct, zone.avgWaitMins);
              const isCritical = occupancy > 85;
              const isTight = occupancy >= 60 && occupancy <= 85;

              return (
                <div
                  key={zone.id}
                  className="bg-white rounded-xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 border border-[#eff4ff]"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={`font-label-sm text-label-sm uppercase tracking-wider font-bold ${
                          isCritical ? 'text-[#ba1a1a]' : 'text-[#45464d]'
                        }`}>
                          Zone {zone.zoneNumber} • {zone.category}
                        </span>
                        <h3 className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                          {zone.name}
                        </h3>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold shrink-0 ${
                        isCritical
                          ? 'bg-[#ffdad6] text-[#93000a]'
                          : isTight
                          ? 'bg-[#dce9ff] text-[#0b1c30]'
                          : 'bg-[#6cf8bb]/40 text-[#006c49]'
                      }`}>
                        {occupancy}% Occupancy
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-[#45464d]">
                      {zone.description}
                    </p>
                  </div>

                  {/* Capacity Bar */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between font-label-sm text-label-sm text-[#0b1c30] font-semibold">
                      <span>Lot Saturation</span>
                      <span className={isCritical ? 'text-[#ba1a1a] font-bold' : isTight ? 'text-[#565e74]' : 'text-[#006c49] font-bold'}>
                        {isCritical ? 'Severe Bottleneck' : isTight ? 'Tight Occupancy' : 'Flow Steady'}
                      </span>
                    </div>
                    <div className="w-full bg-[#e5eeff] rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isCritical ? 'bg-[#ba1a1a]' : isTight ? 'bg-[#565e74]' : 'bg-[#006c49]'
                        }`}
                        style={{ width: `${occupancy}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Advisory notice if critical */}
                  {zone.advisory && (
                    <div className="bg-[#ffdad6]/40 p-2 rounded-lg flex items-center gap-1.5 text-[#93000a] font-label-sm text-label-sm font-semibold">
                      <span className="material-symbols-outlined text-base">alt_route</span>
                      <span>{zone.advisory}</span>
                    </div>
                  )}

                  {/* Stat footer */}
                  <div className="bg-[#eff4ff] rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#76777d]">hourglass_top</span>
                      <div>
                        <div className="font-label-sm text-label-sm text-[#45464d]">Avg Wait / Queue</div>
                        <div className={`font-headline-sm text-headline-sm font-bold ${
                          isCritical ? 'text-[#ba1a1a]' : 'text-[#0b1c30]'
                        }`}>
                          {wait} mins
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-label-sm text-label-sm text-[#45464d]">Available Lots</div>
                      <div className={`font-headline-sm text-headline-sm font-extrabold ${
                        isCritical ? 'text-[#ba1a1a]' : 'text-[#006c49]'
                      }`}>
                        {zone.highlightedLotsText}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Smart Recommendation Engine Section: Walk Alternatives */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#eff4ff] flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#6cf8bb] text-[#00714d] rounded-xl">
                <span className="material-symbols-outlined text-2xl">swap_calls</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm uppercase font-bold text-[#006c49]">
                    Efficiency Engine
                  </span>
                  <span className="bg-[#006c49] text-white font-label-sm text-label-sm px-2 py-0.5 rounded uppercase">
                    Time-Saver Verified
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-[#0b1c30] font-bold">
                  Recommended Alternatives within 5-min Walk
                </h2>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-[#45464d] max-w-md">
              Drivers waste an average of 18 minutes circling high-profile CBD landmarks. Diverting 200m away reduces overall journey duration and parking fees.
            </p>
          </div>

          {/* Comparison Matrix Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse font-body-md text-sm">
              <thead>
                <tr className="bg-[#eff4ff] text-[#45464d] font-label-md text-label-md uppercase tracking-wider">
                  <th className="py-3 px-4 rounded-l-lg">Primary Destination (Congested)</th>
                  <th className="py-3 px-4">Recommended Smart Alternative</th>
                  <th className="py-3 px-4">Walking Distance</th>
                  <th className="py-3 px-4">Hourly Price Delta</th>
                  <th className="py-3 px-4">Time Saved Circling</th>
                  <th className="py-3 px-4 text-right rounded-r-lg">Direct Navigation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff4ff]">
                {WALK_ALTERNATIVES.map((alt, idx) => (
                  <tr key={idx} className="hover:bg-[#f8f9ff] transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-headline-sm text-headline-sm font-bold text-[#0b1c30]">
                        {alt.congestedName}
                      </div>
                      <div className="flex items-center gap-1 font-label-sm text-label-sm text-[#ba1a1a]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
                        {alt.congestedInfo}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-headline-sm text-headline-sm font-bold text-[#006c49] flex items-center gap-1">
                        {alt.alternativeName}
                        <span className="material-symbols-outlined text-sm text-[#006c49]">verified</span>
                      </div>
                      <div className="font-body-sm text-body-sm text-[#45464d]">
                        {alt.alternativeDetails}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 font-label-md text-label-md font-semibold text-[#0b1c30]">
                        <span className="material-symbols-outlined text-base text-[#76777d]">directions_walk</span>
                        {alt.walkDistance}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-[#6cf8bb]/40 text-[#006c49] font-label-sm text-label-sm px-2.5 py-1 rounded-md font-bold">
                        {alt.priceDelta}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-headline-sm text-headline-sm font-extrabold text-[#006c49]">
                        {alt.timeSaved}
                      </div>
                      <div className="font-label-sm text-label-sm text-[#45464d]">
                        {alt.timeSavedNote}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setReroutedItem(alt.alternativeName)}
                        className="bg-black text-white hover:bg-slate-800 px-3.5 py-2 rounded-lg font-label-md text-label-md font-bold shadow-xs transition-transform active:scale-95 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Reroute</span>
                        <span className="material-symbols-outlined text-base">near_me</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Analytics: Historical Bar Graph & Instant Threshold Alert */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Historical Graph (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-[#eff4ff] flex flex-col justify-between gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <div className="font-label-sm text-label-sm uppercase font-bold text-[#45464d]">
                  Downtown Core Aggregate
                </div>
                <h3 className="font-headline-md text-headline-md text-[#0b1c30] font-extrabold">
                  Historical Lot Vacancy Distribution (08:00 – 20:00)
                </h3>
              </div>
              <div className="flex items-center gap-4 text-label-sm font-label-sm">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-[#006c49]"></span>
                  Safe Vacancy (&gt;25%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-[#ba1a1a]"></span>
                  Critical Pinch (&lt;15%)
                </span>
              </div>
            </div>

            {/* Interactive SVG / Bar Graph */}
            <div className="w-full h-56 flex items-end justify-between gap-2 pt-6 pb-2 px-2 bg-[#eff4ff] rounded-xl">
              {HISTORICAL_HOURLY_DATA.map((item) => {
                const isCritical = item.status === 'critical';
                const isTight = item.status === 'tight';

                return (
                  <div key={item.hour} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="font-label-sm text-[11px] text-[#0b1c30] opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.vacancyPct}%
                    </span>
                    <div
                      className={`w-full rounded-t-md transition-all group-hover:brightness-110 ${
                        isCritical ? 'bg-[#ba1a1a]' : isTight ? 'bg-[#565e74]' : 'bg-[#006c49]'
                      }`}
                      style={{ height: `${item.vacancyPct}%` }}
                    ></div>
                    <span className={`font-label-sm text-[11px] ${
                      isCritical ? 'text-[#ba1a1a] font-bold' : 'text-[#45464d]'
                    }`}>
                      {item.hour}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[#45464d] font-body-sm text-body-sm pt-2">
              <span>*Data synchronized with URA Space API and LTA DataMall Carparks v2.</span>
              <span className="font-semibold text-black">Critical lunch crunch: 12:00 PM – 1:30 PM</span>
            </div>
          </div>

          {/* Instant Threshold Alert (1 Col) */}
          <div className="bg-[#dce9ff] rounded-xl p-6 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">add_alert</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-headline-md text-headline-md text-[#0b1c30] font-extrabold">
                  Instant Threshold Alert
                </h3>
                <p className="font-body-md text-body-md text-[#45464d]">
                  Prevent dead-end travel into choked carparks. Get push alerts as soon as availability dips below critical levels.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl flex flex-col gap-2 shadow-xs">
                <div className="flex justify-between items-center font-label-md text-label-md text-[#0b1c30] font-bold">
                  <span>Target Zone</span>
                  <span className="text-[#006c49] font-semibold">Marina Bay / Shenton</span>
                </div>
                <div className="flex justify-between items-center font-label-md text-label-md text-[#0b1c30] font-bold">
                  <span>Alert Threshold</span>
                  <span className="text-[#ba1a1a] font-semibold">&lt; 15 lots available</span>
                </div>
                <div className="flex justify-between items-center font-label-md text-label-md text-[#0b1c30] font-bold">
                  <span>Delivery Method</span>
                  <span className="text-[#0b1c30] font-semibold">Mobile Push + In-Car HUD</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setAlertActive(!alertActive)}
                className={`w-full font-label-lg text-label-lg py-3 rounded-xl font-bold shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer ${
                  alertActive
                    ? 'bg-[#006c49] text-white'
                    : 'bg-black text-white hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined">
                  {alertActive ? 'check_circle' : 'notification_add'}
                </span>
                <span>{alertActive ? 'Alert Active' : 'Set Lot Alert (<15 Vacancy)'}</span>
              </button>

              {alertActive && (
                <div className="text-center font-label-sm text-label-sm text-[#006c49] font-bold py-1">
                  ✓ Alert activated for next commute window!
                </div>
              )}
              <span className="text-center font-body-sm text-body-sm text-[#45464d]">
                Auto-expires after lunch surge (2:00 PM)
              </span>
            </div>
          </div>
        </div>

        {/* Live Aerial Context Map Snippet */}
        <div className="w-full bg-white rounded-xl p-6 shadow-sm border border-[#eff4ff] flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <span className="font-label-sm text-label-sm uppercase font-bold text-[#006c49]">
                Real-Time Geospatial Cluster
              </span>
              <h3 className="font-headline-md text-headline-md text-[#0b1c30] font-extrabold">
                Downtown Core Live Sensor Grid
              </h3>
            </div>
            <span className="bg-[#e5eeff] text-[#0b1c30] px-3.5 py-1 rounded-full font-label-sm text-label-sm font-semibold">
              Tracking 4,812 Lots Across 32 Sites
            </span>
          </div>

          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-inner">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${APP_ASSETS.mapDowntownCore})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="font-headline-md text-headline-md font-extrabold text-white">
                    Singapore Financial Center Telemetry
                  </div>
                  <p className="font-body-sm text-body-sm text-white/80">
                    ERP Ingress Sensors active along Robinson Rd, Shenton Way, and Collyer Quay.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="bg-[#006c49] text-white px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">wifi_tethering</span>
                    100% Sensors Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
