import React, { useEffect } from 'react';
import { Sparkles, Zap, X, CheckCircle2 } from 'lucide-react';
import { useWorkflow } from '../../context/WorkflowContext';

export const WowMomentBanner: React.FC = () => {
  const { wowMoment, dismissWowMoment } = useWorkflow();

  useEffect(() => {
    if (!wowMoment) return;
    const timer = setTimeout(() => {
      dismissWowMoment();
    }, 6500);
    return () => clearTimeout(timer);
  }, [wowMoment, dismissWowMoment]);

  if (!wowMoment) return null;

  return (
    <div className="fixed top-20 right-6 z-50 max-w-sm w-full transition-all">
      <div className="relative overflow-hidden rounded-lg bg-white border border-gray-200 p-3.5 shadow-lg">
        <div className="relative flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-md bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold shadow-xs">
            <Zap className="w-4 h-4 fill-current" />
          </div>

          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                <Sparkles className="w-3 h-3" /> Live Business Sync
              </span>
            </div>
            <h4 className="text-xs font-bold text-gray-900 tracking-tight leading-snug">
              {wowMoment.title}
            </h4>
            <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
              {wowMoment.description}
            </p>
          </div>

          <button
            onClick={dismissWowMoment}
            className="flex-shrink-0 text-gray-400 hover:text-gray-700 p-1 rounded hover:bg-gray-100 transition-colors"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress bar line indicating auto-dismiss */}
        <div className="mt-2.5 h-0.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 animate-[shrink_6.5s_linear_forwards]" />
        </div>
      </div>
    </div>
  );
};
