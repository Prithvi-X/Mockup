import React from 'react';
import { useDemo } from '../../../context/DemoContext';
import { useWorkflow } from '../../../context/WorkflowContext';
import {
  Layers,
  Sparkles,
  BarChart3,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Building
} from 'lucide-react';

export const CrmWebsiteView: React.FC = () => {
  const { customization, setViewMode, themeClasses } = useDemo();
  const { openWhatsAppModal } = useWorkflow();

  const sendWhatsAppInquiry = (text: string) => {
    openWhatsAppModal(
      customization.businessName,
      customization.whatsapp || customization.phone,
      text,
      'B2B Operations Desk'
    );
  };

  const stages = customization.crmStagesList || ['New Inquiry', 'Requirements Call', 'Proposal Sent', 'Closed Won'];

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
            onClick={() => sendWhatsAppInquiry(`Hi ${customization.businessName}, we want to discuss an enterprise proposal for our company.`)}
            className="flex items-center gap-1.5 text-gray-600 hover:text-emerald-700 transition font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Executive WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold text-white transition ${themeClasses.accentBg} hover:opacity-90 shadow-sm`}
          >
            <FileSpreadsheet className="w-3 h-3" />
            Request Proposal
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
              {customization.tagline || 'Enterprise Operations, Client Management & Custom Workflows'}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-gray-600">
          <a href="#services" className="hover:text-gray-900 transition font-medium">Solutions</a>
          <a href="#process" className="hover:text-gray-900 transition font-medium">Our Delivery Process</a>
          <a href="#results" className="hover:text-gray-900 transition font-medium">Measurable Impact</a>
          <a href="#contact" className="hover:text-gray-900 transition font-medium">Contact Us</a>
        </div>

        <button
          type="button"
          onClick={() => setViewMode('customer')}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-medium text-gray-700 transition shadow-xs"
        >
          <span>Get Quote</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </nav>

      {/* Hero */}
      <section className="relative px-6 py-14 sm:py-20 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-200 bg-violet-50 text-xs text-violet-800 mb-6 font-medium">
          <TrendingUp className="w-3.5 h-3.5 text-violet-600" />
          <span>B2B Operational Excellence & Custom Solutions</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 max-w-3xl mx-auto leading-tight">
          Streamline Your Operations & Multiply Revenue with{' '}
          <span className={themeClasses.accentText}>{customization.businessName}</span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {customization.tagline}. Centralize client inquiries, automate deal stage follow-ups, generate professional proposals in 3 minutes, and monitor team performance in real time.
        </p>

        {/* CTA Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-white shadow-sm transition ${themeClasses.accentBg} hover:opacity-90`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Request Tailored Proposal</span>
          </button>
          <button
            type="button"
            onClick={() => sendWhatsAppInquiry(`Hello ${customization.businessName}, we would like to schedule a software demo with your senior architect.`)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 transition shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Connect on WhatsApp</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-y border-gray-200 py-6">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-5 h-5 text-violet-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">+39% Deal Velocity</div>
              <div className="text-[11px] text-gray-500">Faster client conversions</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">100% Follow-up Discipline</div>
              <div className="text-[11px] text-gray-500">Zero missed opportunities</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Building className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">40+ B2B Clients</div>
              <div className="text-[11px] text-gray-500">Regional industry leaders</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">Enterprise Privacy</div>
              <div className="text-[11px] text-gray-500">Data ownership guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Showcase */}
      <section id="services" className="px-6 py-12 max-w-5xl mx-auto border-t border-gray-200">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Custom Architecture</span>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">Specialized B2B Solutions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-md bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-700">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-gray-900 text-base">Visual Sales Pipeline</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Track deals across stages ({stages.join(' → ')}). Never let high-value accounts slip between meetings.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-md bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-gray-900 text-base">Instant PDF Quotations</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Generate branded itemized quotations and tax invoices with standard terms in under 3 minutes.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-gray-900 text-base">Executive Analytics</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Real-time revenue forecast, team activity heatmaps, and cashflow collection reconciliation.
            </p>
          </div>
        </div>
      </section>

      {/* Process Stages */}
      <section id="process" className="px-6 py-12 max-w-5xl mx-auto border-t border-gray-200">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Standardized Delivery</span>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">Configured Pipeline Stages</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {stages.map((stg, i) => (
            <div key={i} className="p-4 rounded-lg bg-white border border-gray-200 text-center shadow-xs">
              <span className="text-[10px] font-mono font-bold text-violet-700 block mb-1">STAGE 0{i + 1}</span>
              <h5 className="text-xs font-semibold text-gray-900">{stg}</h5>
            </div>
          ))}
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
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Corporate Office Hours</h4>
            <ul className="space-y-1.5 text-gray-600">
              <li>Monday – Friday: 09:30 AM – 06:30 PM</li>
              <li>Saturday: 10:00 AM – 04:00 PM</li>
              <li>24/7 Dedicated Client SLA Support</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Consultation Desk</h4>
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
              Request Custom Proposal
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {customization.businessName}. All rights reserved.</span>
          <span className="text-gray-400">Powered by Xampire Technologies Enterprise CRM Platform</span>
        </div>
      </footer>
    </div>
  );
};
