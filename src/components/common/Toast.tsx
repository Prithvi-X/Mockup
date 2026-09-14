import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useDemo();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-neutral-900/95 border border-neutral-700/80 text-white rounded-xl shadow-2xl backdrop-blur-md text-xs font-medium max-w-sm">
        <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
        <span>{toast}</span>
      </div>
    </div>
  );
};
