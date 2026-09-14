import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { BUSINESS_DATA_MAP } from '../../data/mockBusinesses';
import { Smartphone, ArrowLeft } from 'lucide-react';
import { SalonBookingFlow } from './customer/SalonBookingFlow';
import { HotelBookingFlow } from './customer/HotelBookingFlow';
import { RestaurantOrderFlow } from './customer/RestaurantOrderFlow';
import { GymJoinFlow } from './customer/GymJoinFlow';
import { ClinicAppointmentFlow } from './customer/ClinicAppointmentFlow';
import { CrmInquiryFlow } from './customer/CrmInquiryFlow';

export const CustomerPreviewShell: React.FC = () => {
  const { category, setViewMode, customization } = useDemo();
  const business = BUSINESS_DATA_MAP[category] || BUSINESS_DATA_MAP.salon;

  const renderCustomerFlow = () => {
    switch (category) {
      case 'salon':
        return <SalonBookingFlow />;
      case 'hotel':
        return <HotelBookingFlow />;
      case 'restaurant':
        return <RestaurantOrderFlow />;
      case 'gym':
        return <GymJoinFlow />;
      case 'clinic':
        return <ClinicAppointmentFlow />;
      case 'crm':
      case 'custom':
      default:
        return <CrmInquiryFlow />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Simulator Banner */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Customer-Facing Mobile Experience</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded font-semibold">
                Interactive Loop
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              Actions taken here immediately post into the Owner's Business Dashboard.
            </p>
          </div>
        </div>

        <button
          onClick={() => setViewMode('dashboard')}
          className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 px-3.5 py-2 rounded-xl border border-neutral-700 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch to Business Dashboard</span>
        </button>
      </div>

      {/* Mock Storefront Wrapper */}
      <div className="bg-neutral-900/70 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Storefront Header */}
        <div className="bg-neutral-950 p-6 sm:p-7 border-b border-neutral-800 text-center relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-2">
            {business.label}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {customization.businessName}
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
            {customization.tagline || business.tagline}
          </p>
          <div className="mt-2 text-xs text-neutral-400 flex items-center justify-center gap-3">
            <span>{customization.address}</span>
            <span>•</span>
            <span>{customization.phone}</span>
          </div>
        </div>

        {/* Dynamic Interactive Flow */}
        <div className="p-6 sm:p-8">
          {renderCustomerFlow()}
        </div>
      </div>
    </div>
  );
};
