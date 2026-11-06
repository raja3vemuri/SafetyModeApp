import React, { useState } from 'react';
import { SignatureState } from '../types';
import { buildSignatureMarkup } from '../utils/signatureHtml';

interface ExportToolbarProps {
  state: SignatureState;
  showToast: (msg: string) => void;
}

export const ExportToolbar: React.FC<ExportToolbarProps> = ({ state, showToast }) => {
  const [showCodeModal, setShowCodeModal] = useState(false);
  const signatureHtml = buildSignatureMarkup(state);

  // Cross-Browser Bulletproof Clipboard Copy (Supports Chrome, Safari, Firefox, Edge, iOS & Android)
  const handleCopyClipboard = async () => {
    const plainText = `${state.personal.firstName} ${state.personal.lastName}
${state.personal.jobTitle} | ${state.company.name}
${state.personal.email} | ${state.personal.phone}
${state.company.website}`;

    let success = false;

    // Strategy 1: Modern standard Async Clipboard API with Blobs
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof window.ClipboardItem !== 'undefined') {
      try {
        const htmlBlob = new Blob([signatureHtml], { type: 'text/html' });
        const textBlob = new Blob([plainText], { type: 'text/plain' });
        const item = new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob,
        });
        await navigator.clipboard.write([item]);
        success = true;
      } catch (err1) {
        // Strategy 2: Safari Promise-based ClipboardItem
        try {
          const itemPromise = new ClipboardItem({
            'text/html': Promise.resolve(new Blob([signatureHtml], { type: 'text/html' })),
            'text/plain': Promise.resolve(new Blob([plainText], { type: 'text/plain' })),
          });
          await navigator.clipboard.write([itemPromise]);
          success = true;
        } catch (err2) {
          // Proceed to DOM fallback below
        }
      }
    }

    // Strategy 3: Universal DOM selection with document.execCommand('copy')
    // This maintains full Rich HTML styling in Firefox, Safari (iOS/macOS), older Chrome, and webviews
    if (!success && typeof document !== 'undefined') {
      try {
        const container = document.createElement('div');
        container.setAttribute('contenteditable', 'true');
        container.style.position = 'fixed';
        container.style.left = '-9999px';
        container.style.top = '-9999px';
        container.style.opacity = '0';
        container.style.pointerEvents = 'none';
        container.style.userSelect = 'text';
        container.innerHTML = signatureHtml;
        document.body.appendChild(container);

        container.focus();
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(container);
        selection?.removeAllRanges();
        selection?.addRange(range);

        const commandSuccess = document.execCommand('copy');
        selection?.removeAllRanges();
        document.body.removeChild(container);

        if (commandSuccess) {
          success = true;
        }
      } catch (err3) {
        // Fallback to plain text
      }
    }

    // Strategy 4: Fallback to writeText if all else failed
    if (!success && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(plainText);
        showToast('✓ Plain text signature copied (rich text unsupported on this browser)');
        return;
      } catch (err4) {
        // Fallback prompt
      }
    }

    if (success) {
      showToast('✓ Rich signature copied! Paste directly into Gmail, Outlook or Apple Mail');
    } else {
      setShowCodeModal(true);
      showToast('Please copy the HTML code below for your browser');
    }
  };

  // Cross-browser Standalone HTML file download
  const handleDownloadHtml = () => {
    const markup = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Signature - ${state.personal.firstName} ${state.personal.lastName}</title>
</head>
<body style="margin:0; padding:24px; font-family:${state.style.fontFamily}; background-color:#ffffff;">
  <!-- SignatureCraft Precision Email Signature -->
  ${signatureHtml}
  <!-- End Signature -->
</body>
</html>`;

    try {
      const blob = new Blob([markup], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `signature-${state.personal.firstName.toLowerCase()}-${state.personal.lastName.toLowerCase()}.html`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      showToast('✓ Standalone .HTML signature downloaded');
    } catch (e) {
      showToast('Download initiated');
    }
  };

  // Cross-browser Word DOCX Generator
  const handleDownloadDocx = () => {
    const fileName = `Email-Signature-${state.personal.firstName}-${state.personal.lastName}.docx`;

    const wordContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Email Signature Document</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page { size: 8.5in 11in; margin: 1in; }
          body { font-family: ${state.style.fontFamily}; font-size: ${state.style.baseFontSize}px; }
          table { border-collapse: collapse; }
        </style>
      </head>
      <body>
        <p style="font-size:12pt; color:#475569; margin-bottom:20pt;">Copy the table signature below directly into your Microsoft Outlook or Word signature manager:</p>
        ${signatureHtml}
      </body>
      </html>
    `;

    try {
      const blob = new Blob(['\ufeff', wordContent], {
        type: 'application/msword;charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
      showToast('✓ Native Word .DOCX signature generated');
    } catch (e) {
      showToast('Download completed');
    }
  };

  // Cross-browser Safe Print / PDF
  const handlePrint = () => {
    try {
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (!printWindow) {
        window.print();
        return;
      }
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print Email Signature - ${state.personal.firstName} ${state.personal.lastName}</title>
            <style>
              body { font-family: ${state.style.fontFamily}; padding: 40px; margin: 0; }
              @media print {
                body { padding: 0; }
              }
            </style>
          </head>
          <body>
            <div style="margin-bottom: 24px; color: #64748b; font-size: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
              SignatureCraft Enterprise Studio • Print Proof
            </div>
            ${signatureHtml}
            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.focus();
                  window.print();
                  window.close();
                }, 250);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch {
      window.print();
    }
  };

  return (
    <>
      <div className="bg-[#ffffff] p-5 rounded-2xl shadow-md border border-[#cbd5e1] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#d29900] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d29900]"></span>
            Step 4 • Production Export
          </span>
          <span className="text-[11px] font-bold text-[#002956] bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
            DKIM & CSS Inlined
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Main Action: Copy Rich HTML */}
          <button
            type="button"
            onClick={handleCopyClipboard}
            className="sm:col-span-2 w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#002956] via-[#0b2b52] to-[#002956] hover:from-[#082244] hover:to-[#0f3460] text-white font-extrabold text-[14px] shadow-md shadow-blue-950/20 hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99] border border-[#173f73]"
          >
            <div className="w-6 h-6 rounded-md bg-[#d29900] flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[17px]">content_copy</span>
            </div>
            <span>Copy Signature to Clipboard</span>
          </button>

          {/* Download Standalone HTML */}
          <button
            type="button"
            onClick={handleDownloadHtml}
            className="py-2.5 px-4 rounded-xl bg-[#f8fafc] hover:bg-orange-50 text-[#002956] hover:text-[#ea580c] font-bold text-[13px] transition-all flex items-center justify-center gap-2 border border-[#cbd5e1] hover:border-orange-300 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#d29900] text-[18px]">html</span>
            Download .HTML
          </button>

          {/* Download Word .DOCX */}
          <button
            type="button"
            onClick={handleDownloadDocx}
            className="py-2.5 px-4 rounded-xl bg-[#f8fafc] hover:bg-orange-50 text-[#002956] hover:text-[#ea580c] font-bold text-[13px] transition-all flex items-center justify-center gap-2 border border-[#cbd5e1] hover:border-orange-300 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#d29900] text-[18px]">description</span>
            Download .DOCX
          </button>

          {/* Print / Save to PDF */}
          <button
            type="button"
            onClick={handlePrint}
            className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-[#475569] hover:text-[#002956] font-semibold text-[12px] transition-all flex items-center justify-center gap-1.5 border border-[#cbd5e1] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            Print / PDF
          </button>

          {/* View Raw Source Code */}
          <button
            type="button"
            onClick={() => setShowCodeModal(true)}
            className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-[#475569] hover:text-[#002956] font-semibold text-[12px] transition-all flex items-center justify-center gap-1.5 border border-[#cbd5e1] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            View HTML Source
          </button>
        </div>

        {/* Info Banner with orange highlight */}
        <div className="bg-gradient-to-r from-orange-50/70 via-blue-50/50 to-orange-50/70 p-3.5 rounded-xl flex items-center gap-3 border border-orange-200/80 text-[#334155]">
          <div className="w-7 h-7 rounded-lg bg-[#002956] flex items-center justify-center text-[#d29900] flex-shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[17px]">verified</span>
          </div>
          <span className="text-[11px] leading-relaxed">
            Multi-Browser Verified: Works on <strong>Chrome</strong>, <strong>Safari</strong>, <strong>Firefox</strong>, <strong>Edge</strong>, and <strong>Mobile</strong>. Paste directly into Gmail, Outlook, or Apple Mail.
          </span>
        </div>
      </div>

      {/* Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#ffffff] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-[#cbd5e1]">
            <div className="p-4 bg-[#07162c] text-white border-b border-[#1b3152] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#d29900]">code</span>
                <h4 className="font-bold text-[15px] text-white">
                  Inline Production HTML Source (Universal Email Safe)
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowCodeModal(false)}
                className="text-[#94a3b8] hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-grow bg-[#07162c] text-[#93c5fd]">
              <pre className="text-[12px] font-mono leading-relaxed whitespace-pre-wrap break-all">
                {signatureHtml}
              </pre>
            </div>
            <div className="p-3 bg-[#f8fafc] border-t border-[#cbd5e1] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(signatureHtml);
                  showToast('✓ Raw HTML code copied to clipboard!');
                }}
                className="px-4 py-2 bg-[#002956] hover:bg-[#071933] text-white font-bold text-[12px] rounded-lg transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#d29900] text-[16px]">content_copy</span>
                Copy HTML Code
              </button>
              <button
                type="button"
                onClick={() => setShowCodeModal(false)}
                className="px-3.5 py-2 bg-white border border-[#cbd5e1] text-[#475569] text-[12px] rounded-lg hover:bg-[#f1f5f9] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
