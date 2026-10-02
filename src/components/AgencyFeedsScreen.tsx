import React, { useState, useEffect } from 'react';
import { AGENCY_STREAM_ROWS, APP_ASSETS } from '../data/mockData';
import { AgencyStreamRow } from '../types';

export const AgencyFeedsScreen: React.FC = () => {
  const [selectedAgencyFilter, setSelectedAgencyFilter] = useState<string>('all');
  const [activeModalRow, setActiveModalRow] = useState<AgencyStreamRow | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastRefreshedSec, setLastRefreshedSec] = useState<number>(4);
  const [aggregatePing, setAggregatePing] = useState<number>(218);
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);

  // Periodic heartbeat timer
  useEffect(() => {
    const timer = setInterval(() => {
      setLastRefreshedSec(prev => (prev >= 60 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSyncTelemetry = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastRefreshedSec(0);
      setAggregatePing(Math.floor(210 + Math.random() * 18));
    }, 900);
  };

  const filteredRows = AGENCY_STREAM_ROWS.filter(row => {
    if (selectedAgencyFilter === 'all') return true;
    return row.agency === selectedAgencyFilter;
  });

  const getSamplePayload = (row: AgencyStreamRow) => {
    return {
      agency_source: row.agency,
      carpark_number: row.code,
      name: row.name,
      timestamp: new Date().toISOString(),
      status: "NORMAL_SYNC",
      carpark_info: [
        {
          total_lots: row.capacity,
          lot_type: "C",
          lots_available: row.availableLots,
          occupancy_rate: (((row.capacity - row.availableLots) / row.capacity) * 100).toFixed(1) + "%",
          gantry_system: row.agency === 'HDB' ? "EPS_LPR_TRANSIT" : "SENSOR_TAG_V2",
          coordinates: {
            latitude: row.coordinates.lat,
            longitude: row.coordinates.lng,
            datum: "SVY21/WGS84"
          }
        }
      ],
      response_code: "OK_200",
      auth_token_sig: "sha256:8f41c09893d" + Math.floor(Math.random() * 90000),
      encryption: "TLSv1.3 GovTech Verified Gateway"
    };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-[1440px] mx-auto flex flex-col gap-8">
        {/* Top System Pulse & Headline Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#006c49] font-label-sm uppercase tracking-wider font-bold">
                <span className="w-2 h-2 rounded-full bg-[#006c49] animate-ping"></span>
                GovTech Data Pipeline v4.2
              </span>
              <span className="font-body-sm text-[#76777d]">Refreshed {lastRefreshedSec}s ago</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-[#0b1c30] tracking-tight font-extrabold">
              Singapore Unified Public Parking API Feeds
            </h1>
            <p className="font-body-lg text-body-lg text-[#45464d] max-w-3xl">
              Real-time transactional telemetry integrating Land Transport Authority (LTA DataMall), Housing &amp; Development Board (HDB EPS), and Urban Redevelopment Authority (URA) urban sensor streams.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#eff4ff] p-1.5 rounded-xl shadow-xs self-start md:self-auto border border-[#c6c6cd]/30">
            <div className="px-3.5 py-1 flex flex-col">
              <span className="font-label-sm text-[#76777d] uppercase tracking-wider font-semibold">
                Aggregate Ping
              </span>
              <span className="font-metric-display text-metric-display text-[#006c49]">
                {aggregatePing}ms
              </span>
            </div>
            <div className="w-px h-8 bg-[#d3e4fe]"></div>
            <div className="px-3.5 py-1 flex flex-col">
              <span className="font-label-sm text-[#76777d] uppercase tracking-wider font-semibold">
                Monitored Lots
              </span>
              <span className="font-metric-display text-metric-display text-[#0b1c30]">
                194,840
              </span>
            </div>
            <button
              onClick={handleSyncTelemetry}
              disabled={isSyncing}
              className="px-4 py-2 bg-black text-white rounded-lg font-label-md flex items-center gap-1.5 shadow-md hover:bg-[#213145] active:scale-95 transition-all cursor-pointer"
            >
              <span
                className={`material-symbols-outlined text-base ${isSyncing ? 'animate-spin' : ''}`}
                style={{ animationDuration: isSyncing ? '0.6s' : '4s' }}
              >
                sync
              </span>
              <span>{isSyncing ? 'Syncing...' : 'Sync Telemetry'}</span>
            </button>
          </div>
        </div>

        {/* 1. Agency Integration Status Header Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* LTA Card */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-[#eff4ff] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#6cf8bb]/15 -z-0"></div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#dce9ff] flex items-center justify-center font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                    LTA
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                      Land Transport Authority
                    </span>
                    <span className="font-label-sm text-[#45464d]">DataMall REST API v3</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#006c49] font-label-sm font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                  Live Syncing
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 py-2">
                <div className="flex flex-col bg-[#eff4ff] p-2.5 rounded-lg">
                  <span className="font-label-sm text-[#76777d]">Carparks Tracked</span>
                  <span className="font-metric-display text-metric-display text-[#0b1c30]">380</span>
                  <span className="font-body-sm text-[#76777d]">Commercial Hubs</span>
                </div>
                <div className="flex flex-col bg-[#eff4ff] p-2.5 rounded-lg">
                  <span className="font-label-sm text-[#76777d]">API SLA Uptime</span>
                  <span className="font-metric-display text-metric-display text-[#006c49]">99.98%</span>
                  <span className="font-body-sm text-[#76777d]">240ms Latency</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between font-label-sm text-[#45464d] border-t border-[#eff4ff]">
              <span className="flex items-center gap-1 text-[#006c49] font-semibold">
                <span className="material-symbols-outlined text-sm text-[#006c49]">verified_user</span>
                Gov Gateway Verified
              </span>
              <span className="font-body-sm text-[#76777d]">Pull cadence: 60s</span>
            </div>
          </div>

          {/* HDB Card */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-[#eff4ff] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#dce9ff]/30 -z-0"></div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#dce9ff] flex items-center justify-center font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                    HDB
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                      Housing &amp; Dev Board
                    </span>
                    <span className="font-label-sm text-[#45464d]">Electronic Parking (EPS) Feeds</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#006c49] font-label-sm font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                  Live Syncing
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 py-2">
                <div className="flex flex-col bg-[#eff4ff] p-2.5 rounded-lg">
                  <span className="font-label-sm text-[#76777d]">Carparks Tracked</span>
                  <span className="font-metric-display text-metric-display text-[#0b1c30]">1,420</span>
                  <span className="font-body-sm text-[#76777d]">Heartland Estates</span>
                </div>
                <div className="flex flex-col bg-[#eff4ff] p-2.5 rounded-lg">
                  <span className="font-label-sm text-[#76777d]">API SLA Uptime</span>
                  <span className="font-metric-display text-metric-display text-[#006c49]">99.95%</span>
                  <span className="font-body-sm text-[#76777d]">310ms Latency</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between font-label-sm text-[#45464d] border-t border-[#eff4ff]">
              <span className="flex items-center gap-1 text-[#006c49] font-semibold">
                <span className="material-symbols-outlined text-sm text-[#006c49]">verified_user</span>
                EPS Automated Barrier Sync
              </span>
              <span className="font-body-sm text-[#76777d]">Pull cadence: 45s</span>
            </div>
          </div>

          {/* URA Card */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-[#eff4ff] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#d3e4fe]/30 -z-0"></div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#dce9ff] flex items-center justify-center font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                    URA
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                      Urban Redevelopment
                    </span>
                    <span className="font-label-sm text-[#45464d]">URA Urban Planning API</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#006c49] font-label-sm font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                  Live Syncing
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 py-2">
                <div className="flex flex-col bg-[#eff4ff] p-2.5 rounded-lg">
                  <span className="font-label-sm text-[#76777d]">Carparks Tracked</span>
                  <span className="font-metric-display text-metric-display text-[#0b1c30]">340</span>
                  <span className="font-body-sm text-[#76777d]">Mixed-use &amp; Open Lots</span>
                </div>
                <div className="flex flex-col bg-[#eff4ff] p-2.5 rounded-lg">
                  <span className="font-label-sm text-[#76777d]">API SLA Uptime</span>
                  <span className="font-metric-display text-metric-display text-[#006c49]">99.99%</span>
                  <span className="font-body-sm text-[#76777d]">185ms Latency</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between font-label-sm text-[#45464d] border-t border-[#eff4ff]">
              <span className="flex items-center gap-1 text-[#006c49] font-semibold">
                <span className="material-symbols-outlined text-sm text-[#006c49]">verified_user</span>
                Season &amp; Open Lot Grid
              </span>
              <span className="font-body-sm text-[#76777d]">Pull cadence: 30s</span>
            </div>
          </div>
        </div>

        {/* Visual Telemetry & Map Overview Banner */}
        <div className="bg-white rounded-xl shadow-xs p-6 flex flex-col lg:flex-row gap-6 items-center border border-[#eff4ff]">
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-1.5 text-[#006c49] font-label-md">
              <span className="material-symbols-outlined text-sm">hub</span>
              <span>CENTRAL SENSOR COVERAGE</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-[#0b1c30] font-bold">
              Island-wide High Density Urban Nodes
            </h2>
            <p className="font-body-md text-body-md text-[#45464d]">
              Dynamic synchronization aggregates high-frequency inputs from Downtown Core, Marina South, Orchard Shopping District, and Heartland regional centres into one unified payload.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-1">
              <div className="flex flex-col">
                <span className="font-metric-display text-metric-display text-[#0b1c30]">94.8%</span>
                <span className="font-label-sm text-[#76777d]">Telemetry Confidence</span>
              </div>
              <div className="flex flex-col">
                <span className="font-metric-display text-metric-display text-[#0b1c30]">&lt; 3.2s</span>
                <span className="font-label-sm text-[#76777d]">Gantry Ingestion Gap</span>
              </div>
              <div className="flex flex-col">
                <span className="font-metric-display text-metric-display text-[#0b1c30]">0.02%</span>
                <span className="font-label-sm text-[#76777d]">Packet Loss Rate</span>
              </div>
            </div>
          </div>

          <div
            className="w-full lg:w-1/2 h-64 rounded-xl overflow-hidden shadow-md relative bg-cover bg-center"
            style={{ backgroundImage: `url(${APP_ASSETS.mapMarinaBay})` }}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-brightness-95 flex flex-col justify-between p-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0b1c30] font-label-sm flex items-center gap-1.5 shadow-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
                  Singapore CBD Node Cluster
                </span>
                <span className="px-2 py-0.5 rounded bg-black/80 text-white font-label-sm">
                  Active Polling
                </span>
              </div>
              <div className="bg-white/90 backdrop-blur-md p-2.5 rounded-lg flex items-center justify-between text-[#0b1c30] font-body-sm shadow-xs">
                <span>Aggregating 1,420 HDB + 380 LTA + 340 URA Feeds</span>
                <span className="font-label-sm text-[#006c49] font-bold">2,140 Endpoints LIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Real-time Agency Lot Stream & Verification Table */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-[#0b1c30] font-bold">
                Real-time Agency Lot Stream &amp; Verification
              </h2>
              <p className="font-body-md text-body-md text-[#45464d]">
                Validated live data streams with sensor technology classification and raw payload linkages.
              </p>
            </div>

            {/* Filter Pill Group */}
            <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-xl">
              <button
                onClick={() => setSelectedAgencyFilter('all')}
                className={`px-3 py-1 rounded-lg font-label-md transition-all cursor-pointer ${
                  selectedAgencyFilter === 'all'
                    ? 'bg-white text-[#0b1c30] shadow-xs font-bold'
                    : 'text-[#45464d] hover:text-[#0b1c30]'
                }`}
              >
                All Agencies (2,140)
              </button>
              <button
                onClick={() => setSelectedAgencyFilter('LTA')}
                className={`px-3 py-1 rounded-lg font-label-md transition-all cursor-pointer ${
                  selectedAgencyFilter === 'LTA'
                    ? 'bg-white text-[#0b1c30] shadow-xs font-bold'
                    : 'text-[#45464d] hover:text-[#0b1c30]'
                }`}
              >
                LTA (380)
              </button>
              <button
                onClick={() => setSelectedAgencyFilter('HDB')}
                className={`px-3 py-1 rounded-lg font-label-md transition-all cursor-pointer ${
                  selectedAgencyFilter === 'HDB'
                    ? 'bg-white text-[#0b1c30] shadow-xs font-bold'
                    : 'text-[#45464d] hover:text-[#0b1c30]'
                }`}
              >
                HDB (1,420)
              </button>
              <button
                onClick={() => setSelectedAgencyFilter('URA')}
                className={`px-3 py-1 rounded-lg font-label-md transition-all cursor-pointer ${
                  selectedAgencyFilter === 'URA'
                    ? 'bg-white text-[#0b1c30] shadow-xs font-bold'
                    : 'text-[#45464d] hover:text-[#0b1c30]'
                }`}
              >
                URA (340)
              </button>
            </div>
          </div>

          {/* Table Card Wrapper */}
          <div className="bg-white rounded-xl shadow-xs overflow-hidden flex flex-col border border-[#eff4ff]">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead className="bg-[#eff4ff] text-[#45464d] font-label-sm uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Carpark Code</th>
                    <th className="py-3 px-4">Carpark Name &amp; Area</th>
                    <th className="py-3 px-4">Agency Source</th>
                    <th className="py-3 px-4">Type &amp; System</th>
                    <th className="py-3 px-4">Capacity</th>
                    <th className="py-3 px-4">Available Lots</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Ping</th>
                    <th className="py-3 px-4 text-right">Raw Source</th>
                  </tr>
                </thead>
                <tbody className="text-[#0b1c30] divide-y divide-[#eff4ff]">
                  {filteredRows.map((row) => (
                    <tr key={row.code} className="hover:bg-[#eff4ff]/60 transition-colors">
                      <td className="py-3.5 px-4 font-headline-sm text-headline-sm font-bold">
                        {row.code}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <span className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                            {row.name}
                          </span>
                          <span className="font-body-sm text-[#76777d]">{row.area}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#e5eeff] font-label-sm text-[#0b1c30] font-bold">
                          {row.agency}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 text-[#45464d] font-label-sm">
                          <span className="material-symbols-outlined text-sm">{row.systemIcon}</span>
                          <span>{row.system}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-body-md text-[#76777d]">
                        {row.capacity}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`font-headline-sm text-headline-sm font-bold ${
                          row.statusType === 'green'
                            ? 'text-[#006c49]'
                            : row.statusType === 'amber'
                            ? 'text-[#45464d]'
                            : 'text-[#ba1a1a]'
                        }`}>
                          {row.availableLots}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm font-semibold ${
                          row.statusType === 'green'
                            ? 'bg-[#6cf8bb]/40 text-[#006c49]'
                            : row.statusType === 'amber'
                            ? 'bg-[#dce9ff] text-[#45464d]'
                            : 'bg-[#ffdad6] text-[#93000a]'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            row.statusType === 'green'
                              ? 'bg-[#006c49]'
                              : row.statusType === 'amber'
                              ? 'bg-[#76777d]'
                              : 'bg-[#ba1a1a]'
                          }`}></span>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-body-sm text-[#76777d]">
                        {row.ping}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setActiveModalRow(row)}
                          className="inline-flex items-center gap-1 text-[#497cff] hover:text-[#00174b] font-label-sm font-semibold cursor-pointer"
                        >
                          <span>payload.json</span>
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#eff4ff] px-4 py-2.5 flex items-center justify-between font-label-sm text-[#45464d]">
              <span>Showing {filteredRows.length} active sample endpoints out of 2,140 synchronized car parks</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
                All 3 Agency Gateways Operational
              </span>
            </div>
          </div>
        </div>

        {/* 3. Business Plan Risk Mitigation & Resilience Panel */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#dce9ff] text-[#0b1c30]">
              <span className="material-symbols-outlined">security</span>
            </div>
            <div>
              <h2 className="font-headline-lg text-headline-lg text-[#0b1c30] font-bold">
                Mitigation &amp; Resilience Features (per Business Case)
              </h2>
              <p className="font-body-md text-body-md text-[#45464d]">
                Autonomous safeguards ensuring seamless navigation during telecommunication drops and agency API disruptions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pillar 1 */}
            <div className="bg-white rounded-xl p-6 shadow-xs border border-[#eff4ff] flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#0b1c30]">
                  <span className="material-symbols-outlined text-2xl">memory</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-sm text-[#76777d] uppercase tracking-wider font-semibold">
                    Gateway Timeout Protocol
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                    Fallback Caching &amp; AI Predictive Vacancy
                  </h3>
                  <p className="font-body-md text-body-md text-[#45464d]">
                    When LTA/URA gateway delay exceeds <strong>5.0 seconds</strong>, the engine isolates stalled sockets and deploys a localized gradient descent model to extrapolate vacancy based on historical time-of-day turnover rates.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 bg-[#eff4ff] p-3 rounded-lg flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-label-sm">
                  <span className="text-[#45464d] font-semibold">Model Confidence</span>
                  <span className="text-[#006c49] font-bold">96.4% Accuracy</span>
                </div>
                <div className="w-full h-1.5 bg-[#e5eeff] rounded-full overflow-hidden">
                  <div className="bg-[#006c49] h-full rounded-full" style={{ width: '96.4%' }}></div>
                </div>
                <span className="font-body-sm text-[#76777d] mt-0.5">Zero downtime for active drivers</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-xl p-6 shadow-xs border border-[#eff4ff] flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#0b1c30]">
                  <span className="material-symbols-outlined text-2xl">location_off</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-sm text-[#76777d] uppercase tracking-wider font-semibold">
                    Underground Signal Integrity
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                    Offline GPS Dead-Reckoning
                  </h3>
                  <p className="font-body-md text-body-md text-[#45464d]">
                    Pre-caches subterranean turn-by-turn vectors and gantry floor topologies upon approach (e.g. Marina Bay Sands, Suntec City Basements) where 4G/5G mobile signals frequently attenuate to zero.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 bg-[#eff4ff] p-3 rounded-lg flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-label-sm">
                  <span className="text-[#45464d] font-semibold">Underground Mesh</span>
                  <span className="text-[#0b1c30] font-bold">142 Basements Cached</span>
                </div>
                <div className="w-full h-1.5 bg-[#e5eeff] rounded-full overflow-hidden">
                  <div className="bg-[#0b1c30] h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="font-body-sm text-[#76777d] mt-0.5">Seamless inertial sensor handoff</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-xl p-6 shadow-xs border border-[#eff4ff] flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#0b1c30]">
                  <span className="material-symbols-outlined text-2xl">how_to_reg</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-sm text-[#76777d] uppercase tracking-wider font-semibold">
                    Discrepancy Correction
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                    Crowd-sourced Driver Verification
                  </h3>
                  <p className="font-body-md text-body-md text-[#45464d]">
                    Gamified 1-tap confirmation upon gantry entry and exit allows the driver community to report broken sensor loops, barrier malfunctions, or unauthorized reserved lot closures in real time.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 bg-[#eff4ff] p-3 rounded-lg flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-label-sm">
                  <span className="text-[#45464d] font-semibold">Daily Confirmations</span>
                  <span className="text-[#006c49] font-bold">18,290 Check-ins</span>
                </div>
                <div className="w-full h-1.5 bg-[#e5eeff] rounded-full overflow-hidden">
                  <div className="bg-[#006c49] h-full rounded-full" style={{ width: '82%' }}></div>
                </div>
                <span className="font-body-sm text-[#76777d] mt-0.5">Cross-validates agency anomaly alerts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agency Technical Specification Architecture Bento */}
        <div className="bg-white rounded-xl p-6 shadow-xs border border-[#eff4ff] flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-[#76777d] uppercase tracking-wider font-semibold">
              Architecture Blueprint
            </span>
            <h3 className="font-headline-md text-headline-md text-[#0b1c30] font-bold">
              Data Normalization &amp; Gantry Compatibility Schema
            </h3>
            <p className="font-body-md text-body-md text-[#45464d]">
              Unified payload specification mapping differing statutory board parameters into a single client telemetry model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#eff4ff] p-4 rounded-xl flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[#0b1c30] font-headline-sm font-bold">
                <span className="material-symbols-outlined text-lg">code</span>
                LTA Ingestion Pipeline
              </div>
              <p className="font-body-sm text-[#45464d]">
                Endpoint: <code className="bg-[#e5eeff] px-1 py-0.5 rounded text-[#76777d]">/ltaodataservice/CarParkAvailabilityv2</code>. Updates on 60-second polling loops with coordinate projection WGS84 format.
              </p>
            </div>

            <div className="bg-[#eff4ff] p-4 rounded-xl flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[#0b1c30] font-headline-sm font-bold">
                <span className="material-symbols-outlined text-lg">alt_route</span>
                HDB EPS Ingestion Pipeline
              </div>
              <p className="font-body-sm text-[#45464d]">
                Endpoint: <code className="bg-[#e5eeff] px-1 py-0.5 rounded text-[#76777d]">/transport/carpark-availability</code>. Integrates SVY21 coordinate transforms for heartland multi-storey and surface lots.
              </p>
            </div>

            <div className="bg-[#eff4ff] p-4 rounded-xl flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[#0b1c30] font-headline-sm font-bold">
                <span className="material-symbols-outlined text-lg">database</span>
                URA Urban Hub Pipeline
              </div>
              <p className="font-body-sm text-[#45464d]">
                Endpoint: <code className="bg-[#e5eeff] px-1 py-0.5 rounded text-[#76777d]">/uraDataService/invokeUraDS</code>. Delivers session tokens, parking rates breakdown, and differential season lot counts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Micro Modal for Raw JSON Payload Inspection */}
      {activeModalRow && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-2xl border border-[#c6c6cd]/50 flex flex-col gap-3 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006c49]">terminal</span>
                <h3 className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
                  {activeModalRow.agency} Feed: {activeModalRow.code}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalRow(null)}
                className="p-1 rounded-lg text-[#76777d] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="font-body-sm text-[#76777d]">
              Live HTTP 200 payload verified by ParkSpot SG GovTech relay.
            </p>

            <pre className="bg-[#131b2e] text-[#dce9ff] p-4 rounded-lg font-mono text-xs overflow-x-auto max-h-72 border border-slate-700">
              {JSON.stringify(getSamplePayload(activeModalRow), null, 2)}
            </pre>

            <div className="flex items-center justify-between pt-2">
              <span className="font-label-sm text-[#006c49] flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-sm">lock</span>
                Encrypted GovTech Transit Tunnel
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(JSON.stringify(getSamplePayload(activeModalRow), null, 2))}
                  className="px-3 py-1.5 bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff] rounded-lg font-label-md text-xs font-semibold cursor-pointer"
                >
                  {copiedPayload ? 'Copied ✓' : 'Copy JSON'}
                </button>
                <button
                  onClick={() => setActiveModalRow(null)}
                  className="px-4 py-1.5 bg-black text-white rounded-lg font-label-md text-xs font-bold hover:bg-slate-800 cursor-pointer"
                >
                  Close Payload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
