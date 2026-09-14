import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const s = status.toLowerCase();

  let styles = 'bg-gray-100 text-gray-700 border-gray-200';

  if (s.includes('confirm') || s.includes('active') || s.includes('served') || s.includes('won') || s.includes('completed') || s.includes('checked in') || s.includes('ready') || s.includes('paid')) {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
  } else if (s.includes('pending') || s.includes('waiting') || s.includes('preparing') || s.includes('progress') || s.includes('discussion')) {
    styles = 'bg-amber-50 text-amber-700 border-amber-200/80';
  } else if (s.includes('urgent') || s.includes('overdue') || s.includes('cancelled') || s.includes('danger')) {
    styles = 'bg-rose-50 text-rose-700 border-rose-200/80';
  } else if (s.includes('high') || s.includes('proposal') || s.includes('consultation')) {
    styles = 'bg-blue-50 text-blue-700 border-blue-200/80';
  } else if (s.includes('new') || s.includes('lead') || s.includes('scheduled')) {
    styles = 'bg-sky-50 text-sky-700 border-sky-200/80';
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${styles}`}>
      {status}
    </span>
  );
};
