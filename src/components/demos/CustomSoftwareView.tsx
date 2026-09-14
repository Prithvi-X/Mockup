import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { BUSINESS_DATA_MAP } from '../../data/mockBusinesses';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Layers,
  Workflow,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export const CustomSoftwareView: React.FC = () => {
  const { switchCategory, setIsBookDemoOpen } = useDemo();
  const customData = BUSINESS_DATA_MAP.custom;

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-b from-indigo-950/40 via-neutral-900/80 to-neutral-950 p-6 sm:p-8 lg:p-10 shadow-lg">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Bespoke Engineering Studio</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            We build software around the way{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-indigo-100">
              YOUR business works.
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
            Most software companies try to force your business into their rigid templates. We do the exact opposite: we map your existing registers, staff steps, and customer touchpoints into clean, simple software.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setIsBookDemoOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition shadow"
            >
              <span>Schedule Workflow Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => switchCategory('salon')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 text-xs sm:text-sm transition"
            >
              <span>Explore Salon Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {customData.stats.slice(0, 4).map((stat, i) => (
          <div key={i} className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4">
            <div className="text-xs font-medium text-neutral-400">{stat.label}</div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-1">{stat.value}</div>
            {stat.subtext && <div className="text-[11px] text-neutral-400 mt-0.5">{stat.subtext}</div>}
          </div>
        ))}
      </div>

      {/* 4-Step Engineering Process */}
      <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
            Our Approach
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            How we design your custom system
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            From your current manual register to working software in 3 weeks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Workflow Mapping',
              desc: 'We sit down with you and document every step your staff takes, every paper record, and every calculation.',
              icon: Workflow
            },
            {
              step: '02',
              title: 'Interactive Mockup',
              desc: 'We design the exact screens and buttons on a tablet. You click through and approve the flow before code starts.',
              icon: Layers
            },
            {
              step: '03',
              title: 'Clean Engineering',
              desc: 'We build your system with your real customer data, your preferred colors, and WhatsApp integrations.',
              icon: Cpu
            },
            {
              step: '04',
              title: 'Staff Onboarding',
              desc: 'Because it is built around how you already operate, your team learns to use it comfortably in 15 minutes.',
              icon: ShieldCheck
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-5 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-mono font-extrabold text-neutral-700">
                    {item.step}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-indigo-400">
                    <item.icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison: Generic SaaS vs Custom Software */}
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-6 text-center">
          Generic SaaS Subscriptions vs. ATMAN Custom Software
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Generic SaaS */}
          <div className="bg-neutral-950 border border-rose-950/40 rounded-xl p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <XCircle className="w-4 h-4" />
              <span>Generic SaaS Products</span>
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>200+ features you don’t need that confuse your non-technical staff.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Forces you to change the way you write receipts and track customers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Monthly subscription prices go up every year with vendor lock-in.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Your customer data is held hostage on third-party servers.</span>
              </li>
            </ul>
          </div>

          {/* ATMAN Custom */}
          <div className="bg-neutral-950 border border-emerald-950/40 rounded-xl p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>ATMAN Bespoke Solution</span>
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Only the screens and buttons your business actually needs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Matches your existing register columns and operational terms.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Zero recurring software license fees. Built for you, owned by you.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Fast local performance, 100% offline-ready, mobile responsive.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Examples Table */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4">
          Real Local Business Workflows We Can Automate
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950/80 text-neutral-400 uppercase tracking-wider text-[11px] border-b border-neutral-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Business Type</th>
                <th className="px-4 py-3 font-semibold">Typical Challenge</th>
                <th className="px-4 py-3 font-semibold">Custom Solution Built</th>
                <th className="px-4 py-3 font-semibold">Business Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              <tr>
                <td className="px-4 py-3 font-medium text-white">Car / Bike Garage</td>
                <td className="px-4 py-3">Parts estimation & client WhatsApp approvals</td>
                <td className="px-4 py-3">Photo job card & 1-tap WhatsApp estimate</td>
                <td className="px-4 py-3 text-emerald-400 font-medium">35% faster turnaround</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white">Wholesale Distributor</td>
                <td className="px-4 py-3">Daily rate fluctuations & agent credit limits</td>
                <td className="px-4 py-3">Live rate broadcaster & ledger balance app</td>
                <td className="px-4 py-3 text-emerald-400 font-medium">Zero billing disputes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white">Coaching Institute</td>
                <td className="px-4 py-3">Student test ranks & monthly fee reminders</td>
                <td className="px-4 py-3">Scorecard portal & automated fee reminder bot</td>
                <td className="px-4 py-3 text-emerald-400 font-medium">100% on-time fee recovery</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white">Boutique / Tailor</td>
                <td className="px-4 py-3">Measurement book losses & delivery dates</td>
                <td className="px-4 py-3">Customer measurement vault & trial alerts</td>
                <td className="px-4 py-3 text-emerald-400 font-medium">No lost client measurements</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
