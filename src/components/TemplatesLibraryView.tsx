import React from 'react';
import { SignatureState, TemplateArchetype } from '../types';
import { TEMPLATES_CONFIG, SAMPLE_PROFILES } from '../constants';
import { buildSignatureMarkup } from '../utils/signatureHtml';

interface TemplatesLibraryViewProps {
  currentState: SignatureState;
  onApplyTemplate: (template: TemplateArchetype) => void;
  onApplyProfile: (profile: (typeof SAMPLE_PROFILES)[0]) => void;
  onGoToEditor: () => void;
  showToast: (msg: string) => void;
}

export const TemplatesLibraryView: React.FC<TemplatesLibraryViewProps> = ({
  currentState,
  onApplyTemplate,
  onApplyProfile,
  onGoToEditor,
  showToast,
}) => {
  return (
    <div className="max-w-[1560px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
      {/* Hero Header with Dark Blue and Orange Accents */}
      <div className="bg-gradient-to-r from-[#07162c] via-[#002956] to-[#0f3460] p-6 sm:p-8 rounded-3xl shadow-xl border border-[#1b3152] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#d29900]"></span>
            <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#d29900]">
              SignatureCraft Design Systems
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Professional Email Archetypes & Sample Personas
          </h2>
          <p className="text-[14px] text-[#93c5fd] mt-1.5 max-w-2xl leading-relaxed">
            Choose from battle-tested, email-safe archetypes engineered to withstand Outlook,
            Gmail, and Apple Mail rendering variations across any browser.
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToEditor}
          className="px-5 py-3 bg-[#d29900] hover:bg-[#ea580c] text-white font-extrabold text-[13px] rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-orange-950/30 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">edit</span>
          Back to Editor
        </button>
      </div>

      {/* Industry Presets Quick-Load Strip */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-extrabold text-[#002956] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#d29900] text-[22px]">
              badge
            </span>
            Ready-to-Use Executive Presets (1-Click Apply)
          </h3>
          <span className="text-[12px] text-[#475569]">
            Pre-configured with authentic roles and brand styling
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_PROFILES.map(profile => (
            <div
              key={profile.id}
              className="bg-[#ffffff] p-5 rounded-2xl border border-[#cbd5e1] shadow-xs hover:shadow-md hover:border-[#d29900]/50 transition-all flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#ea580c] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md">
                    {profile.roleTag}
                  </span>
                  <span className="text-[11px] text-[#002956] font-mono font-bold capitalize">
                    {profile.template}
                  </span>
                </div>
                <h4 className="font-extrabold text-[15px] text-[#002956]">{profile.label}</h4>
                <p className="text-[12px] text-[#475569] mt-1">
                  {profile.personal.firstName} {profile.personal.lastName} •{' '}
                  {profile.company.name}
                </p>
              </div>

              <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between">
                <span className="text-[11px] text-[#64748b]">
                  {profile.personal.email}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onApplyProfile(profile);
                    showToast(`✓ Applied profile: ${profile.label}`);
                    onGoToEditor();
                  }}
                  className="px-3.5 py-1.5 bg-[#002956] hover:bg-[#d29900] text-white rounded-xl text-[12px] font-bold shadow-xs transition-all cursor-pointer"
                >
                  Load Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All 5 Archetypes Deep Dive */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[18px] font-extrabold text-[#002956] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#d29900] text-[22px]">
            view_quilt
          </span>
          The 5 Foundation Archetypes
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {TEMPLATES_CONFIG.map(tmpl => {
            const isCurrent = currentState.template === tmpl.id;
            const previewState: SignatureState = {
              ...currentState,
              template: tmpl.id,
            };
            const previewHtml = buildSignatureMarkup(previewState);

            return (
              <div
                key={tmpl.id}
                className={`bg-[#ffffff] rounded-2xl p-5 border shadow-sm transition-all flex flex-col justify-between gap-4 ${
                  isCurrent
                    ? 'border-[#002956] ring-2 ring-[#d29900]/50 shadow-md'
                    : 'border-[#cbd5e1] hover:border-[#d29900]/50 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[16px] font-extrabold text-[#002956]">{tmpl.name}</h4>
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full border border-orange-200">
                        {tmpl.badgeText}
                      </span>
                    </div>
                    {isCurrent && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#002956] bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                        <span className="material-symbols-outlined text-[#d29900] text-[14px]">check</span>
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-[#475569] mb-3">{tmpl.description}</p>

                  {/* Rendered Signature Box */}
                  <div className="bg-[#f8fafc] p-4 rounded-xl border border-[#cbd5e1] min-h-[140px] flex items-center justify-center overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#f1f5f9]">
                  <span className="text-[12px] text-[#64748b]">
                    Universal HTML Table Layout
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onApplyTemplate(tmpl.id);
                      showToast(`✓ Switched archetype to ${tmpl.name}`);
                      onGoToEditor();
                    }}
                    className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isCurrent
                        ? 'bg-blue-50 text-[#002956] border border-blue-200'
                        : 'bg-[#002956] text-white hover:bg-[#d29900] shadow-sm'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[16px] ${isCurrent ? 'text-[#d29900]' : 'text-white'}`}>
                      {isCurrent ? 'check_circle' : 'palette'}
                    </span>
                    {isCurrent ? 'Current Archetype' : 'Select & Edit'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
