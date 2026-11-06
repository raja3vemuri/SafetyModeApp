import React, { useState, useEffect } from 'react';
import { NavTab, SignatureState, TemplateArchetype } from './types';
import { INITIAL_SIGNATURE_STATE } from './constants';
import { Header } from './components/Header';
import { TemplatePicker } from './components/TemplatePicker';
import { AccordionEditor } from './components/AccordionEditor';
import { EmailClientPreview } from './components/EmailClientPreview';
import { ExportToolbar } from './components/ExportToolbar';
import { TemplatesLibraryView } from './components/TemplatesLibraryView';
import { LivePreviewAndExportView } from './components/LivePreviewAndExportView';
import { HelpDocsView } from './components/HelpDocsView';
import { Toast } from './components/Toast';
import { AuthProvider } from './context/AuthContext';
import { CloudSignaturesModal } from './components/CloudSignaturesModal';
import { SavedSignatureRecord } from './services/signatureService';

const STORAGE_KEY = 'signaturecraft_data_v4';

function SignatureStudio() {
  const [activeTab, setActiveTab] = useState<NavTab>('signature-editor');
  const [isCloudModalOpen, setIsCloudModalOpen] = useState<boolean>(false);

  const [state, setState] = useState<SignatureState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_SIGNATURE_STATE,
          ...parsed,
          personal: { ...INITIAL_SIGNATURE_STATE.personal, ...(parsed.personal || {}) },
          company: { ...INITIAL_SIGNATURE_STATE.company, ...(parsed.company || {}) },
          style: {
            ...INITIAL_SIGNATURE_STATE.style,
            ...(parsed.style || {}),
            toggles: { ...INITIAL_SIGNATURE_STATE.style.toggles, ...(parsed.style?.toggles || {}) },
          },
        };
      }
    } catch (e) {
      console.warn('Could not restore saved signature state', e);
    }
    return INITIAL_SIGNATURE_STATE;
  });

  const [rememberWorkstation, setRememberWorkstation] = useState<boolean>(() => {
    return localStorage.getItem('signaturecraft_remember') !== 'false';
  });

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    if (rememberWorkstation) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (err) {
        console.warn('Storage sync error', err);
      }
    }
  }, [state, rememberWorkstation]);

  const handleToggleRemember = (enabled: boolean) => {
    setRememberWorkstation(enabled);
    localStorage.setItem('signaturecraft_remember', enabled ? 'true' : 'false');
    if (!enabled) {
      localStorage.removeItem(STORAGE_KEY);
      showToast('Workstation auto-save deactivated');
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      showToast('Auto-save enabled for this workstation');
    }
  };

  const handleClearSavedData = () => {
    if (window.confirm('Reset and clear all saved email signature configurations?')) {
      localStorage.removeItem(STORAGE_KEY);
      setState(INITIAL_SIGNATURE_STATE);
      showToast('All saved configurations reset');
    }
  };

  const handleReloadDefaults = () => {
    setState(INITIAL_SIGNATURE_STATE);
    showToast('Loaded baseline executive defaults');
  };

  const handleRestoreStyle = () => {
    setState(prev => ({
      ...prev,
      style: {
        ...INITIAL_SIGNATURE_STATE.style,
      },
      spacingPreset: 'normal',
      socialIconSize: 20,
    }));
    showToast('Style and signature blocks reset to baseline defaults');
  };

  const handleSelectTemplate = (tmpl: TemplateArchetype) => {
    setState(prev => ({ ...prev, template: tmpl }));
    showToast(`Switched archetype to ${tmpl.toUpperCase()}`);
  };

  const handleStepClick = (stepNum: number) => {
    setState(prev => ({ ...prev, activeStep: stepNum }));
    if (stepNum === 1) {
      const el = document.getElementById('templatePicker');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (stepNum === 4) {
      const exportBtn = document.getElementById('exportSection');
      exportBtn?.scrollIntoView({ behavior: 'smooth' });
      showToast('Ready for production export!');
    }
  };

  const handleLoadCloudSignature = (record: SavedSignatureRecord) => {
    setState(prev => ({
      ...prev,
      template: (record.template as TemplateArchetype) || prev.template,
      personal: { ...prev.personal, ...(record.personal || {}) },
      company: { ...prev.company, ...(record.company || {}) },
      style: { ...prev.style, ...(record.style || {}) },
      socials: record.socials || prev.socials,
      spacingPreset: record.spacingPreset || prev.spacingPreset,
      socialIconSize: record.socialIconSize || prev.socialIconSize,
    }));
  };

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-[#0b1c30] flex flex-col font-sans">
      {/* Toast Feedback Component */}
      <Toast message={toastMsg} />

      {/* Cloud Signatures Firestore Modal */}
      <CloudSignaturesModal
        isOpen={isCloudModalOpen}
        onClose={() => setIsCloudModalOpen(false)}
        currentState={state}
        onLoadSignature={handleLoadCloudSignature}
        showToast={showToast}
      />

      {/* Header with Auth Integration */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCloudSignatures={() => setIsCloudModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-16">
        {activeTab === 'templates-library' && (
          <TemplatesLibraryView
            currentState={state}
            onApplyTemplate={handleSelectTemplate}
            onApplyProfile={profile => {
              setState(prev => ({
                ...prev,
                template: profile.template,
                personal: { ...prev.personal, ...profile.personal },
                company: { ...prev.company, ...profile.company },
              }));
            }}
            onGoToEditor={() => setActiveTab('signature-editor')}
            showToast={showToast}
          />
        )}

        {activeTab === 'live-preview-and-export' && (
          <LivePreviewAndExportView
            state={state}
            onGoToEditor={() => setActiveTab('signature-editor')}
            showToast={showToast}
          />
        )}

        {activeTab === 'help-and-documentation' && (
          <HelpDocsView onGoToEditor={() => setActiveTab('signature-editor')} />
        )}

        {activeTab === 'signature-editor' && (
          <div className="flex flex-col w-full">
            {/* Page Title & Steps Bar */}
            <section className="w-full bg-[#ffffff] border-b border-[#cbd5e1] py-5 px-4 sm:px-6 lg:px-8 shadow-xs">
              <div className="max-w-[1560px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-[#d29900] mb-1">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span className="text-[11px] uppercase tracking-wider font-extrabold">
                      Studio Engine v4.2
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d29900]"></span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002956] tracking-tight">
                    EMAIL SIGNATURE GENERATOR
                  </h1>
                  <p className="text-[13px] sm:text-[14px] text-[#475569] mt-0.5">
                    Create, brand-align, and deploy email-safe signatures in minutes across any browser.
                  </p>
                </div>

                {/* 4-Step Indicator */}
                <div className="flex items-center gap-1 bg-[#f1f5f9] p-1.5 rounded-2xl border border-[#cbd5e1]">
                  {[
                    { step: 1, label: 'Template' },
                    { step: 2, label: 'Layout' },
                    { step: 3, label: 'Details' },
                    { step: 4, label: 'Export' },
                  ].map(({ step, label }, idx, arr) => {
                    const isActive = state.activeStep === step;
                    return (
                      <React.Fragment key={step}>
                        <button
                          type="button"
                          onClick={() => handleStepClick(step)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#002956] text-white shadow-sm ring-1 ring-[#d29900]'
                              : 'text-[#475569] hover:bg-white hover:text-[#002956]'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                              isActive
                                ? 'bg-[#d29900] text-white shadow-xs'
                                : 'bg-[#e2e8f0] text-[#475569]'
                            }`}
                          >
                            {step}
                          </span>
                          <span>{label}</span>
                        </button>
                        {idx < arr.length - 1 && (
                          <span className="material-symbols-outlined text-[#94a3b8] text-[16px]">
                            chevron_right
                          </span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Interactive Template Strip (5 Distinct Archetypes) */}
            <TemplatePicker
              selectedTemplate={state.template}
              onSelectTemplate={handleSelectTemplate}
            />

            {/* Two-Column Responsive Workspace */}
            <div className="max-w-[1560px] w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* LEFT COLUMN: SIGNATURE ACCORDION EDITOR (7 cols) */}
              <div className="xl:col-span-7 flex flex-col gap-4">
                <AccordionEditor
                  state={state}
                  onChange={setState}
                  onRestoreStyle={handleRestoreStyle}
                  onClearSavedData={handleClearSavedData}
                  onReloadDefaults={handleReloadDefaults}
                  rememberWorkstation={rememberWorkstation}
                  onToggleRemember={handleToggleRemember}
                  showToast={showToast}
                  onOpenCloudSignatures={() => setIsCloudModalOpen(true)}
                />
              </div>

              {/* RIGHT COLUMN: LIVE PREVIEW & EXPORT DOCK (5 cols) */}
              <div
                id="exportSection"
                className="xl:col-span-5 flex flex-col gap-5 xl:sticky xl:top-20"
              >
                {/* Simulated Client View */}
                <EmailClientPreview
                  state={state}
                  onChangeCanvasMode={mode =>
                    setState(prev => ({ ...prev, canvasMode: mode }))
                  }
                  onToggleDarkCanvas={() =>
                    setState(prev => ({ ...prev, isDarkCanvas: !prev.isDarkCanvas }))
                  }
                />

                {/* Production Export Action Toolbar */}
                <ExportToolbar state={state} showToast={showToast} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#07162c] text-[#94a3b8] border-t border-[#1b3152] mt-12 shadow-inner">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d29900] shadow-xs"></span>
            <span className="text-white font-medium text-[13px]">
              copy rights reserved by Raja Vemuri @2026
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#d29900] font-semibold">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              DKIM & HTML Standards Compliant
            </span>
            <span className="text-[#64748b]">v4.2.1-prod</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SignatureStudio />
    </AuthProvider>
  );
}
