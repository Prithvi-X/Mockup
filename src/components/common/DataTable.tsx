import React from 'react';
import { StatusBadge } from './StatusBadge';

interface DataTableProps {
  title: string;
  subtitle?: string;
  columns: string[];
  rows: Record<string, string | number | boolean>[];
  actionButtonLabel?: string;
  onActionClick?: () => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  title,
  subtitle,
  columns,
  rows,
  actionButtonLabel,
  onActionClick
}) => {
  return (
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 sm:p-5 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-neutral-400 mt-0.5">{subtitle}</p>}
        </div>
        {actionButtonLabel && (
          <button
            onClick={onActionClick}
            className="self-start sm:self-auto text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700/80 px-3 py-1.5 rounded-lg border border-neutral-700 transition"
          >
            {actionButtonLabel}
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-neutral-900/90 text-neutral-400 uppercase tracking-wider text-[11px] border-b border-neutral-800/80">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 py-3 font-semibold whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-neutral-800/30 transition-colors">
                {columns.map((col, cIdx) => {
                  const val = row[col];
                  const isStatus = col.toLowerCase().includes('status');
                  return (
                    <td key={cIdx} className="px-4 py-3.5 whitespace-nowrap text-xs sm:text-sm">
                      {isStatus && typeof val === 'string' ? (
                        <StatusBadge status={val} />
                      ) : (
                        <span className={cIdx === 0 ? 'font-medium text-white' : 'text-neutral-300'}>
                          {String(val ?? '—')}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
