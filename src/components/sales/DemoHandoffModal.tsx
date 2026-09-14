import React, { useState } from 'react';
import { 
  X, 
  Check, 
  FileText, 
  Sparkles, 
  Send, 
  DollarSign, 
  Layers, 
  Calendar, 
  Clock, 
  Phone, 
  User, 
  Building, 
  Copy, 
  CheckCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { useWorkflow } from '../../context/WorkflowContext';
import { PACKAGES_CONFIG } from '../../data/packagesConfig';
import { BusinessCategory } from '../../types/showroom';
import { SalesRequirementInquiry } from '../../types/salesMode';

const ALL_MODULES = [
  'Branded Responsive Website',
  'Customer Online Booking / Ordering Flow',
  'WhatsApp Instant Slips & SMS Reminders',
  'Owner Real-Time Operations Dashboard',
  'Live Queue / Token System / KOT Display',
  'Customer History & Loyalty Profiles',
  'Staff Commission & Attendance Tracking',
  'Daily Revenue & Cash vs UPI Reports',
  'Multi-Branch & Franchise Sync'
];

export const DemoHandoffModal: React.FC = () => {
  const { 
    isDemoHandoffOpen, 
    setIsDemoHandoffOpen, 
    customization, 
    category,
    showToast 
  } = useDemo();

  const { 
    savedInquiries, 
    saveRequirementInquiry, 
    openWhatsAppModal 
  } = useWorkflow();

  const [activeTab, setActiveTab] = useState<'packages' | 'intake' | 'saved'>('packages');

  // Form State
  const [businessName, setBusinessName] = useState(customization.businessName || '');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState(customization.phone || '+91 ');
  const [selectedCat, setSelectedCat] = useState<BusinessCategory>(category);
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'Branded Responsive Website',
    'Customer Online Booking / Ordering Flow',
    'WhatsApp Instant Slips & SMS Reminders',
    'Owner Real-Time Operations Dashboard'
  ]);
  const [budgetTier, setBudgetTier] = useState('₹32,000 - ₹55,000 (Recommended)');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isDemoHandoffOpen) return null;

  const handleSelectPackage = (pkgTitle: string, price: number) => {
    setBudgetTier(`₹${price.toLocaleString('en-IN')} (${pkgTitle})`);
    setActiveTab('intake');
    showToast(`Selected ${pkgTitle} tier for proposal.`);
  };

  const toggleModule = (moduleName: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleName) 
        ? prev.filter(m => m !== moduleName) 
        : [...prev, moduleName]
    );
  };

  const handleSaveInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      showToast('Please specify a business name.');
      return;
    }

    const inquiry: SalesRequirementInquiry = {
      businessName: businessName.trim(),
      contactName: contactName.trim() || 'Business Owner',
      phone: phone.trim() || '+91 98765 43210',
      category: selectedCat,
      modules: selectedModules,
      budgetTier,
      notes: notes.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString()
    };

    saveRequirementInquiry(inquiry);
    setSubmitted(true);
    showToast(`Requirements saved for ${inquiry.businessName}!`);

    // Simulated WhatsApp Quote Message
    setTimeout(() => {
      openWhatsAppModal(
        inquiry.contactName,
        inquiry.phone,
        `Hello ${inquiry.contactName}! Thank you for reviewing the custom software presentation for *${inquiry.businessName}*.\n\n` +
        `Summary of your selected architecture:\n` +
        `• Target Tier: ${inquiry.budgetTier}\n` +
        `• Key Modules: ${inquiry.modules.slice(0, 3).join(', ')} (+${Math.max(0, inquiry.modules.length - 3)} more)\n` +
        `• Next Step: We will prepare your live prototype sandbox within 48 hours.\n\n` +
        `Best regards,\nATMAN Software Solutions`,
        `Formal Quotation Slip: ${inquiry.businessName}`
      );
    }, 400);
  };

  const handleCopySummary = (item: SalesRequirementInquiry, index: number) => {
    const summary = `PROSPECT REQUIREMENT SUMMARY:\nBusiness: ${item.businessName}\nContact: ${item.contactName} (${item.phone})\nIndustry: ${item.category}\nBudget Tier: ${item.budgetTier}\nModules: ${item.modules.join(', ')}\nNotes: ${item.notes || 'None'}\nRecorded: ${item.timestamp}`;
    navigator.clipboard.writeText(summary);
    setCopiedId(`saved-${index}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-800 bg-gradient-to-b from-slate-800/60 to-transparent flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <FileText className="w-3.5 h-3.5" />
                Sales Handoff & Quotation
              </span>
              <span className="text-xs text-slate-400">Prospect: {customization.businessName}</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Package Quotation & Requirement Intake
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Select an implementation package or capture custom software requirements directly during your client meeting.
            </p>
          </div>

          <button
            onClick={() => setIsDemoHandoffOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-900/50 text-sm font-medium">
          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'packages'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Package Cards (Transparent Pricing)</span>
          </button>
          <button
            onClick={() => setActiveTab('intake')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'intake'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Record Prospect Requirements</span>
          </button>
          {savedInquiries.length > 0 && (
            <button
              onClick={() => setActiveTab('saved')}
              className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'saved'
                  ? 'border-emerald-400 text-emerald-400 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCheck className="w-4 h-4" />
              <span>Saved Inquiries ({savedInquiries.length})</span>
            </button>
          )}
        </div>

        {/* TAB 1: Package Cards */}
        {activeTab === 'packages' && (
          <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h3 className="text-lg font-bold text-white">Transparent Software Investment Tiers</h3>
              <p className="text-xs text-slate-400">
                100% custom-built for local business ownership. No recurring monthly revenue share or transaction commissions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {PACKAGES_CONFIG.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-2xl p-5 border flex flex-col justify-between transition-all relative ${
                    pkg.isPopular
                      ? 'bg-slate-800/90 border-amber-500/70 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/30'
                      : 'bg-slate-800/40 border-slate-700/80 hover:bg-slate-800/70'
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      {pkg.tag}
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">{pkg.title}</h4>
                    
                    <div className="mt-3 mb-3">
                      <span className="text-xs text-slate-400">Starting from</span>
                      <div className="text-2xl font-extrabold text-amber-400">
                        ₹{pkg.startingPrice.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {pkg.description}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-slate-700/60 mb-5">
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectPackage(pkg.title, pkg.startingPrice)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                      pkg.isPopular
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    <span>Choose {pkg.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Save Requirements Form */}
        {activeTab === 'intake' && (
          <form onSubmit={handleSaveInquiry} className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
            {submitted && (
              <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center justify-between gap-3 text-emerald-300 text-xs animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-5 h-5 text-emerald-400" />
                  <span>Requirement saved! Simulated WhatsApp quote generated for prospect review.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="font-semibold underline hover:text-white"
                >
                  Create Another
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Contact Person
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Vikram Malhotra (Owner)"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Scope Modules Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                Required Functional Modules
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {ALL_MODULES.map((mod) => {
                  const isChecked = selectedModules.includes(mod);
                  return (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => toggleModule(mod)}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all text-xs ${
                        isChecked 
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-white font-medium'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isChecked ? 'bg-emerald-500 text-slate-950' : 'border border-slate-600 bg-slate-800'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="leading-tight">{mod}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Budget Tier & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Budget Tier
                </label>
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="₹18,000 (Starter Website)">₹18,000 (Starter Website)</option>
                  <option value="₹32,000 (Website + Booking)">₹32,000 (Website + Booking)</option>
                  <option value="₹55,000 (Full Business Suite)">₹55,000 (Full Business Management Suite)</option>
                  <option value="₹85,000+ (Custom Enterprise)">₹85,000+ (Custom Enterprise)</option>
                  <option value="₹32,000 - ₹55,000 (Recommended)">₹32,000 - ₹55,000 (Flexible Scope)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Notes / Specific Requirements
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Needs Hindi language option, 2 receipt printers"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Saves locally to your device and prepares a formal WhatsApp proposal slip.
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Save & Generate WhatsApp Slip</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: Saved Inquiries */}
        {activeTab === 'saved' && (
          <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Logged Prospect Requirements ({savedInquiries.length})
              </h3>
              <span className="text-xs text-slate-400">Stored locally in your browser</span>
            </div>

            <div className="space-y-3">
              {savedInquiries.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-slate-600 transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{item.businessName}</h4>
                      <p className="text-xs text-slate-400">
                        {item.contactName} • {item.phone} • <span className="capitalize">{item.category}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        {item.budgetTier}
                      </span>
                      <button
                        onClick={() => handleCopySummary(item, idx)}
                        className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                        title="Copy Summary"
                      >
                        {copiedId === `saved-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {item.modules.map((m, mIdx) => (
                      <span key={mIdx} className="text-[11px] bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded-md">
                        {m}
                      </span>
                    ))}
                  </div>

                  {item.notes && (
                    <p className="text-xs text-slate-400 italic">
                      Notes: {item.notes}
                    </p>
                  )}

                  <div className="text-[10px] text-slate-500 pt-1">
                    Recorded: {item.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>
            Ready to deploy: All software solutions are standalone and offline-hardened.
          </span>
          <button
            onClick={() => setIsDemoHandoffOpen(false)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
