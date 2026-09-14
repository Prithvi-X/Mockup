import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Sparkles, ArrowRight, Layers, Cpu, ShieldCheck } from 'lucide-react';

export const CustomSoftwareCard: React.FC = () => {
  const { openDemo } = useDemo();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-neutral-900/60 to-neutral-900/90 p-6 sm:p-8 lg:p-10 shadow-lg">
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Engineering</span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2">
            Don't see your business?
          </h3>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            That's the point. We can design the workflow around your business instead of forcing your business into someone else's software.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Tailored screen layouts
            </span>
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              Your exact calculations & rules
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              Zero unnecessary menus
            </span>
          </div>
        </div>

        <button
          onClick={() => openDemo('custom')}
          className="shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-neutral-950 font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition shadow-md"
        >
          <span>Build Something Custom</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
