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

  // 1. Copy Rich HTML to System Clipboard
  const handleCopyClipboard = async () => {
    const plainText = `${state.personal.firstName} ${state.personal.lastName}
${state.personal.jobTitle} | ${state.company.name}
${state.personal.email} | ${state.personal.phone}
${state.company.website}`;

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const blobHtml = new Blob([signatureHtml], { type: 'text/html' });
        const blobText = new Blob([plainText], { type: 'text/plain' });
        const item = new ClipboardItem({
          'text/html': blobHtml,
          'text/plain': blobText,
        });
        await navigator.clipboard.write([item]);
        showToast('✓ Signature copied! Ready to paste into Gmail or Outlook');
        return;
      }
    } catch (err) {
      console.warn('Clipboard API error, trying fallback:', err);
    }

    // DOM selection fallback
    try {
      const container = document.createElement('div');
      container.innerHTML = signatureHtml;
      container.style.position = 'fixed';
      container.style.pointerEvents = 'none';
      container.style.opacity = '0';
      document.body.appendChild(container);

      const range = document.createRange();
      range.selectNode(container);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand('copy');
      selection?.removeAllRanges();
      document.body.removeChild(container);
      showToast('✓ Signature copied to clipboard!');
    } catch (err2) {
      showToast('Please select and copy signature manually');
    }
  };

  // 2. Download Standalone HTML file
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

    const blob = new Blob([markup], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `signature-${state.personal.firstName.toLowerCase()}-${state.personal.lastName.toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('✓ Downloaded standalone .HTML signature');
  };

  // 3. Download DOCX Generator (Word XML)
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
        <p style="font-size:12pt; color:#64748b; margin-bottom:20pt;">Copy the table signature below directly into your Microsoft Outlook or Word signature manager:</p>
        ${signatureHtml}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', wordContent], {
      type: 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('✓ Generated and downloaded .DOCX file');
  };

  // 4. Print / PDF Output
  const handlePrint = () => {
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
            body { font-family: ${state.style.fontFamily}; padding: 40px; }
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
              window.focus();
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <>
      <div className="bg-[#ffffff] p-5 rounded-2xl shadow-md border border-[#e2e8f0] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#006783]">
            Step 4 • Production Export
          </span>
          <span className="text-[11px] font-semibold text-[#43474f] bg-[#eff4ff] px-2 py-0.5 rounded border border-[#d6e3ff]">
            DKIM & CSS Inline Injected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Main Action: Copy Rich HTML */}
          <button
            type="button"
            onClick={handleCopyClipboard}
            className="sm:col-span-2 w-full py-3.5 px-5 rounded-xl bg-[#002956] hover:bg-[#173f73] text-[#ffffff] font-bold text-[14px] shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[20px]">content_copy</span>
            Copy Signature to Clipboard
          </button>

          {/* Download Standalone HTML */}
          <button
            type="button"
            onClick={handleDownloadHtml}
            className="py-2.5 px-4 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#002956] font-semibold text-[13px] transition-all flex items-center justify-center gap-1.5 border border-[#d6e3ff] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">html</span>
            Download .HTML
          </button>

          {/* Download Word .DOCX */}
          <button
            type="button"
            onClick={handleDownloadDocx}
            className="py-2.5 px-4 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#002956] font-semibold text-[13px] transition-all flex items-center justify-center gap-1.5 border border-[#d6e3ff] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">description</span>
            Download .DOCX
          </button>

          {/* Print / Save to PDF */}
          <button
            type="button"
            onClick={handlePrint}
            className="py-2.5 px-4 rounded-xl bg-[#ffffff] hover:bg-[#eff4ff] text-[#0b1c30] font-medium text-[12px] transition-all flex items-center justify-center gap-1.5 border border-[#d6e3ff] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            Print / Save to PDF
          </button>

          {/* View Raw Source Code */}
          <button
            type="button"
            onClick={() => setShowCodeModal(true)}
            className="py-2.5 px-4 rounded-xl bg-[#ffffff] hover:bg-[#eff4ff] text-[#0b1c30] font-medium text-[12px] transition-all flex items-center justify-center gap-1.5 border border-[#d6e3ff] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            View HTML Source
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-[#eff4ff] p-3 rounded-xl flex items-center gap-3 border border-[#d6e3ff] text-[#43474f]">
          <span className="material-symbols-outlined text-[#006783] text-[20px] flex-shrink-0">
            info
          </span>
          <span className="text-[11px] leading-relaxed">
            Paste directly into <strong>Gmail</strong> (Ctrl+V in settings),{' '}
            <strong>Outlook Web & Desktop</strong>, or <strong>Apple Mail</strong>. Tested across iOS &
            Android.
          </span>
        </div>
      </div>

      {/* Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-[#ffffff] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-[#cbd5e1]">
            <div className="p-4 bg-[#eff4ff] border-b border-[#d6e3ff] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006783]">code</span>
                <h4 className="font-bold text-[15px] text-[#002956]">
                  Inline Production HTML Source
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowCodeModal(false)}
                className="text-[#43474f] hover:text-[#0b1c30] p-1 rounded-lg"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-grow bg-[#0b1c30] text-[#a9c7ff]">
              <pre className="text-[12px] font-mono leading-relaxed whitespace-pre-wrap break-all">
                {signatureHtml}
              </pre>
            </div>
            <div className="p-3 bg-[#f8f9ff] border-t border-[#d6e3ff] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(signatureHtml);
                  showToast('✓ Raw HTML code copied to clipboard!');
                }}
                className="px-4 py-2 bg-[#002956] text-[#ffffff] font-semibold text-[12px] rounded-lg hover:bg-[#173f73] transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
                Copy HTML Code
              </button>
              <button
                type="button"
                onClick={() => setShowCodeModal(false)}
                className="px-3 py-2 bg-[#ffffff] border border-[#d6e3ff] text-[#0b1c30] text-[12px] rounded-lg hover:bg-[#eff4ff]"
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
