import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { useWorkflow } from '../../context/WorkflowContext';
import { BUSINESS_CATEGORIES } from '../../data/mockBusinesses';
import { BusinessCategory } from '../../types/showroom';
import { NotificationDropdown } from '../common/NotificationDropdown';
import {
  ArrowLeft,
  RotateCcw,
  SlidersHorizontal,
  LayoutDashboard,
  Eye,
  Globe,
  CheckCircle,
  ChevronDown,
  Zap,
  Sparkles,
  FileCode2,
  Maximize2,
  Minimize2,
  FileText,
  Tag
} from 'lucide-react';

export const DemoToolbar: React.FC = () => {
  const {
    category,
    switchCategory,
    viewMode,
    setViewMode,
    returnToShowroom,
    setIsCustomizeOpen,
    setIsQuickCustomizeOpen,
    setIsRequestBuildOpen,
    setIsResetConfirmOpen,
    customization,
    isCustomized,
    isPresentationMode,
    setIsPresentationMode,
    demoSpeedMode,
    setDemoSpeedMode,
    setIsSalesModeOpen,
    setIsDemoHandoffOpen
  } = useDemo();

  const { triggerQuickDemo, startQuickDemo, isLiveDemoMode, isQuickDemoRunning } = useWorkflow();

  if (isPresentationMode) {
    return (
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm px-4 py-2 shadow-xs flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={returnToShowroom}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-md transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Showroom</span>
          </button>
          <span className="font-bold text-gray-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            {customization.businessName}
          </span>
          <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">
            Presentation Mode
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Modes */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-md border border-gray-200">
            <button
              onClick={() => setViewMode('website')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                viewMode === 'website' ? 'bg-white text-gray-900 font-semibold shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Website
            </button>
            <button
              onClick={() => setViewMode('customer')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                viewMode === 'customer' ? 'bg-white text-gray-900 font-semibold shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Customer Flow
            </button>
            <button
              onClick={() => setViewMode('dashboard')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                viewMode === 'dashboard' ? 'bg-white text-gray-900 font-semibold shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setViewMode('pricing')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                viewMode === 'pricing' ? 'bg-white text-amber-800 font-bold shadow-xs' : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              Pricing
            </button>
          </div>

          <button
            onClick={() => setIsDemoHandoffOpen(true)}
            className="flex items-center gap-1 px-3 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-medium border border-emerald-300 transition text-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Quote</span>
          </button>

          <button
            onClick={() => setIsPresentationMode(false)}
            className="p-1.5 rounded-md bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 transition"
            title="Exit Presentation Mode (P)"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm px-3 sm:px-6 py-2 shadow-xs text-gray-900">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Back button + Category Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={returnToShowroom}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 px-2.5 py-1.5 rounded-md border border-gray-200 transition"
            title="Return to Master Showroom"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Showroom</span>
          </button>

          {/* Category Dropdown Switcher */}
          <div className="relative inline-flex items-center">
            <select
              value={category}
              onChange={(e) => switchCategory(e.target.value as BusinessCategory)}
              className="appearance-none bg-white border border-gray-200 hover:border-gray-300 text-gray-900 font-semibold text-xs sm:text-sm pl-2.5 pr-7 py-1.5 rounded-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-400 transition"
            >
              {BUSINESS_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-white text-gray-900">
                  {cat.label} Demo
                </option>
              ))}
              <option value="custom" className="bg-white text-gray-900">
                Custom Software Blueprint
              </option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 pointer-events-none" />
          </div>

          {/* Active Business Brand Tag */}
          <div className="hidden xl:flex items-center gap-2 text-xs font-medium text-gray-700 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">
            {customization.logoUrl && (
              <img
                src={customization.logoUrl}
                alt="Logo"
                className="w-4 h-4 rounded object-contain"
              />
            )}
            <span>{customization.businessName}</span>
          </div>

          {/* Customized Status Badge */}
          {isCustomized && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Customized</span>
            </div>
          )}

          {/* Presenter Live Mode Tag */}
          {isLiveDemoMode && (
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>LIVE DEMO</span>
            </div>
          )}
        </div>

        {/* Center / Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Demo Button (60s presentation shortcut) */}
          <button
            onClick={() => startQuickDemo(category, 'quick')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-slate-950 font-bold text-xs shadow-xs transition active:scale-95 ${
              isQuickDemoRunning
                ? 'bg-amber-400 ring-2 ring-amber-300'
                : 'bg-amber-500 hover:bg-amber-600'
            }`}
            title="Fast 60-second guided sales workflow (Q)"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">{isQuickDemoRunning ? '60s Running' : 'Quick Demo'}</span>
          </button>

          {/* View Modes Switcher */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-md border border-gray-200 text-xs">
            <button
              onClick={() => setViewMode('dashboard')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded font-medium transition ${
                viewMode === 'dashboard'
                  ? 'bg-white text-gray-900 font-semibold shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              title="View Owner Management Dashboard"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>

            <button
              onClick={() => setViewMode('customer')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded font-medium transition ${
                viewMode === 'customer'
                  ? 'bg-white text-gray-900 font-semibold shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              title="View Customer Booking / Ordering Workflow"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Customer Flow</span>
            </button>

            <button
              onClick={() => setViewMode('website')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded font-medium transition ${
                viewMode === 'website'
                  ? 'bg-white text-gray-900 font-semibold shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              title="View Branded Public Website Storefront"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>Website</span>
            </button>

            <button
              onClick={() => setViewMode('pricing')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded font-semibold transition ${
                viewMode === 'pricing'
                  ? 'bg-white text-amber-800 font-bold shadow-xs'
                  : 'text-amber-700 hover:text-amber-900'
              }`}
              title="View Pricing, Competitor Comparison & Sales Offers"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Pricing</span>
            </button>

            <button
              onClick={() => setViewMode('features')}
              className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition ${
                viewMode === 'features'
                  ? 'bg-white text-gray-900 font-semibold shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Features</span>
            </button>
          </div>

          {/* Notification Bell Dropdown */}
          <NotificationDropdown />

          {/* Quick Rebrander (30s) */}
          <button
            onClick={() => setIsQuickCustomizeOpen(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 px-2.5 sm:px-3 py-1.5 rounded-md border border-gray-200 transition shadow-xs"
            title="Fast 30-second live customizer for prospect"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden md:inline">Quick Brand</span>
          </button>

          {/* Advanced Customizer */}
          <button
            onClick={() => setIsCustomizeOpen(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 px-2.5 sm:px-3 py-1.5 rounded-md border border-gray-200 transition shadow-xs"
            title="Full customizer (logos, services & pricing catalogs)"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden md:inline">Catalog</span>
          </button>

          {/* Request Custom Build Modal CTA */}
          <button
            onClick={() => setIsRequestBuildOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md transition shadow-xs"
            title="Generate custom software blueprint and quote for client"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Blueprint</span>
          </button>

          {/* Package Quote / Handoff Modal Button */}
          <button
            onClick={() => setIsDemoHandoffOpen(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 sm:px-3 py-1.5 rounded-md border border-emerald-300 transition shadow-xs"
            title="Package quote and requirement intake (H)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Quote</span>
          </button>

          {/* Presentation Mode Toggle */}
          <button
            onClick={() => setIsPresentationMode(true)}
            className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 p-1.5 sm:px-2.5 sm:py-1.5 rounded-md border border-gray-200 transition"
            title="Enter distraction-free presentation mode (P)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Reset Demo Button with Confirm Modal */}
          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-rose-600 bg-white hover:bg-gray-50 p-1.5 sm:px-2.5 sm:py-1.5 rounded-md border border-gray-200 transition"
            title="Reset demo back to standard defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
