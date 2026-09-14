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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-3.5 sm:p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-white">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {actionButtonLabel && (
          <button
            onClick={onActionClick}
            className="self-start sm:self-auto text-xs font-medium text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 px-2.5 py-1.5 rounded-md border border-gray-300 transition"
          >
            {actionButtonLabel}
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-gray-50 text-gray-600 font-medium text-[11px] uppercase tracking-wider border-b border-gray-200">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-3.5 py-2.5 font-semibold whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-gray-50/70 transition-colors">
                {columns.map((col, cIdx) => {
                  const val = row[col];
                  const isStatus = col.toLowerCase().includes('status');
                  return (
                    <td key={cIdx} className="px-3.5 py-2.5 whitespace-nowrap text-xs sm:text-sm">
                      {isStatus && typeof val === 'string' ? (
                        <StatusBadge status={val} />
                      ) : (
                        <span className={cIdx === 0 ? 'font-medium text-gray-900' : 'text-gray-600'}>
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
