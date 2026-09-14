import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { SOLUTIONS_DATA } from '../../data/solutions';
import { DynamicIcon } from '../common/Icon';
import { ArrowRight, Check } from 'lucide-react';

export const SolutionsSection: React.FC = () => {
  const { openDemo } = useDemo();

  return (
    <section id="solutions" className="py-16 md:py-24 border-b border-neutral-900 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
            What We Build
          </h2>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tailored software tools for modern operations.
          </h3>
          <p className="mt-3 text-sm text-neutral-400">
            Every business is unique. We replace messy paper registers, confusing spreadsheets, and high-commission platforms with clean, custom systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS_DATA.map((solution) => (
            <div
              key={solution.id}
              className="group bg-neutral-900/60 hover:bg-neutral-900/90 border border-neutral-800/90 hover:border-neutral-700/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-105 transition-transform">
                  <DynamicIcon name={solution.icon} className="w-5 h-5" />
                </div>

                <h4 className="text-lg font-bold text-white tracking-tight mb-2">
                  {solution.title}
                </h4>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                  {solution.description}
                </p>

                {/* Micro highlights */}
                <div className="space-y-1.5 mb-6 pt-3 border-t border-neutral-800/60">
                  {solution.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => openDemo(solution.targetCategory)}
                className="w-full inline-flex items-center justify-between text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-800/60 hover:bg-neutral-800 px-3.5 py-2.5 rounded-xl border border-neutral-700/60 group-hover:border-neutral-600 transition"
              >
                <span>{solution.viewDemoActionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
