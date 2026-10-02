import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<string | null>(null);

  return (
    <>
      <footer className="w-full bg-[#eff4ff] border-t border-[#c6c6cd]/30 py-8 mt-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">
              ParkSpot SG
            </span>
            <span className="font-body-sm text-body-sm text-[#45464d]">
              © 2025 Real-time GovTech Open Data Sync. LTA • URA • HDB Feeds.
            </span>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <button
              onClick={() => setModalType('status')}
              className="font-label-sm text-label-sm text-[#45464d] hover:text-[#0b1c30] transition-colors cursor-pointer"
            >
              API Status
            </button>
            <button
              onClick={() => setModalType('erp')}
              className="font-label-sm text-label-sm text-[#45464d] hover:text-[#0b1c30] transition-colors cursor-pointer"
            >
              ERP Rates Guide
            </button>
            <button
              onClick={() => setModalType('feedback')}
              className="font-label-sm text-label-sm text-[#45464d] hover:text-[#0b1c30] transition-colors cursor-pointer"
            >
              Feedback &amp; Issues
            </button>
            <button
              onClick={() => setModalType('terms')}
              className="font-label-sm text-label-sm text-[#45464d] hover:text-[#0b1c30] transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </footer>

      {/* Info Dialog */}
      {modalType && (
        <div className="fixed inset-0 bg-[#000000]/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-[#c6c6cd]/50 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-[#76777d] hover:text-[#0b1c30] p-1 rounded-lg hover:bg-slate-100"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {modalType === 'status' && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-[#006c49] animate-pulse"></span>
                  <h3 className="font-headline-md text-headline-md text-[#0b1c30] font-bold">
                    Statutory Board API Feeds Status
                  </h3>
                </div>
                <div className="space-y-3 font-body-sm text-[#45464d]">
                  <div className="p-3 bg-[#f8f9ff] rounded-lg border border-[#e5eeff] flex justify-between items-center">
                    <div>
                      <strong className="text-[#0b1c30] block">LTA DataMall v3</strong>
                      <span className="text-xs text-[#76777d]">Endpoint /CarParkAvailabilityv2</span>
                    </div>
                    <span className="px-2 py-0.5 bg-[#6cf8bb]/40 text-[#006c49] rounded-full font-bold text-xs">
                      Operational (99.98%)
                    </span>
                  </div>
                  <div className="p-3 bg-[#f8f9ff] rounded-lg border border-[#e5eeff] flex justify-between items-center">
                    <div>
                      <strong className="text-[#0b1c30] block">HDB EPS Sync</strong>
                      <span className="text-xs text-[#76777d]">Heartland Automated Gantry Loop</span>
                    </div>
                    <span className="px-2 py-0.5 bg-[#6cf8bb]/40 text-[#006c49] rounded-full font-bold text-xs">
                      Operational (99.95%)
                    </span>
                  </div>
                  <div className="p-3 bg-[#f8f9ff] rounded-lg border border-[#e5eeff] flex justify-between items-center">
                    <div>
                      <strong className="text-[#0b1c30] block">URA Urban Planning Hub</strong>
                      <span className="text-xs text-[#76777d]">CBD Season &amp; Hourly Grid</span>
                    </div>
                    <span className="px-2 py-0.5 bg-[#6cf8bb]/40 text-[#006c49] rounded-full font-bold text-xs">
                      Operational (99.99%)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {modalType === 'erp' && (
              <div>
                <h3 className="font-headline-md text-headline-md text-[#0b1c30] font-bold mb-3">
                  Electronic Road Pricing (ERP) Rates Guide
                </h3>
                <p className="font-body-sm text-[#45464d] mb-4">
                  Current active peak surcharges in Downtown Singapore Core:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2.5 bg-[#f8f9ff] rounded-lg">
                    <span>Shenton Way / Chinatown</span>
                    <strong className="text-[#0b1c30]">$2.00 (1:00 PM – 2:00 PM)</strong>
                  </div>
                  <div className="flex justify-between p-2.5 bg-[#f8f9ff] rounded-lg">
                    <span>Marina Bay / CBD South</span>
                    <strong className="text-[#0b1c30]">$2.50 (8:30 AM – 10:00 AM)</strong>
                  </div>
                  <div className="flex justify-between p-2.5 bg-[#f8f9ff] rounded-lg">
                    <span>Orchard Road Cordon</span>
                    <strong className="text-[#0b1c30]">$1.00 (12:00 PM – 1:00 PM)</strong>
                  </div>
                </div>
              </div>
            )}

            {modalType === 'feedback' && (
              <div>
                <h3 className="font-headline-md text-headline-md text-[#0b1c30] font-bold mb-2">
                  Feedback &amp; Issue Report
                </h3>
                <p className="font-body-sm text-[#45464d] mb-4">
                  Report a broken sensor loop, discrepancy in carpark barrier lot count, or reserve lot bug.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Thank you! Your telemetry verification report has been logged to GovTech queue.');
                    setModalType(null);
                  }}
                  className="space-y-3"
                >
                  <input
                    type="text"
                    required
                    placeholder="Carpark Name or Code (e.g. MBFC-T1)"
                    className="w-full px-3 py-2 border border-[#c6c6cd] rounded-lg text-sm"
                  />
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe issue (e.g. gantry barrier closed, count off by 5 lots)..."
                    className="w-full px-3 py-2 border border-[#c6c6cd] rounded-lg text-sm"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-2 bg-black text-white rounded-lg font-bold text-sm hover:bg-slate-800"
                  >
                    Submit Crowdsourced Verification
                  </button>
                </form>
              </div>
            )}

            {modalType === 'terms' && (
              <div>
                <h3 className="font-headline-md text-headline-md text-[#0b1c30] font-bold mb-2">
                  Terms of Use &amp; GovTech Open Data
                </h3>
                <p className="font-body-sm text-[#45464d] space-y-2">
                  ParkSpot SG utilizes official government open telemetry data provided by Land Transport Authority, Housing &amp; Development Board, and Urban Redevelopment Authority under the Singapore Open Data Licence. Lot vacancy is aggregated every 30 to 60 seconds with sub-second predictive queuing algorithms.
                </p>
              </div>
            )}

            <div className="mt-6 pt-3 border-t border-[#eff4ff] flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
