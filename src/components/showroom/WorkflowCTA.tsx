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
    <section className="py-16 sm:py-20 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Consultative Software Studio</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Have a different workflow?
        </h2>

        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
          Tell us how your business works. We'll show you what a custom system could look like.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => openDemo('custom')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm shadow-xs transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>Explore Custom Software</span>
          </button>

          <button
            onClick={scrollToCategories}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-200 font-medium text-xs sm:text-sm shadow-2xs transition-colors"
          >
            <span>Back to Demos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
