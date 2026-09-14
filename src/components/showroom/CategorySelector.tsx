import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { useWorkflow } from '../../context/WorkflowContext';
import { BUSINESS_CATEGORIES } from '../../data/mockBusinesses';
import { DynamicIcon } from '../common/Icon';
import { CustomSoftwareCard } from './CustomSoftwareCard';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';

export const CategorySelector: React.FC = () => {
  const { openDemo } = useDemo();
  const { startQuickDemo } = useWorkflow();

  return (
    <section id="categories" className="py-16 md:py-24 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-semibold text-neutral-300 uppercase tracking-widest mb-3">
            Interactive Demos
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Choose a business to explore
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            See what a custom system could look like for your business.
          </p>
        </div>

        {/* 6 Industry Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {BUSINESS_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="group bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800/90 hover:border-neutral-700 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700/80 flex items-center justify-center text-white">
                    <DynamicIcon name={category.icon} className="w-5 h-5 text-indigo-400" />
                  </div>
                  {category.badge && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300">
                      {category.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                  {category.label}
                </h3>
                <p className="text-xs font-medium text-neutral-400 mb-3">
                  {category.name}
                </p>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5">
                  {category.description}
                </p>

                {/* Preview Features Checklist */}
                <div className="space-y-2 mb-6 pt-3 border-t border-neutral-800/70">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Preview Features
                  </div>
                  {category.previewFeatures.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    openDemo(category.id, 'website');
                    startQuickDemo(category.id, 'quick');
                  }}
                  className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 px-3 py-2.5 rounded-xl transition shadow-sm active:scale-95"
                  title="Run 60-Second Guided Sales Demo"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>60s Demo</span>
                </button>
                <button
                  onClick={() => openDemo(category.id)}
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700/90 border border-neutral-700 px-3 py-2.5 rounded-xl transition"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section 9: Distinct Custom Software Card */}
        <CustomSoftwareCard />
      </div>
    </section>
  );
};
