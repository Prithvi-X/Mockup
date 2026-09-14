import React from 'react';
import { StatMetric } from '../../types/showroom';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  metric: StatMetric;
}

export const StatCard: React.FC<StatCardProps> = ({ metric }) => {
  return (
    <div className="bg-neutral-900/70 border border-neutral-800/80 hover:border-neutral-700/80 rounded-xl p-4 sm:p-5 transition-all duration-200 shadow-sm">
      <div className="text-xs sm:text-sm font-medium text-neutral-400 mb-1.5 flex items-center justify-between">
        <span>{metric.label}</span>
        {metric.change && (
          <span
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-md ${
              metric.isPositive
                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
            }`}
          >
            {metric.isPositive ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {metric.change}
          </span>
        )}
      </div>
      <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
        {metric.value}
      </div>
      {metric.subtext && (
        <div className="text-xs text-neutral-400 font-normal">
          {metric.subtext}
        </div>
      )}
    </div>
  );
};
