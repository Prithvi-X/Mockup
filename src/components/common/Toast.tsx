import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useDemo();

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
      <div className="flex items-center gap-2 px-3.5 py-2 bg-gray-900 text-white rounded-md shadow-lg text-xs font-medium max-w-sm border border-gray-800">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
        <span>{toast}</span>
      </div>
    </div>
  );
};
