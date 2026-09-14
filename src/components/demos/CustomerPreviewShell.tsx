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
      <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
              <span>Customer Mobile Experience</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded font-medium">
                Live Loop
              </span>
            </div>
            <p className="text-[11px] text-gray-500">
              Actions taken here immediately post into the Owner's Business Dashboard.
            </p>
          </div>
        </div>

        <button
          onClick={() => setViewMode('dashboard')}
          className="self-start sm:self-auto flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200 transition shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch to Business Dashboard</span>
        </button>
      </div>

      {/* Mock Storefront Wrapper */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Storefront Header */}
        <div className="bg-gray-50 p-6 border-b border-gray-200 text-center relative">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white border border-gray-200 text-[11px] font-medium text-gray-600 uppercase tracking-wider mb-2">
            {business.label}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {customization.businessName}
          </h2>
          <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
            {customization.tagline || business.tagline}
          </p>
          <div className="mt-2 text-xs text-gray-400 flex items-center justify-center gap-2">
            <span>{customization.address}</span>
            <span>•</span>
            <span>{customization.phone}</span>
          </div>
        </div>

        {/* Dynamic Interactive Flow */}
        <div className="p-5 sm:p-6">
          {renderCustomerFlow()}
        </div>
      </div>
    </div>
  );
};
