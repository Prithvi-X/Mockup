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
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between text-gray-900">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Section:
          </span>
          <span className="text-xs font-bold text-gray-900 capitalize">
            {sidebarItems.find((i) => i.id === activeSidebarTab)?.label || 'Overview'}
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 bg-gray-100"
          aria-label="Toggle sidebar menu"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 p-2.5 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = activeSidebarTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSidebarTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <DynamicIcon name={item.icon} className="w-4 h-4 text-gray-500" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono border border-gray-200">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-56 shrink-0 flex-col border-r border-gray-200 bg-white p-3 justify-between min-h-[calc(100vh-49px)]">
        <div>
          {/* Business Info Header */}
          <div className="pb-3 mb-2 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              {customization.logoUrl && (
                <img
                  src={customization.logoUrl}
                  alt={customization.businessName}
                  className="w-7 h-7 rounded-md object-contain border border-gray-200 bg-gray-50 p-0.5 shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-sm tracking-tight text-gray-900 truncate">
                  {customization.businessName}
                </h2>
                <p className="text-[11px] text-gray-500 truncate">
                  {business.category}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-0.5">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-2.5 py-1">
              Navigation
            </div>
            {sidebarItems.map((item) => {
              const isActive = activeSidebarTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSidebarTab(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gray-100 text-gray-900 font-semibold border border-gray-200/80 shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <DynamicIcon
                      name={item.icon}
                      className={`w-4 h-4 ${isActive ? 'text-gray-900' : 'text-gray-500'}`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        isActive
                          ? 'bg-white text-gray-800 border border-gray-300'
                          : 'bg-gray-100 text-gray-500'
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
        <div className="pt-3 border-t border-gray-100">
          <div className="bg-gray-50 border border-gray-200 rounded-md p-2.5 text-xs space-y-1">
            <div className="font-semibold text-gray-700 text-[10px] uppercase tracking-wider">
              Operational Hub
            </div>
            <div className="flex items-start gap-1.5 text-gray-500 text-[11px]">
              <Phone className="w-3.5 h-3.5 shrink-0 text-gray-400 mt-0.5" />
              <span className="truncate">{customization.phone || '+91 98351 22440'}</span>
            </div>
            <div className="flex items-start gap-1.5 text-gray-500 text-[11px]">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400 mt-0.5" />
              <span className="line-clamp-1">{customization.address || 'Ranchi, Jharkhand'}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
