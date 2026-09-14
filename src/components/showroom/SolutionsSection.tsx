import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { SOLUTIONS_DATA } from '../../data/solutions';
import { DynamicIcon } from '../common/Icon';
import { ArrowRight, Check } from 'lucide-react';

export const SolutionsSection: React.FC = () => {
  const { openDemo } = useDemo();

  return (
    <section id="solutions" className="py-16 md:py-24 border-b border-gray-200 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            What We Build
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Tailored software tools for modern operations.
          </h3>
          <p className="mt-3 text-sm text-gray-600">
            Every business is unique. We replace messy paper registers, confusing spreadsheets, and high-commission platforms with clean, custom systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS_DATA.map((solution) => (
            <div
              key={solution.id}
              className="group bg-white hover:border-gray-300 border border-gray-200 rounded-xl p-6 flex flex-col justify-between transition-all duration-150 shadow-xs hover:shadow-sm"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-50/50 transition-colors shadow-2xs">
                  <DynamicIcon name={solution.icon} className="w-5 h-5" />
                </div>

                <h4 className="text-base font-bold text-gray-900 tracking-tight mb-2">
                  {solution.title}
                </h4>

                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {solution.description}
                </p>

                {/* Micro highlights */}
                <div className="space-y-1.5 mb-5 pt-3 border-t border-gray-100">
                  {solution.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => openDemo(solution.targetCategory)}
                className="w-full inline-flex items-center justify-between text-xs font-medium text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100/80 px-3.5 py-2 rounded-lg border border-gray-200 transition-colors"
              >
                <span>{solution.viewDemoActionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
