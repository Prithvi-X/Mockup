import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { BUSINESS_DATA_MAP } from '../../data/mockBusinesses';
import { DynamicIcon } from '../common/Icon';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

export const FeaturesView: React.FC = () => {
  const { category, setViewMode, setIsCustomizeOpen, customization } = useDemo();
  const business = BUSINESS_DATA_MAP[category] || BUSINESS_DATA_MAP.salon;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Capability Blueprint</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Key Features for {customization.businessName}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
            Designed specifically to eliminate paperwork, speed up daily customer interactions, and give owners 100% control.
          </p>
        </div>

        <button
          onClick={() => setViewMode('dashboard')}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium border border-gray-300 shadow-xs transition"
        >
          <span>Back to Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {business.featuresList.map((feat, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between hover:border-gray-300 transition shadow-xs"
          >
            <div>
              <div className="w-9 h-9 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 mb-3">
                <DynamicIcon name={feat.icon} className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 tracking-tight mb-1.5">
                {feat.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                {feat.description}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-xs font-medium text-emerald-700">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{feat.benefit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Callout */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Need a feature not listed here?</h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Every screen can be modified. We will build the exact steps your staff uses every day.
          </p>
        </div>
        <button
          onClick={() => setIsCustomizeOpen(true)}
          className="shrink-0 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md shadow-xs transition"
        >
          Personalize This Demo
        </button>
      </div>
    </div>
  );
};
