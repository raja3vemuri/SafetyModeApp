import React from 'react';
import { TemplateArchetype } from '../types';

interface TemplatePickerProps {
  selectedTemplate: TemplateArchetype;
  onSelectTemplate: (template: TemplateArchetype) => void;
}

export const TemplatePicker: React.FC<TemplatePickerProps> = ({
  selectedTemplate,
  onSelectTemplate,
}) => {
  return (
    <section className="w-full bg-gradient-to-r from-[#edf2f9] via-[#e8eff8] to-[#edf2f9] py-3.5 px-4 sm:px-6 lg:px-8 border-y border-[#d3dfed] shadow-inner">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
          <span className="text-[12px] sm:text-[13px] uppercase tracking-wider font-extrabold text-[#002956] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#d29900] text-[20px]">palette</span>
            Select Professional Archetype
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-orange-700 bg-orange-100/80 px-2 py-0.5 rounded-md border border-orange-200 hidden sm:inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d29900]"></span>
              5 Email-Safe Layouts
            </span>
            <span className="text-[12px] text-[#475569] hidden md:inline">
              Inline email table layout automatically updates in preview
            </span>
          </div>
        </div>

        {/* 5 Distinct Archetypes Cards Grid */}
        <div className="flex flex-col gap-3" id="templatePicker">
          {/* 1. Classic Corporate */}
          <div
            onClick={() => onSelectTemplate('classic')}
            className={`cursor-pointer p-3 rounded-xl transition-all duration-200 border relative overflow-hidden group ${
              selectedTemplate === 'classic'
                ? 'bg-[#ffffff] border-[#002956] shadow-md ring-2 ring-[#d29900]/50'
                : 'bg-[#ffffff]/90 border-[#cbd5e1] shadow-xs hover:border-[#d29900]/60 hover:shadow-sm'
            }`}
          >
            {selectedTemplate === 'classic' && (
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#002956] via-[#d29900] to-[#002956]"></div>
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[13px] text-[#002956] truncate">Classic Corporate</span>
              <span
                className={`material-symbols-outlined text-[19px] ${
                  selectedTemplate === 'classic' ? 'text-[#d29900]' : 'text-[#94a3b8]'
                }`}
                style={{ fontVariationSettings: selectedTemplate === 'classic' ? "'FILL' 1" : "'FILL' 0" }}
              >
                {selectedTemplate === 'classic' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            {/* Visual Mini Diagram */}
            <div className="h-16 bg-[#f8fafc] rounded-lg p-2 flex items-center gap-2 border border-[#e2e8f0]">
              <div className="w-8 h-8 rounded-full bg-[#002956]/15 flex-shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px] text-[#002956]">person</span>
              </div>
              <div className="w-0.5 h-10 bg-[#d29900]"></div>
              <div className="flex flex-col gap-1 w-full">
                <div className="h-2 w-3/4 bg-[#002956]/60 rounded"></div>
                <div className="h-1.5 w-1/2 bg-[#d29900]/70 rounded"></div>
                <div className="h-1.5 w-2/3 bg-[#64748b]/40 rounded"></div>
              </div>
            </div>
            <p className="text-[11px] text-[#475569] mt-1.5 leading-tight">
              Vertical accent bar & side-by-side photo layout.
            </p>
          </div>

          {/* 2. Modern Minimal */}
          <div
            onClick={() => onSelectTemplate('minimal')}
            className={`cursor-pointer p-3 rounded-xl transition-all duration-200 border relative overflow-hidden group ${
              selectedTemplate === 'minimal'
                ? 'bg-[#ffffff] border-[#002956] shadow-md ring-2 ring-[#d29900]/50'
                : 'bg-[#ffffff]/90 border-[#cbd5e1] shadow-xs hover:border-[#d29900]/60 hover:shadow-sm'
            }`}
          >
            {selectedTemplate === 'minimal' && (
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#002956] via-[#d29900] to-[#002956]"></div>
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[13px] text-[#002956] truncate">Modern Minimal</span>
              <span
                className={`material-symbols-outlined text-[19px] ${
                  selectedTemplate === 'minimal' ? 'text-[#d29900]' : 'text-[#94a3b8]'
                }`}
                style={{ fontVariationSettings: selectedTemplate === 'minimal' ? "'FILL' 1" : "'FILL' 0" }}
              >
                {selectedTemplate === 'minimal' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            {/* Visual Mini Diagram */}
            <div className="h-16 bg-[#f8fafc] rounded-lg p-2 flex flex-col justify-center gap-1.5 border border-[#e2e8f0]">
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-1/2 bg-[#002956]/60 rounded"></div>
                <div className="w-4 h-4 rounded bg-[#d29900]/20 flex items-center justify-center text-[10px] text-[#ea580c] font-bold">
                  •
                </div>
              </div>
              <div className="h-1.5 w-full bg-[#cbd5e1] rounded"></div>
              <div className="flex gap-2">
                <div className="h-1.5 w-1/3 bg-[#d29900]/60 rounded"></div>
                <div className="h-1.5 w-1/3 bg-[#64748b]/40 rounded"></div>
              </div>
            </div>
            <p className="text-[11px] text-[#475569] mt-1.5 leading-tight">
              Clean horizontal hierarchy with compact footer.
            </p>
          </div>

          {/* 3. Corporate with Logo */}
          <div
            onClick={() => onSelectTemplate('corporate-logo')}
            className={`cursor-pointer p-3 rounded-xl transition-all duration-200 border relative overflow-hidden group ${
              selectedTemplate === 'corporate-logo'
                ? 'bg-[#ffffff] border-[#002956] shadow-md ring-2 ring-[#d29900]/50'
                : 'bg-[#ffffff]/90 border-[#cbd5e1] shadow-xs hover:border-[#d29900]/60 hover:shadow-sm'
            }`}
          >
            {selectedTemplate === 'corporate-logo' && (
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#002956] via-[#d29900] to-[#002956]"></div>
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[13px] text-[#002956] truncate">Brand & Logo</span>
              <span
                className={`material-symbols-outlined text-[19px] ${
                  selectedTemplate === 'corporate-logo' ? 'text-[#d29900]' : 'text-[#94a3b8]'
                }`}
                style={{ fontVariationSettings: selectedTemplate === 'corporate-logo' ? "'FILL' 1" : "'FILL' 0" }}
              >
                {selectedTemplate === 'corporate-logo' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            {/* Visual Mini Diagram */}
            <div className="h-16 bg-[#f8fafc] rounded-lg p-2 flex items-center justify-between gap-1 border border-[#e2e8f0]">
              <div className="flex flex-col gap-1 w-3/5">
                <div className="h-2 w-full bg-[#002956]/60 rounded"></div>
                <div className="h-1.5 w-4/5 bg-[#d29900]/70 rounded"></div>
                <div className="h-1.5 w-1/2 bg-[#64748b]/40 rounded"></div>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#e2e8f0] flex items-center justify-center flex-shrink-0 border border-[#cbd5e1]">
                <span className="material-symbols-outlined text-[16px] text-[#002956]">domain</span>
              </div>
            </div>
            <p className="text-[11px] text-[#475569] mt-1.5 leading-tight">
              Emphasis on dual personal photo + corporate emblem.
            </p>
          </div>

          {/* 4. Photo + Social */}
          <div
            onClick={() => onSelectTemplate('social')}
            className={`cursor-pointer p-3 rounded-xl transition-all duration-200 border relative overflow-hidden group ${
              selectedTemplate === 'social'
                ? 'bg-[#ffffff] border-[#002956] shadow-md ring-2 ring-[#d29900]/50'
                : 'bg-[#ffffff]/90 border-[#cbd5e1] shadow-xs hover:border-[#d29900]/60 hover:shadow-sm'
            }`}
          >
            {selectedTemplate === 'social' && (
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#002956] via-[#d29900] to-[#002956]"></div>
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[13px] text-[#002956] truncate">Photo + Social</span>
              <span
                className={`material-symbols-outlined text-[19px] ${
                  selectedTemplate === 'social' ? 'text-[#d29900]' : 'text-[#94a3b8]'
                }`}
                style={{ fontVariationSettings: selectedTemplate === 'social' ? "'FILL' 1" : "'FILL' 0" }}
              >
                {selectedTemplate === 'social' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            {/* Visual Mini Diagram */}
            <div className="h-16 bg-[#f8fafc] rounded-lg p-2 flex items-center gap-2 border border-[#e2e8f0]">
              <div className="w-8 h-8 rounded-full bg-[#002956] flex items-center justify-center text-white flex-shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[15px]">account_circle</span>
              </div>
              <div className="flex flex-col gap-1 flex-grow">
                <div className="h-2 w-3/4 bg-[#002956]/60 rounded"></div>
                <div className="h-1.5 w-1/2 bg-[#64748b]/50 rounded"></div>
                <div className="flex gap-1 mt-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d29900]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#002956]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d29900]"></span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-[#475569] mt-1.5 leading-tight">
              Prominent circular avatar with dedicated badge strip.
            </p>
          </div>

          {/* 5. Executive Suite */}
          <div
            onClick={() => onSelectTemplate('executive')}
            className={`cursor-pointer p-3 rounded-xl transition-all duration-200 border relative overflow-hidden group col-span-2 sm:col-span-1 ${
              selectedTemplate === 'executive'
                ? 'bg-[#ffffff] border-[#002956] shadow-md ring-2 ring-[#d29900]/50'
                : 'bg-[#ffffff]/90 border-[#cbd5e1] shadow-xs hover:border-[#d29900]/60 hover:shadow-sm'
            }`}
          >
            {selectedTemplate === 'executive' && (
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#002956] via-[#d29900] to-[#002956]"></div>
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[13px] text-[#002956] truncate">Executive Suite</span>
              <span
                className={`material-symbols-outlined text-[19px] ${
                  selectedTemplate === 'executive' ? 'text-[#d29900]' : 'text-[#94a3b8]'
                }`}
                style={{ fontVariationSettings: selectedTemplate === 'executive' ? "'FILL' 1" : "'FILL' 0" }}
              >
                {selectedTemplate === 'executive' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            {/* Visual Mini Diagram */}
            <div className="h-16 bg-[#f8fafc] rounded-lg p-2 flex flex-col justify-between border border-[#e2e8f0]">
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-1/2 bg-[#002956]/70 rounded"></div>
                <div className="h-1.5 w-1/4 bg-[#d29900] rounded"></div>
              </div>
              <div className="w-full h-0.5 bg-[#d29900]/40"></div>
              <div className="grid grid-cols-2 gap-1">
                <div className="h-1.5 bg-[#002956]/40 rounded"></div>
                <div className="h-1.5 bg-[#64748b]/40 rounded"></div>
              </div>
            </div>
            <p className="text-[11px] text-[#475569] mt-1.5 leading-tight">
              Refined serif typography, dual contact columns & notices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
