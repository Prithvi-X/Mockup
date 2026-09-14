import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Layers, Mail, MapPin, Sparkles } from 'lucide-react';

export const MasterFooter: React.FC = () => {
  const { openDemo, setIsBookDemoOpen } = useDemo();

  return (
    <footer className="border-t border-neutral-800/80 bg-neutral-950 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white font-bold">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">ATMAN Software</span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Custom websites, booking systems, dashboards, and business management tools designed around the way modern local businesses actually operate.
            </p>
            <div className="pt-2 flex items-center gap-4 text-[11px] text-neutral-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Ranchi, Jharkhand & Remote
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> hello@atmansoftware.local (Demo)
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-3">
              Solutions & Demos
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => openDemo('salon')} className="hover:text-white transition">
                  Salon & Beauty Studio
                </button>
              </li>
              <li>
                <button onClick={() => openDemo('hotel')} className="hover:text-white transition">
                  Hotel & Hospitality
                </button>
              </li>
              <li>
                <button onClick={() => openDemo('restaurant')} className="hover:text-white transition">
                  Restaurant & Café
                </button>
              </li>
              <li>
                <button onClick={() => openDemo('gym')} className="hover:text-white transition">
                  Gym & Fitness Club
                </button>
              </li>
              <li>
                <button onClick={() => openDemo('clinic')} className="hover:text-white transition">
                  Clinic & Healthcare
                </button>
              </li>
              <li>
                <button onClick={() => openDemo('crm')} className="hover:text-white transition">
                  Business & CRM
                </button>
              </li>
            </ul>
          </div>

          {/* Custom & Consultation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-3">
              Bespoke Software
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => openDemo('custom')} className="hover:text-white flex items-center gap-1 text-indigo-400">
                  <Sparkles className="w-3 h-3" /> Custom Workflows
                </button>
              </li>
              <li>
                <button onClick={() => setIsBookDemoOpen(true)} className="hover:text-white transition">
                  Book Live Presentation
                </button>
              </li>
              <li>
                <span className="text-neutral-400">Zero Third-Party Commissions</span>
              </li>
              <li>
                <span className="text-neutral-400">100% Data Ownership</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-[11px]">
          <p>© {new Date().getFullYear()} ATMAN Software. Master Software Demo Showroom.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>Showroom Mode Active • Offline-Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
