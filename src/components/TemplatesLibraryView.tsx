import React, { useState } from 'react';
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
  const [filter, setFilter] = useState<'all' | 'corporate' | 'modern' | 'minimal'>('all');

  return (
    <div className="max-w-[1560px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
      {/* Hero Header */}
      <div className="bg-[#ffffff] p-6 sm:p-8 rounded-2xl shadow-sm border border-[#e2e8f0] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#006783] mb-1">
            <span className="material-symbols-outlined text-[18px]">collections_bookmark</span>
            <span className="text-[12px] font-bold uppercase tracking-wider">
              SignatureCraft Design Systems
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#002956] tracking-tight">
            Professional Email Archetypes & Sample Personas
          </h2>
          <p className="text-[14px] text-[#43474f] mt-1 max-w-2xl">
            Choose from battle-tested, email-safe archetypes engineered to withstand Outlook,
            Gmail, and Apple Mail rendering variations. Click any template to apply it immediately.
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToEditor}
          className="px-5 py-2.5 bg-[#002956] text-[#ffffff] font-bold text-[13px] rounded-xl hover:bg-[#173f73] transition-all flex items-center gap-2 shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">edit</span>
          Back to Editor
        </button>
      </div>

      {/* Industry Presets Quick-Load Strip */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-[#002956] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006783] text-[20px]">
              badge
            </span>
            Ready-to-Use Executive Presets (1-Click Apply)
          </h3>
          <span className="text-[12px] text-[#43474f]">
            Pre-configured with authentic roles and brand styling
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_PROFILES.map(profile => (
            <div
              key={profile.id}
              className="bg-[#ffffff] p-4 rounded-xl border border-[#d6e3ff] shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#006783] bg-[#eff4ff] px-2 py-0.5 rounded">
                    {profile.roleTag}
                  </span>
                  <span className="text-[11px] text-[#737780] font-mono capitalize">
                    {profile.template}
                  </span>
                </div>
                <h4 className="font-bold text-[15px] text-[#002956]">{profile.label}</h4>
                <p className="text-[12px] text-[#43474f] mt-1">
                  {profile.personal.firstName} {profile.personal.lastName} •{' '}
                  {profile.company.name}
                </p>
              </div>

              <div className="pt-2 border-t border-[#f1f5f9] flex items-center justify-between">
                <span className="text-[11px] text-[#737780]">
                  {profile.personal.email}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onApplyProfile(profile);
                    showToast(`✓ Applied profile: ${profile.label}`);
                    onGoToEditor();
                  }}
                  className="px-3 py-1.5 bg-[#eff4ff] hover:bg-[#002956] text-[#002956] hover:text-[#ffffff] rounded-lg text-[12px] font-semibold border border-[#d6e3ff] transition-all"
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
        <h3 className="text-[18px] font-bold text-[#002956] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006783] text-[20px]">
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
                    ? 'border-[#006783] ring-2 ring-[#006783]/20 shadow-md'
                    : 'border-[#e2e8f0] hover:border-[#006783]/40 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[16px] font-bold text-[#002956]">{tmpl.name}</h4>
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-[#dce9ff] text-[#002956] px-2 py-0.5 rounded-full">
                        {tmpl.badgeText}
                      </span>
                    </div>
                    {isCurrent && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#006783] bg-[#eff4ff] px-2.5 py-1 rounded-full border border-[#d6e3ff]">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-[#43474f] mb-3">{tmpl.description}</p>

                  {/* Rendered Signature Box */}
                  <div className="bg-[#f8f9ff] p-4 rounded-xl border border-[#d6e3ff] min-h-[140px] flex items-center justify-center overflow-x-auto">
                    <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#f1f5f9]">
                  <span className="text-[12px] text-[#737780]">
                    Universal HTML Table Layout
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onApplyTemplate(tmpl.id);
                      showToast(`✓ Switched archetype to ${tmpl.name}`);
                      onGoToEditor();
                    }}
                    className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all flex items-center gap-1.5 ${
                      isCurrent
                        ? 'bg-[#e5eeff] text-[#002956]'
                        : 'bg-[#002956] text-[#ffffff] hover:bg-[#173f73] shadow-xs'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
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
