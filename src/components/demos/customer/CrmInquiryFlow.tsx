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
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center space-y-4 shadow-sm animate-in fade-in duration-200">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-0.5">
              Inquiry Logged
            </div>
            <h3 className="text-xl font-bold text-gray-900">Lead Ref #{leadCode}</h3>
            <p className="text-xs text-gray-500 mt-1">
              Thank you, {contactPerson}. Your request has been added to our active sales pipeline.
            </p>
          </div>

          <div className="bg-gray-50 p-3.5 rounded-md border border-gray-200 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between border-b border-gray-200 pb-1.5">
              <span className="text-gray-500">Company</span>
              <span className="font-semibold text-gray-900">{companyName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1.5">
              <span className="text-gray-500">Requirement</span>
              <span className="font-medium text-gray-900">{requirement}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Pipeline Stage</span>
              <span className="font-semibold text-violet-700">New Inquiry (Priority)</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={() => setViewMode('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-gray-900 hover:bg-gray-800 text-white font-medium text-xs shadow-sm transition"
            >
              <span>View in Deal Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full sm:w-auto text-xs text-gray-500 hover:text-gray-900 px-3 py-1.5"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Request a Custom Proposal</h3>
            <p className="text-xs text-gray-500">Tell us what your business needs and receive a tailored software estimate.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 mb-1 font-medium text-[11px]">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Rahul Enterprises"
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium text-[11px]">
                  Contact Person *
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Rahul Verma"
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 mb-1 font-medium text-[11px]">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98351 00880"
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium text-[11px]">
                  Target Budget
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500"
                >
                  <option value="₹25,000 - ₹40,000">₹25,000 - ₹40,000 (Starter)</option>
                  <option value="₹40,000 - ₹60,000">₹40,000 - ₹60,000 (Standard)</option>
                  <option value="₹60,000 - ₹1,20,000">₹60,000 - ₹1,20,000 (Advanced)</option>
                  <option value="₹1,20,000+">₹1,20,000+ (Enterprise)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium text-[11px]">
                Software / Workflow Needs
              </label>
              <textarea
                rows={2}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="e.g. Website with customer booking, staff scheduling & payment reminders"
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none"
                required
              />
            </div>
          </div>

          {/* Action */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-700 text-white font-medium text-xs shadow-sm transition"
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
