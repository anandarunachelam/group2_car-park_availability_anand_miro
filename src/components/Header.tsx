import React, { useState } from 'react';
import { NavTab, NotificationItem } from '../types';
import { APP_ASSETS, INITIAL_NOTIFICATIONS } from '../data/mockData';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#c6c6cd]/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 w-full px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => onSelectTab('live-map')} 
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <img 
              alt="ParkSpot SG Logo" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
              src={APP_ASSETS.logo} 
            />
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-[#0b1c30] tracking-tight font-bold">
                ParkSpot SG
              </span>
              <div className="hidden sm:flex items-center gap-1.5 bg-[#6cf8bb]/30 px-2.5 py-0.5 rounded-full border border-[#006c49]/20">
                <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-[#006c49] font-semibold uppercase tracking-wider">
                  Live Singapore Carparks
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="hidden xl:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#76777d] pointer-events-none text-lg">
              search
            </span>
            <input 
              className="w-full h-10 pl-10 pr-8 bg-white border border-[#c6c6cd]/60 rounded-lg font-body-sm text-body-sm text-[#0b1c30] placeholder:text-[#76777d] focus:outline-none focus:border-[#00174b] focus:ring-1 focus:ring-[#00174b] transition-all shadow-xs" 
              placeholder="Search (e.g. Marina Bay, Raffles Place, Orchard...)" 
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-2 text-[#76777d] hover:text-[#0b1c30] p-1"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 shrink-0">
          <button
            onClick={() => onSelectTab('live-map')}
            className={`px-3 py-1.5 font-label-lg text-label-lg transition-all rounded-lg cursor-pointer ${
              activeTab === 'live-map'
                ? 'text-[#0b1c30] bg-[#dce9ff] font-bold shadow-xs'
                : 'text-[#45464d] hover:text-[#0b1c30] hover:bg-[#e5eeff]'
            }`}
          >
            Live Map &amp; Carparks
          </button>
          <button
            onClick={() => onSelectTab('downtown-hotspots')}
            className={`px-3 py-1.5 font-label-lg text-label-lg transition-all rounded-lg cursor-pointer ${
              activeTab === 'downtown-hotspots'
                ? 'text-[#0b1c30] bg-[#dce9ff] font-bold shadow-xs'
                : 'text-[#45464d] hover:text-[#0b1c30] hover:bg-[#e5eeff]'
            }`}
          >
            Downtown Hotspots
          </button>
          <button
            onClick={() => onSelectTab('agency-feeds')}
            className={`px-3 py-1.5 font-label-lg text-label-lg transition-all rounded-lg cursor-pointer ${
              activeTab === 'agency-feeds'
                ? 'text-[#0b1c30] bg-[#dce9ff] font-bold shadow-xs'
                : 'text-[#45464d] hover:text-[#0b1c30] hover:bg-[#e5eeff]'
            }`}
          >
            Agency Feeds (LTA/HDB/URA)
          </button>
          <button
            onClick={() => onSelectTab('my-saved-lots')}
            className={`px-3 py-1.5 font-label-lg text-label-lg transition-all rounded-lg cursor-pointer ${
              activeTab === 'my-saved-lots'
                ? 'text-[#0b1c30] bg-[#dce9ff] font-bold shadow-xs'
                : 'text-[#45464d] hover:text-[#0b1c30] hover:bg-[#e5eeff]'
            }`}
          >
            My Saved Lots
          </button>
        </nav>

        {/* Right Action Icons: Notification Bell & Profile Avatar */}
        <div className="flex items-center gap-3 shrink-0 relative">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              aria-label="Notifications" 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="relative p-2 rounded-full text-[#45464d] hover:text-[#0b1c30] hover:bg-[#e5eeff] transition-colors cursor-pointer" 
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-[#f8f9ff]"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#c6c6cd]/50 p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">Live Traffic Alerts</span>
                    <span className="bg-[#ffdad6] text-[#93000a] text-xs font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} New
                    </span>
                  </div>
                  {unreadCount > 0 && (
                    <button 
                      onClick={handleMarkAllRead}
                      className="text-xs text-[#00714d] hover:underline font-semibold cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="mt-3 space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div 
                      key={n.id}
                      className={`p-2.5 rounded-lg text-left transition-colors ${
                        n.unread ? 'bg-[#eff4ff]' : 'bg-transparent hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md text-[#0b1c30] font-semibold flex items-center gap-1.5">
                          {n.type === 'alert' && <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>}
                          {n.type === 'info' && <span className="w-2 h-2 rounded-full bg-[#497cff]"></span>}
                          {n.type === 'success' && <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>}
                          {n.title}
                        </span>
                        <span className="font-body-sm text-[11px] text-[#76777d]">{n.time}</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#45464d] mt-1 line-clamp-2">
                        {n.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#eff4ff] flex justify-between items-center text-xs text-[#76777d]">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
                    GovTech Real-Time Channel
                  </span>
                  <button 
                    onClick={() => onSelectTab('agency-feeds')}
                    className="text-[#00714d] font-semibold hover:underline cursor-pointer"
                  >
                    View Stream
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar & Menu */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center pl-1 cursor-pointer focus:outline-none group"
              aria-label="User Profile"
            >
              <img 
                alt="Profile avatar" 
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#006c49]/40 group-hover:ring-[#006c49] transition-all" 
                src={APP_ASSETS.profileAvatar} 
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#c6c6cd]/50 p-4 z-50">
                <div className="flex items-center gap-3 pb-3 border-b border-[#eff4ff]">
                  <img 
                    alt="Leonard" 
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-[#c6c6cd]" 
                    src={APP_ASSETS.profileAvatar} 
                  />
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-[#0b1c30] font-bold">Leonard Tan</h4>
                    <span className="text-xs bg-[#eff4ff] text-[#00714d] px-2 py-0.5 rounded-full font-semibold">
                      CBD Frequent Pass
                    </span>
                  </div>
                </div>

                <div className="py-2 space-y-1">
                  <div className="px-2 py-1 text-xs text-[#76777d]">
                    Paired Car: <strong className="text-[#0b1c30]">Mercedes C200 (SGX 4821 K)</strong>
                  </div>
                  <div className="px-2 py-1 text-xs text-[#76777d]">
                    IU Unit: <strong className="text-[#0b1c30]">19482012 (LTA EPS Live)</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#eff4ff] flex flex-col gap-1">
                  <button 
                    onClick={() => {
                      onSelectTab('my-saved-lots');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2 py-1.5 text-sm font-semibold text-[#0b1c30] hover:bg-[#eff4ff] rounded-lg transition-colors cursor-pointer"
                  >
                    Open My Saved Lots
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#45464d] hover:bg-[#e5eeff] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#c6c6cd]/50 px-4 py-3 space-y-1">
          <div className="mb-2">
            <input 
              className="w-full h-10 pl-3 pr-3 bg-[#eff4ff] border border-[#c6c6cd]/50 rounded-lg text-sm"
              placeholder="Search Singapore Carparks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <button
            onClick={() => { onSelectTab('live-map'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium text-sm ${
              activeTab === 'live-map' ? 'bg-[#dce9ff] text-[#0b1c30] font-bold' : 'text-[#45464d]'
            }`}
          >
            Live Map &amp; Carparks
          </button>
          <button
            onClick={() => { onSelectTab('downtown-hotspots'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium text-sm ${
              activeTab === 'downtown-hotspots' ? 'bg-[#dce9ff] text-[#0b1c30] font-bold' : 'text-[#45464d]'
            }`}
          >
            Downtown Hotspots
          </button>
          <button
            onClick={() => { onSelectTab('agency-feeds'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium text-sm ${
              activeTab === 'agency-feeds' ? 'bg-[#dce9ff] text-[#0b1c30] font-bold' : 'text-[#45464d]'
            }`}
          >
            Agency Feeds (LTA/HDB/URA)
          </button>
          <button
            onClick={() => { onSelectTab('my-saved-lots'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium text-sm ${
              activeTab === 'my-saved-lots' ? 'bg-[#dce9ff] text-[#0b1c30] font-bold' : 'text-[#45464d]'
            }`}
          >
            My Saved Lots
          </button>
        </div>
      )}
    </header>
  );
};
