import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#002956] text-[#ffffff] px-5 py-3.5 rounded-xl shadow-2xl border border-[#173f73] transition-all animate-bounce">
      <span
        className="material-symbols-outlined text-[#57d1fe] text-[22px]"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        check_circle
      </span>
      <span className="text-[13px] font-semibold">{message}</span>
    </div>
  );
};
