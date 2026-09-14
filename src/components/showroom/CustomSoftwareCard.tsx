import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Sparkles, ArrowRight, Layers, Cpu, ShieldCheck } from 'lucide-react';

export const CustomSoftwareCard: React.FC = () => {
  const { openDemo } = useDemo();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 lg:p-10 shadow-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Bespoke Engineering</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-2">
            Don't see your business?
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed">
            That's the point. We can design the workflow around your business instead of forcing your business into someone else's software.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Tailored screen layouts
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              Your exact calculations & rules
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Zero unnecessary menus
            </span>
          </div>
        </div>

        <button
          onClick={() => openDemo('custom')}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white font-medium text-xs sm:text-sm hover:bg-gray-800 transition-colors shadow-xs"
        >
          <span>Build Something Custom</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
