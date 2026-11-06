import React, { useState } from 'react';

interface HelpDocsViewProps {
  onGoToEditor: () => void;
}

export const HelpDocsView: React.FC<HelpDocsViewProps> = ({ onGoToEditor }) => {
  const [activeGuide, setActiveGuide] = useState<'gmail' | 'outlook-web' | 'outlook-app' | 'apple'>('gmail');

  return (
    <div className="max-w-[1560px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#07162c] via-[#002956] to-[#0f3460] p-6 sm:p-8 rounded-3xl shadow-xl border border-[#1b3152] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#d29900]"></span>
            <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#d29900]">
              Installation Guides & Architecture
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Help & Email Client Documentation
          </h2>
          <p className="text-[14px] text-[#93c5fd] mt-1 max-w-2xl leading-relaxed">
            Follow our verified copy-paste instructions to install your new signature across Chrome, Safari, Firefox, Edge, and mobile mail clients.
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToEditor}
          className="px-5 py-3 bg-[#d29900] hover:bg-[#ea580c] text-white font-extrabold text-[13px] rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-orange-950/30 cursor-pointer"
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
            className={`px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeGuide === id
                ? 'bg-[#002956] text-white shadow-sm ring-1 ring-[#d29900]'
                : 'bg-white text-[#475569] hover:bg-orange-50 hover:text-[#002956] border border-[#cbd5e1]'
            }`}
          >
            <span className={`material-symbols-outlined text-[18px] ${activeGuide === id ? 'text-[#d29900]' : ''}`}>
              {icon}
            </span>
            {label}
          </button>
        ))}
      </div>

      {/* Guide Content */}
      <div className="bg-[#ffffff] rounded-3xl shadow-sm border border-[#cbd5e1] p-6 lg:p-8">
        {activeGuide === 'gmail' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#ea580c]">
                <span className="material-symbols-outlined text-[24px]">mail</span>
              </div>
              <div>
                <h3 className="text-[18px] font-extrabold text-[#002956]">
                  Installing Your Signature in Gmail (Any Browser)
                </h3>
                <span className="text-[12px] text-[#64748b]">
                  Requires under 60 seconds • Tested on Chrome, Safari, Firefox & Edge
                </span>
              </div>
            </div>

            <ol className="space-y-4 text-[14px] text-[#0f172a] list-decimal list-inside pl-2 leading-relaxed">
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>Step 1:</strong> In SignatureCraft, click{' '}
                <span className="font-bold text-[#002956]">"Copy Signature to Clipboard"</span>.
              </li>
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>Step 2:</strong> Open Gmail in your web browser, click the gear icon{' '}
                <span className="font-bold text-[#002956]">Settings ⚙</span> in the top-right,
                and choose <span className="font-bold text-[#002956]">"See all settings"</span>.
              </li>
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>Step 3:</strong> Under the <span className="font-bold text-[#002956]">"General"</span> tab,
                scroll down to the <span className="font-bold text-[#002956]">"Signature"</span> section.
              </li>
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>Step 4:</strong> Click <span className="font-bold text-[#002956]">+ Create new</span>, name it (e.g. "Work"),
                and click into the empty rich text box.
              </li>
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>Step 5:</strong> Press <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#cbd5e1] text-[#ea580c]">Ctrl + V</span> (or <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#cbd5e1] text-[#ea580c]">Cmd + V</span> on Mac) to paste.
              </li>
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>Step 6:</strong> Under "Signature defaults", select your new signature for "For new emails use" and "On reply/forward use".
                Scroll to the very bottom and click <span className="font-bold text-[#002956]">"Save Changes"</span>.
              </li>
            </ol>
          </div>
        )}

        {activeGuide === 'outlook-web' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#002956]">
                <span className="material-symbols-outlined text-[24px]">web</span>
              </div>
              <div>
                <h3 className="text-[18px] font-extrabold text-[#002956]">
                  Installing Your Signature in Outlook on the Web (Office 365)
                </h3>
                <span className="text-[12px] text-[#64748b]">
                  Syncs across Outlook on the web and Outlook Mobile apps
                </span>
              </div>
            </div>

            <ol className="space-y-4 text-[14px] text-[#0f172a] list-decimal list-inside pl-2 leading-relaxed">
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>Step 1:</strong> Click <span className="font-bold text-[#002956]">"Copy Signature to Clipboard"</span> in SignatureCraft.
              </li>
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>Step 2:</strong> Go to Outlook on the web (outlook.office.com), click the gear icon <span className="font-bold text-[#002956]">Settings ⚙</span> in top-right.
              </li>
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>Step 3:</strong> Navigate to <span className="font-bold text-[#002956]">Mail → Compose and reply</span>.
              </li>
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>Step 4:</strong> Click <span className="font-bold text-[#002956]">+ New signature</span>, name it, and paste with <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#cbd5e1] text-[#ea580c]">Ctrl + V</span>.
              </li>
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>Step 5:</strong> Set it as default for new messages and replies, then click <span className="font-bold text-[#002956]">"Save"</span>.
              </li>
            </ol>
          </div>
        )}

        {activeGuide === 'outlook-app' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#002956]">
                <span className="material-symbols-outlined text-[24px]">desktop_windows</span>
              </div>
              <div>
                <h3 className="text-[18px] font-extrabold text-[#002956]">
                  Installing in Microsoft Outlook Desktop (Windows / Mac)
                </h3>
                <span className="text-[12px] text-[#64748b]">
                  Tip: Use our .DOCX download for native formatted table import in Outlook Desktop
                </span>
              </div>
            </div>

            <ol className="space-y-4 text-[14px] text-[#0f172a] list-decimal list-inside pl-2 leading-relaxed">
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>Step 1:</strong> Open Outlook Desktop, click <span className="font-bold text-[#002956]">File → Options → Mail → Signatures</span> (or Outlook → Preferences → Signatures on Mac).
              </li>
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>Step 2:</strong> Click <span className="font-bold text-[#002956]">New</span> and enter a name for your signature.
              </li>
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>Step 3:</strong> In the "Edit signature" box, press <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#cbd5e1] text-[#ea580c]">Ctrl + V</span> to paste your copied SignatureCraft signature.
              </li>
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>Step 4:</strong> Select your signature in the "New messages" and "Replies/forwards" dropdowns and click <span className="font-bold text-[#002956]">OK</span>.
              </li>
            </ol>
          </div>
        )}

        {activeGuide === 'apple' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#ea580c]">
                <span className="material-symbols-outlined text-[24px]">phone_iphone</span>
              </div>
              <div>
                <h3 className="text-[18px] font-extrabold text-[#002956]">
                  Installing in Apple Mail (macOS & iOS)
                </h3>
                <span className="text-[12px] text-[#64748b]">
                  Retina high-DPI graphics and full font alignment across iPhone, iPad & Mac
                </span>
              </div>
            </div>

            <ol className="space-y-4 text-[14px] text-[#0f172a] list-decimal list-inside pl-2 leading-relaxed">
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>On Mac:</strong> Open Mail → Settings → Signatures. Select your account, click <span className="font-bold text-[#002956]">+</span>, uncheck "Always match my default message font", and paste with <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#cbd5e1] text-[#ea580c]">Cmd + V</span>.
              </li>
              <li className="p-4 bg-[#f8fafc] rounded-2xl border border-[#cbd5e1]">
                <strong>On iPhone / iPad:</strong> Send yourself an email with the signature from your desktop, open the email on your iOS device, select and copy the signature, then go to Settings → Mail → Signature and paste.
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};
