import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  X, 
  Scissors, 
  Building2, 
  Utensils, 
  Dumbbell, 
  Stethoscope, 
  Briefcase, 
  Sliders, 
  Pin, 
  RotateCcw, 
  ArrowRight,
  Phone,
  Check
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { useWorkflow } from '../../context/WorkflowContext';
import { BusinessCategory, AccentColor } from '../../types/showroom';
import { BUSINESS_DATA_MAP } from '../../data/mockBusinesses';

interface IndustryOption {
  id: BusinessCategory;
  name: string;
  tagline: string;
  icon: React.ElementType;
  defaultAccent: AccentColor;
}

const INDUSTRY_OPTIONS: IndustryOption[] = [
  { id: 'salon', name: 'Salon & Luxury Spa', tagline: 'Bookings, Stylists & WhatsApp slips', icon: Scissors, defaultAccent: 'amber' },
  { id: 'hotel', name: 'Hotel & Hospitality', tagline: 'Rooms, Front-desk & Check-ins', icon: Building2, defaultAccent: 'indigo' },
  { id: 'restaurant', name: 'Dine-In Restaurant', tagline: 'Digital Menu, KOT & Billing', icon: Utensils, defaultAccent: 'rose' },
  { id: 'gym', name: 'Fitness & Gym Club', tagline: 'Memberships & Biometric check-in', icon: Dumbbell, defaultAccent: 'emerald' },
  { id: 'clinic', name: 'Healthcare Clinic', tagline: 'Doctor tokens & Patient queues', icon: Stethoscope, defaultAccent: 'cyan' },
  { id: 'crm', name: 'Field CRM & Sales', tagline: 'Pipeline leads & Call logging', icon: Briefcase, defaultAccent: 'violet' },
  { id: 'custom', name: 'Custom Enterprise', tagline: 'Multi-branch & Bespoke workflows', icon: Sliders, defaultAccent: 'rose' },
];

const PRESET_COLORS: { name: string; key: AccentColor; class: string }[] = [
  { name: 'Amber / Gold', key: 'amber', class: 'bg-amber-500' },
  { name: 'Royal Indigo', key: 'indigo', class: 'bg-indigo-600' },
  { name: 'Emerald Green', key: 'emerald', class: 'bg-emerald-600' },
  { name: 'Rose Red', key: 'rose', class: 'bg-rose-600' },
  { name: 'Sky / Cyan', key: 'cyan', class: 'bg-cyan-600' },
  { name: 'Violet', key: 'violet', class: 'bg-violet-600' }
];

export const SalesModeLauncherModal: React.FC = () => {
  const { 
    isSalesModeOpen, 
    setIsSalesModeOpen, 
    openDemo, 
    updateCustomization, 
    hardResetDemo, 
    pinnedDemos, 
    pinDemo, 
    unpinDemo,
    showToast
  } = useDemo();

  const { startQuickDemo } = useWorkflow();

  // Rapid Customizer state
  const [activeTab, setActiveTab] = useState<'quick-start' | 'all-demos'>('quick-start');
  const [prospectName, setProspectName] = useState('');
  const [prospectCategory, setProspectCategory] = useState<BusinessCategory>('salon');
  const [prospectPhone, setProspectPhone] = useState('+91 98765 43210');
  const [prospectColor, setProspectColor] = useState<AccentColor>('amber');

  if (!isSalesModeOpen) return null;

  const handleLaunchCustomDemo = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = prospectName.trim() || BUSINESS_DATA_MAP[prospectCategory].name;
    
    // Apply custom styling & details
    updateCustomization({
      businessName: finalName,
      phone: prospectPhone,
      accentColor: prospectColor
    });

    setIsSalesModeOpen(false);
    openDemo(prospectCategory, 'website');
    startQuickDemo(prospectCategory, 'quick');
    showToast(`⚡ Sales Mode: Initialized 60s demo for ${finalName}!`);
  };

  const handleLaunchStandardQuick = (cat: BusinessCategory) => {
    setIsSalesModeOpen(false);
    openDemo(cat, 'website');
    startQuickDemo(cat, 'quick');
    showToast(`⚡ Running 60s Quick Demo for ${BUSINESS_DATA_MAP[cat].name}`);
  };

  const handleHardReset = () => {
    if (window.confirm('Reset all demo customizations and live state for your next prospect?')) {
      hardResetDemo();
      setIsSalesModeOpen(false);
      showToast('All demos reset to factory state.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden text-gray-900 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="p-6 pb-4 border-b border-gray-200 bg-white flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Zap className="w-3.5 h-3.5 fill-current" />
                Sales Mode Engine
              </span>
              <span className="text-xs text-gray-500">Field-Ready Presenter Suite</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Launch Sales Presentation
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">
              Brand the software live for your prospect in 30 seconds or trigger a high-velocity 60s demo.
            </p>
          </div>

          <button
            onClick={() => setIsSalesModeOpen(false)}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 px-6 bg-gray-50 text-xs font-medium">
          <button
            onClick={() => setActiveTab('quick-start')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'quick-start'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>30-Sec Prospect Setup</span>
          </button>
          <button
            onClick={() => setActiveTab('all-demos')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'all-demos'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Pinned & Quick Launch Demos</span>
          </button>
        </div>

        {/* Tab 1: 30-Sec Rapid Setup */}
        {activeTab === 'quick-start' && (
          <form onSubmit={handleLaunchCustomDemo} className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Prospect Business Name
                </label>
                <input
                  type="text"
                  value={prospectName}
                  onChange={(e) => setProspectName(e.target.value)}
                  placeholder={`e.g. Royal Crown ${prospectCategory.charAt(0).toUpperCase() + prospectCategory.slice(1)}`}
                  className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Owner WhatsApp / Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    value={prospectPhone}
                    onChange={(e) => setProspectPhone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Choose Industry */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Select Prospect Industry
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {INDUSTRY_OPTIONS.map((item) => {
                  const Icon = item.icon;
                  const isSelected = prospectCategory === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setProspectCategory(item.id);
                        setProspectColor(item.defaultAccent);
                      }}
                      className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'bg-indigo-50/50 border-indigo-600 ring-1 ring-indigo-600'
                          : 'bg-white hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-md ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-gray-900 leading-tight">{item.name}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Accent Color */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Brand Accent Color
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {PRESET_COLORS.map(c => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setProspectColor(c.key)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-all ${
                      prospectColor === c.key
                        ? 'border-gray-900 bg-gray-100 text-gray-900 font-semibold shadow-xs'
                        : 'border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${c.class}`} />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Action */}
            <div className="pt-3 border-t border-gray-200 flex items-center justify-between gap-3">
              <span className="text-xs text-gray-500 hidden sm:inline">
                Instant setup: updates website, online booking, & owner dashboard in 1 tap.
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs active:scale-98 transition-all"
              >
                <span>🚀 Launch 60-Second Custom Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Pinned & All Demos */}
        {activeTab === 'all-demos' && (
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Pinned Section */}
            {pinnedDemos.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3 flex items-center gap-1.5">
                  <Pin className="w-3.5 h-3.5 fill-current" />
                  Pinned Favorites
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {pinnedDemos.map(cat => {
                    const item = INDUSTRY_OPTIONS.find(i => i.id === cat);
                    if (!item) return null;
                    const Icon = item.icon;
                    return (
                      <div
                        key={cat}
                        className="p-4 rounded-lg bg-white border border-gray-200 hover:border-gray-300 shadow-xs flex flex-col justify-between transition-all group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                            <Icon className="w-5 h-5" />
                          </div>
                          <button
                            onClick={() => unpinDemo(cat)}
                            className="text-gray-400 hover:text-rose-600 p-1 rounded transition-colors"
                            title="Unpin"
                          >
                            <Pin className="w-4 h-4 fill-current rotate-45" />
                          </button>
                        </div>

                        <div className="mb-3">
                          <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{item.tagline}</p>
                        </div>

                        <button
                          onClick={() => handleLaunchStandardQuick(cat)}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all active:scale-98"
                        >
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          Run 60s Demo
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All Demos */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                All Available Industry Showrooms
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INDUSTRY_OPTIONS.map(item => {
                  const Icon = item.icon;
                  const isPinned = pinnedDemos.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-between gap-3 transition-all shadow-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-md bg-gray-100 text-gray-700">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 text-xs truncate">{item.name}</div>
                          <div className="text-[11px] text-gray-500 truncate">{item.tagline}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => isPinned ? unpinDemo(item.id) : pinDemo(item.id)}
                          className={`p-1.5 rounded-md border transition-colors ${
                            isPinned
                              ? 'text-indigo-600 border-indigo-200 bg-indigo-50'
                              : 'text-gray-400 hover:text-gray-600 border-gray-200'
                          }`}
                          title={isPinned ? 'Unpin' : 'Pin to top'}
                        >
                          <Pin className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleLaunchStandardQuick(item.id)}
                          className="px-3 py-1.5 rounded-md bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs border border-gray-300 transition-all flex items-center gap-1 active:scale-98 shadow-xs"
                        >
                          <Zap className="w-3 h-3 text-indigo-600" />
                          <span>Demo</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 px-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <button
            onClick={handleHardReset}
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-rose-600 transition-colors"
            title="Reset customizations and live transactions back to baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Hard Reset (Next Prospect)</span>
          </button>

          <button
            onClick={() => setIsSalesModeOpen(false)}
            className="px-3.5 py-1.5 rounded-md bg-white hover:bg-gray-100 text-gray-700 font-medium border border-gray-300 shadow-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
