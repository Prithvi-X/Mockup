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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="p-6 pb-4 border-b border-slate-800 bg-gradient-to-b from-slate-800/60 to-transparent flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Zap className="w-3.5 h-3.5 fill-current" />
                Sales Mode Engine
              </span>
              <span className="text-xs text-slate-400">Field-Ready Presenter Suite</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Launch Sales Presentation
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Brand the software live for your prospect in 30 seconds or trigger a high-velocity 60s demo.
            </p>
          </div>

          <button
            onClick={() => setIsSalesModeOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-900/50 text-sm font-medium">
          <button
            onClick={() => setActiveTab('quick-start')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'quick-start'
                ? 'border-amber-400 text-amber-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>30-Sec Prospect Setup</span>
          </button>
          <button
            onClick={() => setActiveTab('all-demos')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'all-demos'
                ? 'border-amber-400 text-amber-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
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
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Prospect Business Name
                </label>
                <input
                  type="text"
                  value={prospectName}
                  onChange={(e) => setProspectName(e.target.value)}
                  placeholder={`e.g. Royal Crown ${prospectCategory.charAt(0).toUpperCase() + prospectCategory.slice(1)}`}
                  className="w-full px-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Owner WhatsApp / Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={prospectPhone}
                    onChange={(e) => setProspectPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Choose Industry */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
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
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/30'
                          : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-300'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-white leading-tight">{item.name}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Accent Color */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Brand Accent Color
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {PRESET_COLORS.map(c => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setProspectColor(c.key)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                      prospectColor === c.key
                        ? 'border-white bg-slate-800 text-white shadow-sm'
                        : 'border-slate-700 bg-slate-800/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${c.class}`} />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Action */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400 hidden sm:inline">
                Instant setup: updates website, online booking, & owner dashboard in 1 tap.
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 active:scale-95 transition-all"
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
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
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
                        className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80 hover:border-amber-500/50 flex flex-col justify-between transition-all group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <Icon className="w-5 h-5" />
                          </div>
                          <button
                            onClick={() => unpinDemo(cat)}
                            className="text-slate-400 hover:text-rose-400 p-1 rounded-lg transition-colors"
                            title="Unpin"
                          >
                            <Pin className="w-4 h-4 fill-current rotate-45" />
                          </button>
                        </div>

                        <div className="mb-3">
                          <h4 className="font-bold text-white text-sm">{item.name}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{item.tagline}</p>
                        </div>

                        <button
                          onClick={() => handleLaunchStandardQuick(cat)}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                All Available Industry Showrooms
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INDUSTRY_OPTIONS.map(item => {
                  const Icon = item.icon;
                  const isPinned = pinnedDemos.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 hover:bg-slate-800/70 flex items-center justify-between gap-3 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2.5 rounded-xl bg-slate-700/70 text-slate-200">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-white text-sm truncate">{item.name}</div>
                          <div className="text-xs text-slate-400 truncate">{item.tagline}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => isPinned ? unpinDemo(item.id) : pinDemo(item.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isPinned
                              ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                              : 'text-slate-500 hover:text-slate-300 border-slate-700'
                          }`}
                          title={isPinned ? 'Unpin' : 'Pin to top'}
                        >
                          <Pin className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleLaunchStandardQuick(item.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold text-xs border border-slate-600 transition-all flex items-center gap-1 active:scale-95"
                        >
                          <Zap className="w-3 h-3 text-amber-400" />
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
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <button
            onClick={handleHardReset}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors"
            title="Reset customizations and live transactions back to baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Hard Reset (Next Prospect)</span>
          </button>

          <button
            onClick={() => setIsSalesModeOpen(false)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
