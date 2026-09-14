import React, { useState } from 'react';
import { useWorkflow } from '../../../context/WorkflowContext';
import { useDemo } from '../../../context/DemoContext';
import { Briefcase, Check, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CrmInquiryFlow: React.FC = () => {
  const { addCrmLead } = useWorkflow();
  const { customization, setViewMode } = useDemo();

  const [companyName, setCompanyName] = useState('Rahul Enterprises');
  const [contactPerson, setContactPerson] = useState('Rahul Verma');
  const [phone, setPhone] = useState('+91 98351 00880');
  const [requirement, setRequirement] = useState('Website + Customer Booking System');
  const [budgetRange, setBudgetRange] = useState('₹40,000 - ₹60,000');
  const [leadCode, setLeadCode] = useState('LEAD-506');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `LEAD-${Math.floor(500 + Math.random() * 500)}`;
    setLeadCode(code);

    addCrmLead({
      leadCode: code,
      companyName: companyName.trim() || 'Rahul Enterprises',
      contactPerson: contactPerson.trim() || 'Rahul Verma',
      phone: phone.trim() || '+91 98351 00880',
      requirement: requirement.trim(),
      budgetRange: budgetRange,
      estimatedValue: 45000,
      stage: 'New',
      notes: 'Inquiry submitted via online showroom portal.'
    });

    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {isSubmitted ? (
        <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-8 text-center space-y-5 animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              Inquiry Logged
            </div>
            <h3 className="text-2xl font-extrabold text-white">Lead Ref #{leadCode}</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Thank you, {contactPerson}. Your request has been added to our active sales pipeline.
            </p>
          </div>

          <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Company</span>
              <span className="font-semibold text-white">{companyName}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Requirement</span>
              <span className="font-semibold text-white">{requirement}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Pipeline Stage</span>
              <span className="font-bold text-violet-400">New Inquiry (Priority)</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setViewMode('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-semibold text-xs transition shadow"
            >
              <span>View in Deal Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full sm:w-auto text-xs text-neutral-400 hover:text-white px-3 py-2"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Request a Custom Proposal</h3>
            <p className="text-xs text-neutral-400">Tell us what your business needs and receive a tailored software estimate.</p>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Rahul Enterprises"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">
                  Contact Person *
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Rahul Verma"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98351 00880"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">
                  Target Budget
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                >
                  <option value="₹25,000 - ₹40,000">₹25,000 - ₹40,000 (Starter)</option>
                  <option value="₹40,000 - ₹60,000">₹40,000 - ₹60,000 (Standard)</option>
                  <option value="₹60,000 - ₹1,20,000">₹60,000 - ₹1,20,000 (Advanced)</option>
                  <option value="₹1,20,000+">₹1,20,000+ (Enterprise)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1 font-semibold uppercase tracking-wider text-[10px]">
                Software / Workflow Needs
              </label>
              <textarea
                rows={2}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="e.g. Website with customer booking, staff scheduling & payment reminders"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white resize-none"
                required
              />
            </div>
          </div>

          {/* Action */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md transition"
            >
              <Check className="w-4 h-4" />
              <span>Submit Inquiry & Create Deal</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
