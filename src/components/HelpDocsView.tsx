import React, { useState } from 'react';

interface HelpDocsViewProps {
  onGoToEditor: () => void;
}

export const HelpDocsView: React.FC<HelpDocsViewProps> = ({ onGoToEditor }) => {
  const [activeGuide, setActiveGuide] = useState<'gmail' | 'outlook-web' | 'outlook-app' | 'apple'>('gmail');

  return (
    <div className="max-w-[1560px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-[#ffffff] p-6 rounded-2xl shadow-sm border border-[#e2e8f0] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#006783] mb-1">
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span className="text-[12px] font-bold uppercase tracking-wider">
              Installation Guides & Architecture
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#002956] tracking-tight">
            Help & Email Client Documentation
          </h2>
          <p className="text-[14px] text-[#43474f] mt-1">
            Follow our verified copy-paste instructions to install your new signature across all major platforms.
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToEditor}
          className="px-5 py-2.5 bg-[#002956] text-[#ffffff] font-bold text-[13px] rounded-xl hover:bg-[#173f73] transition-all flex items-center gap-2 shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">edit</span>
          Back to Generator
        </button>
      </div>

      {/* Guide Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#cbd5e1] pb-2">
        {[
          { id: 'gmail' as const, label: 'Google Gmail (Web & App)', icon: 'mail' },
          { id: 'outlook-web' as const, label: 'Outlook 365 (Web Browser)', icon: 'web' },
          { id: 'outlook-app' as const, label: 'Outlook Desktop (Windows/Mac)', icon: 'desktop_windows' },
          { id: 'apple' as const, label: 'Apple Mail (macOS & iOS)', icon: 'phone_iphone' },
        ].map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveGuide(id)}
            className={`px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all flex items-center gap-2 ${
              activeGuide === id
                ? 'bg-[#002956] text-[#ffffff] shadow-xs'
                : 'bg-[#eff4ff] text-[#43474f] hover:bg-[#dce9ff] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Guide Content */}
      <div className="bg-[#ffffff] rounded-2xl shadow-sm border border-[#e2e8f0] p-6 lg:p-8">
        {activeGuide === 'gmail' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ba1a1a]/10 flex items-center justify-center text-[#ba1a1a]">
                <span className="material-symbols-outlined text-[24px]">mail</span>
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#002956]">
                  Installing Your Signature in Gmail
                </h3>
                <span className="text-[12px] text-[#43474f]">
                  Requires under 60 seconds • Works automatically on new emails and replies
                </span>
              </div>
            </div>

            <ol className="space-y-4 text-[14px] text-[#0b1c30] list-decimal list-inside pl-2 leading-relaxed">
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>Step 1:</strong> In SignatureCraft, click{' '}
                <span className="font-semibold text-[#002956]">"Copy Signature to Clipboard"</span>.
              </li>
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>Step 2:</strong> Open Gmail in your web browser, click the gear icon{' '}
                <span className="font-semibold text-[#002956]">Settings ⚙</span> in the top-right,
                and choose <span className="font-semibold text-[#002956]">"See all settings"</span>.
              </li>
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>Step 3:</strong> Under the <span className="font-semibold text-[#002956]">"General"</span> tab,
                scroll down to the <span className="font-semibold text-[#002956]">"Signature"</span> section.
              </li>
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>Step 4:</strong> Click <span className="font-semibold text-[#002956]">+ Create new</span>, name it (e.g. "Work"),
                and click into the empty rich text box.
              </li>
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>Step 5:</strong> Press <span className="font-mono font-bold bg-[#ffffff] px-2 py-0.5 rounded border border-[#cbd5e1]">Ctrl + V</span> (or <span className="font-mono font-bold bg-[#ffffff] px-2 py-0.5 rounded border border-[#cbd5e1]">Cmd + V</span> on Mac) to paste.
              </li>
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>Step 6:</strong> Under "Signature defaults", select your new signature for "For new emails use" and "On reply/forward use".
                Scroll to the very bottom and click <span className="font-semibold text-[#002956]">"Save Changes"</span>.
              </li>
            </ol>
          </div>
        )}

        {activeGuide === 'outlook-web' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#006783]/10 flex items-center justify-center text-[#006783]">
                <span className="material-symbols-outlined text-[24px]">web</span>
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#002956]">
                  Installing Your Signature in Outlook on the Web (Office 365)
                </h3>
                <span className="text-[12px] text-[#43474f]">
                  Syncs across Outlook on the web and Outlook Mobile apps
                </span>
              </div>
            </div>

            <ol className="space-y-4 text-[14px] text-[#0b1c30] list-decimal list-inside pl-2 leading-relaxed">
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>Step 1:</strong> Click <span className="font-semibold text-[#002956]">"Copy Signature to Clipboard"</span> in SignatureCraft.
              </li>
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>Step 2:</strong> Go to Outlook on the web (outlook.office.com), click the gear icon <span className="font-semibold text-[#002956]">Settings ⚙</span> in top-right.
              </li>
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>Step 3:</strong> Navigate to <span className="font-semibold text-[#002956]">Mail → Compose and reply</span>.
              </li>
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>Step 4:</strong> Click <span className="font-semibold text-[#002956]">+ New signature</span>, name it, and paste with <span className="font-mono font-bold bg-[#ffffff] px-2 py-0.5 rounded border border-[#cbd5e1]">Ctrl + V</span>.
              </li>
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>Step 5:</strong> Set it as default for new messages and replies, then click <span className="font-semibold text-[#002956]">"Save"</span>.
              </li>
            </ol>
          </div>
        )}

        {activeGuide === 'outlook-app' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#002956]/10 flex items-center justify-center text-[#002956]">
                <span className="material-symbols-outlined text-[24px]">desktop_windows</span>
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#002956]">
                  Installing in Microsoft Outlook Desktop (Windows / Mac)
                </h3>
                <span className="text-[12px] text-[#43474f]">
                  Tip: Use our .DOCX download for 1-click native table import in Outlook Desktop
                </span>
              </div>
            </div>

            <ol className="space-y-4 text-[14px] text-[#0b1c30] list-decimal list-inside pl-2 leading-relaxed">
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>Step 1:</strong> Open Outlook Desktop, click <span className="font-semibold text-[#002956]">File → Options → Mail → Signatures</span> (or Outlook → Preferences → Signatures on Mac).
              </li>
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>Step 2:</strong> Click <span className="font-semibold text-[#002956]">New</span> and enter a name for your signature.
              </li>
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>Step 3:</strong> In the "Edit signature" box, press <span className="font-mono font-bold bg-[#ffffff] px-2 py-0.5 rounded border border-[#cbd5e1]">Ctrl + V</span> to paste your copied SignatureCraft signature.
              </li>
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>Step 4:</strong> Select your signature in the "New messages" and "Replies/forwards" dropdowns and click <span className="font-semibold text-[#002956]">OK</span>.
              </li>
            </ol>
          </div>
        )}

        {activeGuide === 'apple' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#173f73]/10 flex items-center justify-center text-[#173f73]">
                <span className="material-symbols-outlined text-[24px]">phone_iphone</span>
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#002956]">
                  Installing in Apple Mail (macOS & iOS)
                </h3>
                <span className="text-[12px] text-[#43474f]">
                  Retina high-DPI graphics and full font alignment
                </span>
              </div>
            </div>

            <ol className="space-y-4 text-[14px] text-[#0b1c30] list-decimal list-inside pl-2 leading-relaxed">
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>On Mac:</strong> Open Mail → Settings → Signatures. Select your account, click <span className="font-semibold text-[#002956]">+</span>, uncheck "Always match my default message font", and paste with <span className="font-mono font-bold bg-[#ffffff] px-2 py-0.5 rounded border border-[#cbd5e1]">Cmd + V</span>.
              </li>
              <li className="p-3 bg-[#eff4ff] rounded-xl border border-[#d6e3ff]">
                <strong>On iPhone / iPad:</strong> Send yourself an email with the signature from your desktop, open the email on your iOS device, select and copy the signature, then go to Settings → Mail → Signature and paste.
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};
