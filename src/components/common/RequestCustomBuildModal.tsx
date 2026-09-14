import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Modal } from './Modal';
import { CheckCircle, Sparkles, Send, Copy, Check } from 'lucide-react';

export const RequestCustomBuildModal: React.FC = () => {
  const { isRequestBuildOpen, setIsRequestBuildOpen, customization, showToast, category } = useDemo();

  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState(customization.phone || '');
  const [timeline, setTimeline] = useState('10-14 Days (Rapid Launch)');
  const [budgetRange, setBudgetRange] = useState('₹35,000 - ₹65,000');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'Branded Customer Website & Mobile View',
    'Automated WhatsApp Booking / Invoicing',
    'Owner Real-Time Business Dashboard'
  ]);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const availableModules = [
    'Branded Customer Website & Mobile View',
    'Automated WhatsApp Booking / Invoicing',
    'Instant UPI QR Collection & Digital Receipts',
    'Owner Real-Time Business Dashboard',
    'Staff Shifts & Commission Tracking',
    'Multi-Location / Multi-Branch Sync'
  ];

  const toggleModule = (mod: string) => {
    setSelectedModules(prev =>
      prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Custom build blueprint generated!');
  };

  const handleCopySummary = () => {
    const text = `ATMAN CUSTOM SOFTWARE BLUEPRINT\n` +
      `Business: ${customization.businessName} (${category.toUpperCase()})\n` +
      `Contact: ${contactName || 'Owner'} (${contactPhone})\n` +
      `Target Timeline: ${timeline}\n` +
      `Estimated Budget: ${budgetRange}\n` +
      `Modules:\n${selectedModules.map(m => ` - ${m}`).join('\n')}\n` +
      (notes ? `Notes: ${notes}\n` : '') +
      `Generated from ATMAN Master Software Showroom`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Blueprint copied to clipboard!');
  };

  const handleClose = () => {
    setIsRequestBuildOpen(false);
    setTimeout(() => setIsSubmitted(false), 300);
  };

  return (
    <Modal
      isOpen={isRequestBuildOpen}
      onClose={handleClose}
      title={isSubmitted ? "Custom Architecture Blueprint Generated" : "Request Custom Build For This Business"}
      subtitle={isSubmitted ? `Tailored specifications for ${customization.businessName}` : `Configure the scope and get an instant architecture plan for ${customization.businessName}`}
      maxWidth="max-w-xl"
    >
      {isSubmitted ? (
        <div className="space-y-5 text-neutral-200">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <h4 className="font-semibold text-emerald-300 text-sm">Specification Sheet Ready</h4>
              <p className="text-neutral-300 leading-relaxed">
                We've configured the software specification for <strong className="text-white">{customization.businessName}</strong>. You can share this blueprint directly with the business owner right now.
              </p>
            </div>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
              <span className="text-neutral-500">SPEC REF #</span>
              <span className="text-white font-semibold">ATMAN-ARCH-2026-X8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">BUSINESS</span>
              <span className="text-white">{customization.businessName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">CONTACT</span>
              <span className="text-white">{contactName || 'Owner'} ({contactPhone || 'N/A'})</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">ESTIMATED TIMELINE</span>
              <span className="text-neutral-300">{timeline}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">TARGET BUDGET</span>
              <span className="text-emerald-400 font-semibold">{budgetRange}</span>
            </div>
            <div className="pt-2 border-t border-neutral-800/80">
              <span className="text-neutral-500 block mb-1.5 font-sans uppercase tracking-wider text-[10px]">Configured Modules ({selectedModules.length})</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 font-sans text-xs">
                {selectedModules.map(m => (
                  <div key={m} className="flex items-center gap-1.5 text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={handleCopySummary}
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied to Clipboard' : 'Copy Blueprint Summary'}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-neutral-950/70 p-3 rounded-lg border border-neutral-800 text-xs text-neutral-400 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              Fill in what the prospect wants during your sales pitch. This generates a structured proposal preview to close the deal on the spot.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                Owner / Manager Name
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. Ramesh Singh"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-neutral-600 transition"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                Phone / WhatsApp Number
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+91 98351 00000"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-neutral-600 transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
              Required Modules
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableModules.map(mod => {
                const checked = selectedModules.includes(mod);
                return (
                  <button
                    type="button"
                    key={mod}
                    onClick={() => toggleModule(mod)}
                    className={`flex items-start gap-2 p-2.5 rounded-lg border text-left text-xs transition ${
                      checked
                        ? 'bg-neutral-900 border-indigo-500/40 text-white'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                      checked ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-neutral-700 bg-neutral-900'
                    }`}>
                      {checked && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span>{mod}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                Target Launch Timeline
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 transition"
              >
                <option value="10-14 Days (Rapid Launch)">10-14 Days (Rapid Launch)</option>
                <option value="3-4 Weeks (Custom Tailored)">3-4 Weeks (Custom Tailored)</option>
                <option value="6+ Weeks (Multi-outlet Enterprise)">6+ Weeks (Multi-outlet Enterprise)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                Target Budget Range
              </label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 transition"
              >
                <option value="₹25,000 - ₹45,000">₹25,000 - ₹45,000 (Starter)</option>
                <option value="₹45,000 - ₹90,000">₹45,000 - ₹90,000 (Growth Pro)</option>
                <option value="₹90,000 - ₹2,00,000+">₹90,000 - ₹2,00,000+ (Full Suite)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
              Special Workflow Requirements
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Needs direct sync with existing thermal receipt printer, or specific doctor timings on Tuesdays."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 transition resize-none"
            />
          </div>

          <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white bg-transparent hover:bg-neutral-800 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition"
            >
              <Send className="w-3.5 h-3.5" />
              Generate Software Blueprint
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
