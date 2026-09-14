import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Modal } from './Modal';
import { CheckCircle2, Send } from 'lucide-react';

export const BookDemoModal: React.FC = () => {
  const { isBookDemoOpen, setIsBookDemoOpen, showToast } = useDemo();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessType: 'Salon / Beauty',
    whatsapp: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Demo request received! We will connect on WhatsApp shortly.');
    setTimeout(() => {
      setSubmitted(false);
      setIsBookDemoOpen(false);
      setFormData({ name: '', businessType: 'Salon / Beauty', whatsapp: '', notes: '' });
    }, 2000);
  };

  return (
    <Modal
      isOpen={isBookDemoOpen}
      onClose={() => setIsBookDemoOpen(false)}
      title="Schedule a Private Demo"
      subtitle="See how a custom software solution can be designed for your exact business."
      maxWidth="max-w-md"
    >
      {submitted ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center shadow-2xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-semibold text-gray-900">Demo Request Received</h4>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            We will message your WhatsApp number within a few hours to arrange a personalized walkthrough.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ramesh Kumar"
              className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Business Category
            </label>
            <select
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
            >
              <option value="Salon / Beauty">Salon & Beauty Studio</option>
              <option value="Hotel / Guest House">Hotel & Hospitality</option>
              <option value="Restaurant / Café">Restaurant & Café</option>
              <option value="Gym / Fitness Club">Gym & Fitness Center</option>
              <option value="Clinic / Healthcare">Doctor Clinic & Healthcare</option>
              <option value="Wholesale / Distributor">Wholesale & Distribution</option>
              <option value="Workshop / Garage">Auto Repair / Workshop</option>
              <option value="Other Custom Business">Other Custom Workflow</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              WhatsApp / Phone
            </label>
            <input
              type="tel"
              required
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="+91 98350 00000"
              className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              What would make your business easier?
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Stop missed appointments, track staff commissions..."
              className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition resize-none"
            />
          </div>

          <div className="pt-2 border-t border-gray-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsBookDemoOpen(false)}
              className="px-4 py-2 text-xs font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition shadow-2xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition"
            >
              <Send className="w-3.5 h-3.5" />
              Book Walkthrough
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
