import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#07162c] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#d29900]/60 transition-all shadow-orange-950/30 backdrop-blur-md">
      <span
        className="material-symbols-outlined text-[#d29900] text-[22px]"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        check_circle
      </span>
      <span className="text-[13px] font-bold tracking-tight">{message}</span>
    </div>
  );
};
