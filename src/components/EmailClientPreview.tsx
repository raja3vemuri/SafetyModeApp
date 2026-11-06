import React from 'react';
import { CanvasMode, SignatureState } from '../types';
import { buildSignatureMarkup } from '../utils/signatureHtml';

interface EmailClientPreviewProps {
  state: SignatureState;
  onChangeCanvasMode: (mode: CanvasMode) => void;
  onToggleDarkCanvas: () => void;
}

export const EmailClientPreview: React.FC<EmailClientPreviewProps> = ({
  state,
  onChangeCanvasMode,
  onToggleDarkCanvas,
}) => {
  const signatureHtml = buildSignatureMarkup(state);

  return (
    <div className="flex flex-col gap-3">
      {/* Preview Header & Controls */}
      <div className="bg-[#ffffff] p-4 rounded-2xl shadow-sm border border-[#cbd5e1] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200/80 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#d29900] text-[20px]">visibility</span>
          </div>
          <div>
            <h3 className="text-[14px] sm:text-[15px] text-[#002956] font-extrabold leading-tight">
              Simulated Client View
            </h3>
            <span className="text-[11px] text-[#64748b] font-medium">
              Standard Outlook, Gmail & Apple Mail Rendering
            </span>
          </div>
        </div>

        {/* Viewport & Dark Mode Buttons */}
        <div className="flex items-center gap-1 bg-[#f1f5f9] p-1 rounded-xl border border-[#cbd5e1]">
          <button
            type="button"
            title="Desktop Mail Client"
            onClick={() => onChangeCanvasMode('desktop')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              state.canvasMode === 'desktop'
                ? 'bg-[#002956] text-white shadow-xs font-bold'
                : 'text-[#64748b] hover:text-[#002956] hover:bg-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">desktop_windows</span>
          </button>
          <button
            type="button"
            title="Mobile Smartphone Client"
            onClick={() => onChangeCanvasMode('mobile')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              state.canvasMode === 'mobile'
                ? 'bg-[#002956] text-white shadow-xs font-bold'
                : 'text-[#64748b] hover:text-[#002956] hover:bg-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">smartphone</span>
          </button>
          <button
            type="button"
            title="Toggle Recipient Dark Mode"
            onClick={onToggleDarkCanvas}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              state.isDarkCanvas
                ? 'bg-[#07162c] text-[#d29900] ring-1 ring-[#d29900] shadow-xs'
                : 'text-[#64748b] hover:text-[#002956] hover:bg-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">dark_mode</span>
          </button>
        </div>
      </div>

      {/* Simulated Email Frame */}
      <div
        className={`bg-[#ffffff] rounded-2xl shadow-xl border border-[#94a3b8]/50 overflow-hidden transition-all duration-300 ${
          state.canvasMode === 'mobile' ? 'max-w-[380px] mx-auto ring-8 ring-[#0b1e36]/15' : 'w-full'
        }`}
      >
        {/* Mail Client Chrome Header in Modern Dark Blue */}
        <div className="bg-[#0b1e36] px-4 py-3 flex items-center justify-between border-b border-[#1b3152] text-white">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block shadow-xs"></span>
            <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block shadow-xs"></span>
            <span className="w-3 h-3 rounded-full bg-[#10b981] inline-block shadow-xs"></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d29900]"></span>
            <span className="text-[12px] text-[#cbd5e1] font-semibold">
              New Message — Commercial Outreach
            </span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-[#94a3b8]">unfold_more</span>
        </div>

        {/* Mail Envelope Meta Lines */}
        <div className="bg-[#f8fafc] px-5 py-3 flex flex-col gap-1.5 text-[12px] text-[#475569] border-b border-[#cbd5e1]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#002956] w-14">To:</span>
            <span className="bg-white px-2.5 py-0.5 rounded-md border border-[#cbd5e1] text-[#0f172a] font-mono text-[11px] shadow-xs">
              partner@enterprise-client.com
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#002956] w-14">Subject:</span>
            <span className="text-[#0f172a] font-semibold">
              Following up on our Q3 enterprise partnership roadmap
            </span>
          </div>
        </div>

        {/* Mail Body Content Area */}
        <div
          className={`p-6 min-h-[360px] flex flex-col justify-between transition-colors duration-200 ${
            state.isDarkCanvas ? 'bg-[#0f172a] text-slate-100' : 'bg-[#ffffff] text-[#0f172a]'
          }`}
        >
          <div className="text-[13px] leading-relaxed space-y-2.5 font-sans pb-6">
            <p>Hi Marcus,</p>
            <p>
              It was a pleasure connecting earlier today. As discussed during our strategic
              alignment call, I have attached our preliminary technical evaluation deck for your
              team's review.
            </p>
            <p>
              Please feel free to test the interactive features or review my credentials and
              booking link below.
            </p>
            <p>Best regards,</p>
          </div>

          {/* THE LIVE SIGNATURE STAGE */}
          <div
            className="p-2 rounded-xl transition-all overflow-x-auto border border-dashed border-[#cbd5e1]/60"
            dangerouslySetInnerHTML={{ __html: signatureHtml }}
          />
        </div>
      </div>
    </div>
  );
};
