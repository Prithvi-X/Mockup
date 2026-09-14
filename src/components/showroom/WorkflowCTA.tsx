import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';

export const WorkflowCTA: React.FC = () => {
  const { openDemo } = useDemo();

  const scrollToCategories = () => {
    const el = document.getElementById('categories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-20 bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-semibold text-neutral-300 uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Consultative Software Studio</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Have a different workflow?
        </h2>

        <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Tell us how your business works. We'll show you what a custom system could look like.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => openDemo('custom')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-950/40 transition"
          >
            <Layers className="w-4 h-4" />
            <span>Explore Custom Software</span>
          </button>

          <button
            onClick={scrollToCategories}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 font-semibold text-xs sm:text-sm transition"
          >
            <span>Back to Demos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
