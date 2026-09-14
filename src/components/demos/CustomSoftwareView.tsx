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
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Bespoke Engineering Studio</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
            We build software around the way{' '}
            <span className="text-indigo-600">
              YOUR business works.
            </span>
          </h2>

          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Most software companies try to force your business into their rigid templates. We do the exact opposite: we map your existing registers, staff steps, and customer touchpoints into clean, simple software.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setIsBookDemoOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white font-medium text-xs sm:text-sm hover:bg-gray-800 transition-colors shadow-xs"
            >
              <span>Schedule Workflow Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => switchCategory('salon')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 text-xs sm:text-sm font-medium transition-colors"
            >
              <span>Explore Salon Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {customData.stats.slice(0, 4).map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
            <div className="text-xs font-medium text-gray-500">{stat.label}</div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</div>
            {stat.subtext && <div className="text-[11px] text-gray-500 mt-0.5">{stat.subtext}</div>}
          </div>
        ))}
      </div>

      {/* 4-Step Engineering Process */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 mb-1">
            Our Approach
          </div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            How we design your custom system
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            From your current manual register to working software in 3 weeks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              className="bg-gray-50/70 border border-gray-200 rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-mono font-bold text-gray-400">
                    {item.step}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-indigo-600 shadow-xs">
                    <item.icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1.5">{item.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison: Generic SaaS vs Custom Software */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-6 text-center">
          Generic SaaS Subscriptions vs. Xampire Technologies Custom Software
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Generic SaaS */}
          <div className="bg-rose-50/40 border border-rose-200 rounded-xl p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Generic SaaS Products</span>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>200+ features you don’t need that confuse your non-technical staff.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>Forces you to change the way you write receipts and track customers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>Monthly subscription prices go up every year with vendor lock-in.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>Your customer data is held hostage on third-party servers.</span>
              </li>
            </ul>
          </div>

          {/* Xampire Technologies Custom */}
          <div className="bg-emerald-50/40 border border-emerald-200 rounded-xl p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Xampire Technologies Bespoke Solution</span>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
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
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 mb-4">
          Real Local Business Workflows We Can Automate
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider text-[11px] border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold">Business Type</th>
                <th className="px-4 py-3 font-semibold">Typical Challenge</th>
                <th className="px-4 py-3 font-semibold">Custom Solution Built</th>
                <th className="px-4 py-3 font-semibold">Business Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr className="hover:bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">Car / Bike Garage</td>
                <td className="px-4 py-3">Parts estimation & client WhatsApp approvals</td>
                <td className="px-4 py-3">Photo job card & 1-tap WhatsApp estimate</td>
                <td className="px-4 py-3 text-emerald-700 font-medium">35% faster turnaround</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">Wholesale Distributor</td>
                <td className="px-4 py-3">Daily rate fluctuations & agent credit limits</td>
                <td className="px-4 py-3">Live rate broadcaster & ledger balance app</td>
                <td className="px-4 py-3 text-emerald-700 font-medium">Zero billing disputes</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">Coaching Institute</td>
                <td className="px-4 py-3">Student test ranks & monthly fee reminders</td>
                <td className="px-4 py-3">Scorecard portal & automated fee reminder bot</td>
                <td className="px-4 py-3 text-emerald-700 font-medium">100% on-time fee recovery</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">Boutique / Tailor</td>
                <td className="px-4 py-3">Measurement book losses & delivery dates</td>
                <td className="px-4 py-3">Customer measurement vault & trial alerts</td>
                <td className="px-4 py-3 text-emerald-700 font-medium">No lost client measurements</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
