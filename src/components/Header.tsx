import React, { useState } from 'react';
import { NavTab } from '../types';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenCloudSignatures: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenCloudSignatures,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, signIn, signOut, savedSignatures } = useAuth();

  const navLinks: { tab: NavTab; label: string; icon: string }[] = [
    { tab: 'signature-editor', label: 'Signature Editor', icon: 'edit_note' },
    { tab: 'templates-library', label: 'Templates Library', icon: 'auto_awesome_motion' },
    { tab: 'live-preview-and-export', label: 'Live Preview & Export', icon: 'visibility' },
    { tab: 'help-and-documentation', label: 'Help & Documentation', icon: 'menu_book' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#07162c]/95 backdrop-blur-xl border-b border-[#1b3152] shadow-[0_4px_20px_rgba(0,0,0,0.15)] text-white">
      <div className="h-16 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 max-w-[1600px] mx-auto">
        {/* Brand & Studio Status */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => onSelectTab('signature-editor')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0f2d59] via-[#002956] to-[#d29900] p-[1.5px] shadow-md shadow-orange-950/20 group-hover:scale-105 transition-all">
              <div className="w-full h-full rounded-[10px] bg-[#07162c] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#d29900] text-[22px] group-hover:rotate-6 transition-transform">
                  draw
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[16px] text-white leading-tight tracking-tight">
                  SignatureCraft
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d29900]"></span>
              </div>
              <span className="text-[11px] text-[#93c5fd] font-medium tracking-normal">
                Enterprise Studio
              </span>
            </div>
          </div>

          {/* Cloud Sync Button */}
          <button
            type="button"
            onClick={onOpenCloudSignatures}
            className="hidden lg:flex items-center gap-2 py-1.5 bg-[#0d223f] hover:bg-[#15345d] text-white rounded-full px-3.5 border border-[#1d3d69] hover:border-[#d29900]/50 transition-all cursor-pointer shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d29900] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d29900]"></span>
            </span>
            <span className="text-[11px] text-[#cbd5e1] font-bold uppercase tracking-wider">
              {user ? `Cloud Sync (${savedSignatures.length})` : 'Firebase Cloud Sync'}
            </span>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ tab, label, icon }) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onSelectTab(tab)}
                className={`px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0f2d59] to-[#153a70] text-white border border-[#2d568f] shadow-md shadow-blue-950/40'
                    : 'text-[#94a3b8] hover:text-white hover:bg-[#0d223f]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[17px] ${
                    isActive ? 'text-[#d29900]' : 'text-[#64748b]'
                  }`}
                >
                  {icon}
                </span>
                {label}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d29900] ml-0.5"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Info, Authentication & Actions */}
        <div className="flex items-center gap-3">
          {/* Sign In button or User Avatar dropdown */}
          {!user ? (
            <button
              type="button"
              onClick={async () => {
                try {
                  await signIn();
                } catch (e) {
                  console.error(e);
                }
              }}
              className="flex items-center gap-2 bg-[#002956] hover:bg-[#071933] border border-[#d29900]/50 hover:border-[#d29900] text-white px-3.5 py-1.5 rounded-xl text-[12px] font-extrabold shadow-sm hover:shadow-orange-950/30 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#d29900] text-[18px]">login</span>
              <span>Sign In</span>
            </button>
          ) : (
            <div className="relative">
              <div
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-[#0d223f] transition-all"
                title={`${user.displayName || 'User'} (${user.email})`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#d29900] p-[1.5px] shadow-sm hover:ring-2 hover:ring-[#d29900] transition-all overflow-hidden">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-[#07162c] flex items-center justify-center text-[#f8fafc]">
                      <span className="material-symbols-outlined text-[17px]">person</span>
                    </div>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[12px] font-bold text-white truncate max-w-[110px]">
                    {user.displayName || 'Account'}
                  </span>
                  <span className="text-[10px] text-[#d29900] font-medium leading-none">
                    Cloud Synced
                  </span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#94a3b8]">
                  expand_more
                </span>
              </div>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 top-11 mt-1 w-64 bg-[#07162c] border border-[#1b3152] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 border-b border-[#1b3152] flex flex-col gap-0.5">
                    <span className="text-[13px] font-bold text-white truncate">
                      {user.displayName || 'Enterprise User'}
                    </span>
                    <span className="text-[11px] text-[#94a3b8] truncate">{user.email}</span>
                  </div>

                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenCloudSignatures();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-[12px] font-bold text-[#cbd5e1] hover:text-white hover:bg-[#0d223f] flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#d29900] text-[18px]">
                          folder_special
                        </span>
                        My Cloud Signatures
                      </span>
                      <span className="text-[10px] bg-orange-500/20 text-[#d29900] px-1.5 py-0.5 rounded font-mono">
                        {savedSignatures.length}
                      </span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-[#1b3152]">
                    <button
                      type="button"
                      onClick={async () => {
                        setUserDropdownOpen(false);
                        await signOut();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-[12px] font-bold text-[#ef4444] hover:bg-red-500/10 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-xl text-[#cbd5e1] hover:text-white hover:bg-[#0d223f] border border-[#1b3152] cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 bg-[#07162c] border-b border-[#1b3152] flex flex-col gap-1.5 shadow-2xl">
          {navLinks.map(({ tab, label, icon }) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                onSelectTab(tab);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#0f2d59] to-[#153a70] text-white border border-[#2d568f]'
                  : 'text-[#94a3b8] hover:text-white hover:bg-[#0d223f]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  activeTab === tab ? 'text-[#d29900]' : 'text-[#64748b]'
                }`}
              >
                {icon}
              </span>
              <span>{label}</span>
              {activeTab === tab && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#d29900] ml-auto"></span>
              )}
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCloudSignatures();
            }}
            className="w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-bold text-white bg-[#0d223f] hover:bg-[#15345d] border border-[#1d3d69] flex items-center gap-2 mt-1"
          >
            <span className="material-symbols-outlined text-[#d29900] text-[18px]">
              cloud_sync
            </span>
            <span>Firebase Cloud Signatures ({savedSignatures.length})</span>
          </button>

          {user && (
            <button
              type="button"
              onClick={async () => {
                setMobileMenuOpen(false);
                await signOut();
              }}
              className="w-full text-left px-4 py-2 rounded-xl text-[13px] font-bold text-red-400 hover:bg-red-500/10 flex items-center gap-2 mt-1"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>Sign Out ({user.email})</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
