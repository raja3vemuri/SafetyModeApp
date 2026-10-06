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
      <div className="bg-[#ffffff] p-3.5 rounded-xl shadow-xs border border-[#e2e8f0] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#006783] text-[22px]">visibility</span>
          <div>
            <h3 className="text-[14px] sm:text-[15px] text-[#002956] font-bold leading-tight">
              Simulated Client View
            </h3>
            <span className="text-[11px] text-[#43474f]">
              Standard Outlook & Gmail Rendering Mode
            </span>
          </div>
        </div>

        {/* Viewport & Dark Mode Buttons */}
        <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-lg border border-[#d6e3ff]">
          <button
            type="button"
            title="Desktop Mail Client"
            onClick={() => onChangeCanvasMode('desktop')}
            className={`p-1.5 rounded transition-all ${
              state.canvasMode === 'desktop'
                ? 'bg-[#ffffff] text-[#002956] shadow-xs font-semibold'
                : 'text-[#43474f] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">desktop_windows</span>
          </button>
          <button
            type="button"
            title="Mobile Smartphone Client"
            onClick={() => onChangeCanvasMode('mobile')}
            className={`p-1.5 rounded transition-all ${
              state.canvasMode === 'mobile'
                ? 'bg-[#ffffff] text-[#002956] shadow-xs font-semibold'
                : 'text-[#43474f] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">smartphone</span>
          </button>
          <button
            type="button"
            title="Toggle Recipient Dark Mode"
            onClick={onToggleDarkCanvas}
            className={`p-1.5 rounded transition-all ${
              state.isDarkCanvas
                ? 'bg-[#1a202c] text-[#57d1fe] shadow-xs'
                : 'text-[#43474f] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">dark_mode</span>
          </button>
        </div>
      </div>

      {/* Simulated Email Frame */}
      <div
        className={`bg-[#ffffff] rounded-2xl shadow-xl border border-[#cbd5e1] overflow-hidden transition-all duration-300 ${
          state.canvasMode === 'mobile' ? 'max-w-[380px] mx-auto ring-8 ring-[#1e293b]/10' : 'w-full'
        }`}
      >
        {/* Mail Client Chrome Header */}
        <div className="bg-[#dce9ff] px-4 py-2.5 flex items-center justify-between border-b border-[#cbd5e1]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ba1a1a]/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#10b981]/80 inline-block"></span>
          </div>
          <span className="text-[12px] text-[#43474f] font-medium">
            New Message — Commercial Outreach
          </span>
          <span className="material-symbols-outlined text-[16px] text-[#43474f]">unfold_more</span>
        </div>

        {/* Mail Envelope Meta Lines */}
        <div className="bg-[#eff4ff] px-5 py-2.5 flex flex-col gap-1 text-[12px] text-[#43474f] border-b border-[#d6e3ff]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#002956] w-14">To:</span>
            <span className="bg-[#ffffff] px-2 py-0.5 rounded border border-[#d6e3ff] text-[#0b1c30] font-mono text-[11px]">
              partner@enterprise-client.com
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#002956] w-14">Subject:</span>
            <span className="text-[#0b1c30] font-medium">
              Following up on our Q3 enterprise partnership roadmap
            </span>
          </div>
        </div>

        {/* Mail Body Content Area */}
        <div
          className={`p-5 min-h-[360px] flex flex-col justify-between transition-colors duration-200 ${
            state.isDarkCanvas ? 'bg-[#1a202c] text-gray-100' : 'bg-[#ffffff] text-[#0b1c30]'
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
            className="p-2 rounded-lg transition-all overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: signatureHtml }}
          />
        </div>
      </div>
    </div>
  );
};
