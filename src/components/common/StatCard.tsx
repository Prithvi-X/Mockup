import React from 'react';
import { StatMetric } from '../../types/showroom';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  metric: StatMetric;
}

export const StatCard: React.FC<StatCardProps> = ({ metric }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3.5 sm:p-4 transition-all hover:border-gray-300">
      <div className="text-xs font-medium text-gray-500 mb-1 flex items-center justify-between">
        <span className="truncate">{metric.label}</span>
        {metric.change && (
          <span
            className={`inline-flex items-center text-[11px] font-medium px-1.5 py-0.5 rounded shrink-0 ${
              metric.isPositive
                ? 'text-emerald-700 bg-emerald-50'
                : 'text-rose-700 bg-rose-50'
            }`}
          >
            {metric.isPositive ? (
              <TrendingUp className="w-3 h-3 mr-0.5" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-0.5" />
            )}
            {metric.change}
          </span>
        )}
      </div>
      <div className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
        {metric.value}
      </div>
      {metric.subtext && (
        <div className="text-xs text-gray-400 font-normal mt-0.5">
          {metric.subtext}
        </div>
      )}
    </div>
  );
};
