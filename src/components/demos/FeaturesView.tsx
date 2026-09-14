import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { BUSINESS_DATA_MAP } from '../../data/mockBusinesses';
import { DynamicIcon } from '../common/Icon';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

export const FeaturesView: React.FC = () => {
  const { category, setViewMode, setIsCustomizeOpen, customization } = useDemo();
  const business = BUSINESS_DATA_MAP[category] || BUSINESS_DATA_MAP.salon;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Capability Blueprint</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Key Features for {customization.businessName}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            Designed specifically to eliminate paperwork, speed up daily customer interactions, and give owners 100% control.
          </p>
        </div>

        <button
          onClick={() => setViewMode('dashboard')}
          className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium border border-neutral-700 transition"
        >
          <span>Back to Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {business.featuresList.map((feat, idx) => (
          <div
            key={idx}
            className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:border-neutral-700 transition"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700/60 flex items-center justify-center text-indigo-400 mb-4">
                <DynamicIcon name={feat.icon} className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight mb-2">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                {feat.description}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-800/80 flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{feat.benefit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Callout */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-indigo-950/40 border border-neutral-800 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Need a feature not listed here?</h4>
          <p className="text-xs text-neutral-400 mt-0.5">
            Every screen can be modified. We will build the exact steps your staff uses every day.
          </p>
        </div>
        <button
          onClick={() => setIsCustomizeOpen(true)}
          className="shrink-0 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition"
        >
          Personalize This Demo
        </button>
      </div>
    </div>
  );
};
