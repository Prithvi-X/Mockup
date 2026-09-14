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
    <section id="categories" className="py-16 md:py-24 border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-3 shadow-2xs">
            Interactive Demos
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Choose a business to explore
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            See what a custom system could look like for your business.
          </p>
        </div>

        {/* 6 Industry Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {BUSINESS_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="group bg-white hover:border-gray-300 border border-gray-200 rounded-xl p-6 flex flex-col justify-between transition-all duration-150 shadow-xs hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 shadow-2xs">
                    <DynamicIcon name={category.icon} className="w-5 h-5 text-indigo-600" />
                  </div>
                  {category.badge && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600">
                      {category.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-0.5">
                  {category.label}
                </h3>
                <p className="text-xs font-medium text-gray-500 mb-2.5">
                  {category.name}
                </p>

                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {category.description}
                </p>

                {/* Preview Features Checklist */}
                <div className="space-y-1.5 mb-5 pt-3 border-t border-gray-100">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Preview Features
                  </div>
                  {category.previewFeatures.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
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
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3 py-2 rounded-lg transition-colors shadow-2xs active:scale-98"
                  title="Run 60-Second Guided Sales Demo"
                >
                  <Zap className="w-3.5 h-3.5 fill-current text-amber-600" />
                  <span>60s Demo</span>
                </button>
                <button
                  onClick={() => openDemo(category.id)}
                  className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg transition-colors shadow-2xs"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
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
