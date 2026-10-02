import { useState } from 'react';
import { NavTab } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LiveMapScreen } from './components/LiveMapScreen';
import { DowntownHotspotsScreen } from './components/DowntownHotspotsScreen';
import { AgencyFeedsScreen } from './components/AgencyFeedsScreen';
import { MySavedLotsScreen } from './components/MySavedLotsScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('agency-feeds');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="w-full pt-16 flex-1">
        {activeTab === 'live-map' && (
          <LiveMapScreen searchQuery={searchQuery} />
        )}

        {activeTab === 'downtown-hotspots' && (
          <DowntownHotspotsScreen />
        )}

        {activeTab === 'agency-feeds' && (
          <AgencyFeedsScreen />
        )}

        {activeTab === 'my-saved-lots' && (
          <MySavedLotsScreen />
        )}
      </main>

      <Footer />
    </div>
  );
}
