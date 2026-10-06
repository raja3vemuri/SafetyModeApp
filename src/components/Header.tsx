import React, { useState } from 'react';
import { NavTab } from '../types';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { tab: NavTab; label: string }[] = [
    { tab: 'signature-editor', label: 'Signature Editor' },
    { tab: 'templates-library', label: 'Templates Library' },
    { tab: 'live-preview-and-export', label: 'Live Preview & Export' },
    { tab: 'help-and-documentation', label: 'Help & Documentation' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#ffffff]/95 backdrop-blur-xl border-b border-[#e2e8f0] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 max-w-[1600px] mx-auto">
        {/* Brand & Studio Status */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => onSelectTab('signature-editor')}
          >
            <div className="w-9 h-9 rounded-lg bg-[#002956] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[#ffffff] text-[20px]">draw</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[15px] sm:text-[16px] text-[#002956] leading-tight tracking-tight">
                SignatureCraft
              </span>
              <span className="text-[11px] text-[#006783] font-medium tracking-normal">
                Email Signature Studio
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 py-1 bg-[#eff4ff] rounded-full px-3 border border-[#d6e3ff]">
            <span className="w-2 h-2 rounded-full bg-[#006783] animate-pulse"></span>
            <span className="text-[11px] text-[#43474f] font-semibold uppercase tracking-wider">
              Workspace Synced
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ tab, label }) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onSelectTab(tab)}
                className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                  isActive
                    ? 'bg-[#e5eeff] text-[#002956] font-semibold shadow-xs'
                    : 'text-[#43474f] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </nav>

        {/* Right Info & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 bg-[#eff4ff] px-3 py-1.5 rounded-lg border border-[#d6e3ff]">
            <span className="material-symbols-outlined text-[#006783] text-[18px]">verified_user</span>
            <span className="text-[12px] font-medium text-[#43474f]">Enterprise Cloud</span>
          </div>

          <div
            title="User Profile: Enterprise Admin"
            className="w-8 h-8 rounded-full bg-[#002956] flex items-center justify-center text-[#ffffff] shadow-sm cursor-pointer hover:ring-2 hover:ring-[#57d1fe] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-1.5 rounded-lg text-[#43474f] hover:bg-[#eff4ff]"
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
        <div className="md:hidden px-4 pt-2 pb-4 bg-[#ffffff] border-b border-[#e2e8f0] flex flex-col gap-1 shadow-lg">
          {navLinks.map(({ tab, label }) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                onSelectTab(tab);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-[14px] font-medium transition-all ${
                activeTab === tab
                  ? 'bg-[#e5eeff] text-[#002956] font-semibold'
                  : 'text-[#43474f] hover:bg-[#eff4ff]'
              }`}
            >
              {label}
            </button>
          ))}
          <div className="pt-2 mt-2 border-t border-[#e2e8f0] flex items-center justify-between text-[12px] text-[#43474f] px-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006783]"></span>
              Workspace Synced
            </span>
            <span>Enterprise Cloud</span>
          </div>
        </div>
      )}
    </header>
  );
};
