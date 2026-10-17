import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="px-5 py-3 rounded-full bg-[#2D2421] text-white text-xs sm:text-sm font-medium shadow-xl border border-white/10 flex items-center gap-2.5">
        <span className="w-5 h-5 rounded-full bg-[#8FA89B] text-white flex items-center justify-center text-xs">
          <Check className="w-3 h-3 stroke-[3]" />
        </span>
        <span>{toast}</span>
      </div>
    </div>
  );
};
