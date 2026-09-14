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
    <div className="fixed top-20 right-6 z-50 max-w-md w-full animate-bounce-short transition-all">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900/95 border border-amber-500/40 p-4 shadow-2xl shadow-amber-500/10 backdrop-blur-xl">
        {/* Ambient background glow */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex items-start gap-3.5">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/30 ring-2 ring-amber-400/40 animate-pulse">
            <Zap className="w-5 h-5 fill-current" />
          </div>

          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                <Sparkles className="w-3 h-3" /> Live Business Sync
              </span>
            </div>
            <h4 className="text-sm font-bold text-white tracking-tight leading-snug">
              {wowMoment.title}
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {wowMoment.description}
            </p>
          </div>

          <button
            onClick={dismissWowMoment}
            className="flex-shrink-0 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar line indicating auto-dismiss */}
        <div className="mt-3 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 animate-[shrink_6.5s_linear_forwards]" />
        </div>
      </div>
    </div>
  );
};
