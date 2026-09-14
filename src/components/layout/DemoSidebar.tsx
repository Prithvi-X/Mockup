import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { BUSINESS_DATA_MAP } from '../../data/mockBusinesses';
import { DynamicIcon } from '../common/Icon';
import { Phone, MapPin, Menu, X } from 'lucide-react';

export const DemoSidebar: React.FC = () => {
  const { category, activeSidebarTab, setActiveSidebarTab, customization } = useDemo();
  const [mobileOpen, setMobileOpen] = useState(false);

  const business = BUSINESS_DATA_MAP[category] || BUSINESS_DATA_MAP.salon;
  const sidebarItems = business.sidebarItems;

  return (
    <>
      {/* Mobile top toggle bar */}
      <div className="lg:hidden bg-neutral-900/90 border-b border-neutral-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Section:
          </span>
          <span className="text-xs font-bold text-white capitalize">
            {sidebarItems.find((i) => i.id === activeSidebarTab)?.label || 'Overview'}
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-md text-neutral-400 hover:text-white bg-neutral-800"
          aria-label="Toggle sidebar menu"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 p-3 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = activeSidebarTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSidebarTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <DynamicIcon name={item.icon} className="w-4 h-4 text-neutral-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-neutral-800 bg-neutral-950/70 p-4 justify-between min-h-[calc(100vh-53px)]">
        <div>
          {/* Business Info Header */}
          <div className="pb-4 mb-3 border-b border-neutral-800/80">
            <div className="flex items-center gap-2.5">
              {customization.logoUrl && (
                <img
                  src={customization.logoUrl}
                  alt={customization.businessName}
                  className="w-8 h-8 rounded-lg object-contain border border-neutral-800 bg-neutral-900 p-0.5 shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-sm tracking-tight text-white truncate">
                  {customization.businessName}
                </h2>
                <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                  {business.category}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 px-3 py-1.5">
              Navigation
            </div>
            {sidebarItems.map((item) => {
              const isActive = activeSidebarTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSidebarTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-neutral-800/90 text-white font-semibold border border-neutral-700/60 shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <DynamicIcon
                      name={item.icon}
                      className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        isActive
                          ? 'bg-neutral-700 text-white'
                          : 'bg-neutral-900 text-neutral-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Business Card */}
        <div className="pt-4 border-t border-neutral-800/80">
          <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-3 text-xs space-y-1.5">
            <div className="font-semibold text-neutral-200 text-[11px] uppercase tracking-wider">
              Showroom Preview
            </div>
            <div className="flex items-start gap-1.5 text-neutral-400 text-[11px]">
              <Phone className="w-3.5 h-3.5 shrink-0 text-neutral-400 mt-0.5" />
              <span className="truncate">{customization.phone || '+91 98351 22440'}</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-400 text-[11px]">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-400 mt-0.5" />
              <span className="line-clamp-1">{customization.address || 'Ranchi, Jharkhand'}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
