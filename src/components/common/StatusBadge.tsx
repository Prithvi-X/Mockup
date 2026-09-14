import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const s = status.toLowerCase();

  let styles = 'bg-neutral-800 text-neutral-300 border-neutral-700';

  if (s.includes('confirm') || s.includes('active') || s.includes('served') || s.includes('won') || s.includes('completed') || s.includes('checked in') || s.includes('ready')) {
    styles = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  } else if (s.includes('pending') || s.includes('waiting') || s.includes('preparing') || s.includes('progress') || s.includes('discussion')) {
    styles = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  } else if (s.includes('urgent') || s.includes('overdue') || s.includes('cancelled') || s.includes('danger')) {
    styles = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
  } else if (s.includes('high') || s.includes('proposal') || s.includes('consultation')) {
    styles = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
  } else if (s.includes('new') || s.includes('lead') || s.includes('scheduled')) {
    styles = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${styles}`}>
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70 animate-pulse" />
      {status}
    </span>
  );
};
