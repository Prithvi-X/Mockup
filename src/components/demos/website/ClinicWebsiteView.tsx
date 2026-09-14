import React from 'react';
import { useDemo } from '../../../context/DemoContext';
import { useWorkflow } from '../../../context/WorkflowContext';
import {
  Stethoscope,
  Sparkles,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  FileText,
  ArrowRight,
  Activity,
  HeartPulse
} from 'lucide-react';

export const ClinicWebsiteView: React.FC = () => {
  const { customization, setViewMode, themeClasses } = useDemo();
  const { openWhatsAppModal } = useWorkflow();

  const sendWhatsAppInquiry = (text: string) => {
    openWhatsAppModal(
      customization.businessName,
      customization.whatsapp || customization.phone,
      text,
      'Clinic OPD Reception'
    );
  };

  const doctors = customization.clinicDoctorsList || [
    { id: 'doc-1', name: 'Dr. Arvind Sharma', degree: 'MD (Internal Medicine)', specialty: 'General Physician & Diabetologist', fee: 500 },
    { id: 'doc-2', name: 'Dr. Sneha Rao', degree: 'MDS (Conservative Dentistry)', specialty: 'Dental Surgeon & Implantologist', fee: 400 },
    { id: 'doc-3', name: 'Dr. P.K. Mishra', degree: 'MS (Orthopedics)', specialty: 'Joint Care & Sports Injury', fee: 600 }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-100">
      {/* Chrome address bar */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between text-xs sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="bg-white px-3 py-1 rounded border border-gray-300 text-gray-600 font-mono text-[11px] flex items-center gap-2 shadow-xs">
            <span className="text-emerald-600">🔒</span>
            <span>https://{customization.website || `${customization.businessName.toLowerCase().replace(/\s+/g, '')}.com`}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => sendWhatsAppInquiry(`Hi ${customization.businessName}, I want to check today's OPD token queue.`)}
            className="flex items-center gap-1.5 text-gray-600 hover:text-emerald-700 transition font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">OPD WhatsApp Helpdesk</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold text-white transition ${themeClasses.accentBg} hover:opacity-90 shadow-sm`}
          >
            <Stethoscope className="w-3 h-3" />
            Book Token
          </button>
        </div>
      </div>

      {/* Brand Navbar */}
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {customization.logoUrl ? (
            <img
              src={customization.logoUrl}
              alt={customization.businessName}
              className="w-10 h-10 object-contain rounded-md border border-gray-200 bg-white p-1"
            />
          ) : (
            <div className={`w-9 h-9 rounded-md flex items-center justify-center font-bold text-sm shadow-xs ${themeClasses.accentBg} text-white`}>
              {customization.businessName.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="font-semibold text-base text-gray-900 tracking-tight leading-tight">
              {customization.businessName}
            </h1>
            <p className="text-xs text-gray-500 leading-tight">
              {customization.tagline || 'Multi-Specialty Healthcare & Outpatient Center'}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-gray-600">
          <a href="#doctors" className="hover:text-gray-900 transition font-medium">Our Doctors</a>
          <a href="#specialties" className="hover:text-gray-900 transition font-medium">Specialties & Diagnostics</a>
          <a href="#reviews" className="hover:text-gray-900 transition font-medium">Patient Testimonials</a>
          <a href="#contact" className="hover:text-gray-900 transition font-medium">OPD Timings & Contact</a>
        </div>

        <button
          type="button"
          onClick={() => setViewMode('customer')}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-medium text-gray-700 transition shadow-xs"
        >
          <span>Get Digital Token</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </nav>

      {/* Hero */}
      <section className="relative px-6 py-14 sm:py-20 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-200 bg-teal-50 text-xs text-teal-800 mb-6 font-medium">
          <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
          <span>Compassionate, Technology-Driven Healthcare in {customization.address.split(',').slice(-2, -1)[0]?.trim() || 'Ranchi'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 max-w-3xl mx-auto leading-tight">
          Expert Medical Care & Digital Prescriptions at{' '}
          <span className={themeClasses.accentText}>{customization.businessName}</span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {customization.tagline}. Consult experienced senior doctors, get real-time token tracking so you never sit in crowded waiting rooms, and receive digital WhatsApp prescriptions.
        </p>

        {/* CTA Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-white shadow-sm transition ${themeClasses.accentBg} hover:opacity-90`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Book Consultation Token</span>
          </button>
          <button
            type="button"
            onClick={() => sendWhatsAppInquiry(`Hello ${customization.businessName}, I would like to check doctor availability for this evening.`)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 transition shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Inquire on WhatsApp</span>
          </button>
        </div>

        {/* Highlights */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-y border-gray-200 py-6">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-cyan-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">Live Token Queue</div>
              <div className="text-[11px] text-gray-500">Zero waiting room crowd</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">Digital WhatsApp Rx</div>
              <div className="text-[11px] text-gray-500">Never lose medical records</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">NABH Hygiene Protocols</div>
              <div className="text-[11px] text-gray-500">100% sanitized clinics</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Star className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">4.9 ★ Patient Trust</div>
              <div className="text-[11px] text-gray-500">Over 3,400+ consultations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Roster */}
      <section id="doctors" className="px-6 py-12 max-w-5xl mx-auto border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Senior Medical Staff</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">Our Doctors & Consultants</h3>
          </div>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`text-xs font-semibold flex items-center gap-1 ${themeClasses.accentText} hover:underline`}
          >
            Select doctor & book token <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-base ${themeClasses.accentBadge}`}>
                    {doc.name.replace('Dr. ', '').substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{doc.name}</h4>
                    <p className="text-[11px] text-gray-500">{doc.degree}</p>
                  </div>
                </div>

                <div className="mt-2 text-xs text-gray-700 font-medium">
                  {doc.specialty}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-500">Consultation Fee</div>
                  <div className="text-lg font-bold text-gray-900">₹{doc.fee}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setViewMode('customer')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold text-white transition ${themeClasses.accentBg} hover:opacity-90 shadow-xs`}
                >
                  Book Token
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specialties */}
      <section id="specialties" className="px-6 py-12 max-w-5xl mx-auto border-t border-gray-200">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Complete Care</span>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">Specialties & Diagnostics</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-lg bg-white border border-gray-200 flex flex-col items-center shadow-xs">
            <Activity className="w-6 h-6 text-cyan-600 mb-2" />
            <h5 className="text-xs font-semibold text-gray-900">General Medicine</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">Fever, diabetes, hypertension</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-gray-200 flex flex-col items-center shadow-xs">
            <Sparkles className="w-6 h-6 text-indigo-600 mb-2" />
            <h5 className="text-xs font-semibold text-gray-900">Dental & Implants</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">Painless root canal & scaling</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-gray-200 flex flex-col items-center shadow-xs">
            <HeartPulse className="w-6 h-6 text-rose-600 mb-2" />
            <h5 className="text-xs font-semibold text-gray-900">Orthopedic & Joint Care</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">Arthritis, fractures & rehab</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-gray-200 flex flex-col items-center shadow-xs">
            <FileText className="w-6 h-6 text-emerald-600 mb-2" />
            <h5 className="text-xs font-semibold text-gray-900">In-House Lab Tests</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">Blood reports in 2 hours</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-gray-200 bg-gray-50 px-6 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-2">{customization.businessName}</h4>
            <p className="text-gray-600 leading-relaxed mb-3">{customization.tagline}</p>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{customization.address}</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-2">OPD Consultation Hours</h4>
            <ul className="space-y-1.5 text-gray-600">
              <li>Morning Shift: 09:00 AM – 01:30 PM</li>
              <li>Evening Shift: 05:00 PM – 08:30 PM</li>
              <li>Sunday: Emergency & On-Call Only</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Patient Reception</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-indigo-600" />
                <span>{customization.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: {customization.whatsapp}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setViewMode('customer')}
              className={`mt-4 w-full py-2 rounded-md text-xs font-semibold text-white text-center transition ${themeClasses.accentBg} hover:opacity-90 shadow-xs`}
            >
              Book Doctor Consultation Token
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {customization.businessName}. All rights reserved.</span>
          <span className="text-gray-400">Powered by ATMAN Healthcare Token & E-Prescription System</span>
        </div>
      </footer>
    </div>
  );
};
