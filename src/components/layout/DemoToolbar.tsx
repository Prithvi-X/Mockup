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
  FileText
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
      <div className="sticky top-0 z-40 border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md px-4 py-2 shadow-sm flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={returnToShowroom}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900 px-2.5 py-1 rounded-lg border border-neutral-800 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Showroom</span>
          </button>
          <span className="font-bold text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            {customization.businessName}
          </span>
          <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 uppercase">
            Presentation Mode
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Modes */}
          <div className="flex items-center bg-neutral-900 p-0.5 rounded-lg border border-neutral-800">
            <button
              onClick={() => setViewMode('website')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                viewMode === 'website' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Website
            </button>
            <button
              onClick={() => setViewMode('customer')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                viewMode === 'customer' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Customer Flow
            </button>
            <button
              onClick={() => setViewMode('dashboard')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                viewMode === 'dashboard' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Dashboard
            </button>
          </div>

          <button
            onClick={() => setIsDemoHandoffOpen(true)}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold border border-emerald-500/30 transition text-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Quote</span>
          </button>

          <button
            onClick={() => setIsPresentationMode(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Exit Presentation Mode (P)"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-md px-3 sm:px-6 py-2.5 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Back button + Category Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={returnToShowroom}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-2.5 py-1.5 rounded-lg border border-neutral-800 transition"
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
              className="appearance-none bg-neutral-900 border border-neutral-700/80 hover:border-neutral-600 text-white font-semibold text-xs sm:text-sm pl-2.5 pr-7 py-1.5 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
            >
              {BUSINESS_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-neutral-900 text-white">
                  {cat.label} Demo
                </option>
              ))}
              <option value="custom" className="bg-neutral-900 text-white">
                Custom Software Blueprint
              </option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 pointer-events-none" />
          </div>

          {/* Active Business Brand Tag */}
          <div className="hidden xl:flex items-center gap-2 text-xs font-semibold text-neutral-300 bg-neutral-900/90 px-2.5 py-1 rounded-md border border-neutral-800">
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
            <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Customized</span>
            </div>
          )}

          {/* Presenter Live Mode Tag */}
          {isLiveDemoMode && (
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE DEMO</span>
            </div>
          )}
        </div>

        {/* Center / Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Demo Button (60s presentation shortcut) */}
          <button
            onClick={() => startQuickDemo(category, 'quick')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-neutral-950 font-bold text-xs shadow-sm transition transform active:scale-95 ${
              isQuickDemoRunning
                ? 'bg-amber-400 ring-2 ring-amber-300'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500'
            }`}
            title="Fast 60-second guided sales workflow (Q)"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">{isQuickDemoRunning ? '60s Running' : 'Quick Demo'}</span>
          </button>

          {/* View Modes Switcher */}
          <div className="flex items-center bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-xs">
            <button
              onClick={() => setViewMode('dashboard')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md font-medium transition ${
                viewMode === 'dashboard'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="View Owner Management Dashboard"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>

            <button
              onClick={() => setViewMode('customer')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md font-medium transition ${
                viewMode === 'customer'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="View Customer Booking / Ordering Workflow"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Customer Flow</span>
            </button>

            <button
              onClick={() => setViewMode('website')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md font-medium transition ${
                viewMode === 'website'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="View Branded Public Website Storefront"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Website</span>
            </button>

            <button
              onClick={() => setViewMode('features')}
              className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition ${
                viewMode === 'features'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
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
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-100 bg-neutral-900 hover:bg-neutral-800 px-2.5 sm:px-3 py-1.5 rounded-lg border border-neutral-700 transition shadow-sm"
            title="Fast 30-second live customizer for prospect"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Quick Brand</span>
          </button>

          {/* Advanced Customizer */}
          <button
            onClick={() => setIsCustomizeOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-100 bg-white/10 hover:bg-white/20 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/20 transition shadow-sm"
            title="Full customizer (logos, services & pricing catalogs)"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">Catalog</span>
          </button>

          {/* Request Custom Build Modal CTA */}
          <button
            onClick={() => setIsRequestBuildOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition shadow-sm"
            title="Generate custom software blueprint and quote for client"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Blueprint</span>
          </button>

          {/* Package Quote / Handoff Modal Button */}
          <button
            onClick={() => setIsDemoHandoffOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/20 hover:bg-emerald-500/30 px-2.5 sm:px-3 py-1.5 rounded-lg border border-emerald-500/30 transition shadow-sm"
            title="Package quote and requirement intake (H)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Quote</span>
          </button>

          {/* Presentation Mode Toggle */}
          <button
            onClick={() => setIsPresentationMode(true)}
            className="flex items-center gap-1 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-neutral-800 transition"
            title="Enter distraction-free presentation mode (P)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Reset Demo Button with Confirm Modal */}
          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="flex items-center gap-1 text-xs font-medium text-neutral-400 hover:text-rose-400 bg-neutral-900 hover:bg-neutral-800 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-neutral-800 transition"
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
