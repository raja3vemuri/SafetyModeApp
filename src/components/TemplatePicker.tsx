import React from 'react';
import { TemplateArchetype } from '../types';
import { TEMPLATES_CONFIG } from '../constants';

interface TemplatePickerProps {
  selectedTemplate: TemplateArchetype;
  onSelectTemplate: (template: TemplateArchetype) => void;
}

export const TemplatePicker: React.FC<TemplatePickerProps> = ({
  selectedTemplate,
  onSelectTemplate,
}) => {
  return (
    <section className="w-full bg-[#eff4ff] py-3.5 px-4 sm:px-6 lg:px-8 border-y border-[#d6e3ff]/80 shadow-inner">
      <div className="max-w-[1560px] mx-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] sm:text-[13px] uppercase tracking-wider font-bold text-[#006783] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">palette</span>
            Select Professional Archetype
          </span>
          <span className="text-[12px] text-[#43474f] hidden sm:inline">
            Inline email table layout automatically updates in preview
          </span>
        </div>

        {/* 5 Distinct Archetypes Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3" id="templatePicker">
          {/* 1. Classic Corporate */}
          <div
            onClick={() => onSelectTemplate('classic')}
            className={`cursor-pointer p-3 rounded-xl transition-all duration-200 border ${
              selectedTemplate === 'classic'
                ? 'bg-[#e5eeff] border-[#006783] shadow-md ring-2 ring-[#006783]/20'
                : 'bg-[#ffffff] border-[#d6e3ff] shadow-xs hover:border-[#006783]/40 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[13px] text-[#002956] truncate">Classic Corporate</span>
              <span
                className={`material-symbols-outlined text-[19px] ${
                  selectedTemplate === 'classic' ? 'text-[#006783]' : 'text-[#c3c6d1]'
                }`}
                style={{ fontVariationSettings: selectedTemplate === 'classic' ? "'FILL' 1" : "'FILL' 0" }}
              >
                {selectedTemplate === 'classic' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            {/* Visual Mini Diagram */}
            <div className="h-16 bg-[#f8f9ff] rounded-lg p-2 flex items-center gap-2 border border-[#e2e8f0]">
              <div className="w-8 h-8 rounded-full bg-[#002956]/20 flex-shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px] text-[#002956]">person</span>
              </div>
              <div className="w-0.5 h-10 bg-[#006783]"></div>
              <div className="flex flex-col gap-1 w-full">
                <div className="h-2 w-3/4 bg-[#002956]/40 rounded"></div>
                <div className="h-1.5 w-1/2 bg-[#006783]/50 rounded"></div>
                <div className="h-1.5 w-2/3 bg-[#737780]/30 rounded"></div>
              </div>
            </div>
            <p className="text-[11px] text-[#43474f] mt-1.5 leading-tight">
              Vertical accent bar & side-by-side photo layout.
            </p>
          </div>

          {/* 2. Modern Minimal */}
          <div
            onClick={() => onSelectTemplate('minimal')}
            className={`cursor-pointer p-3 rounded-xl transition-all duration-200 border ${
              selectedTemplate === 'minimal'
                ? 'bg-[#e5eeff] border-[#006783] shadow-md ring-2 ring-[#006783]/20'
                : 'bg-[#ffffff] border-[#d6e3ff] shadow-xs hover:border-[#006783]/40 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[13px] text-[#002956] truncate">Modern Minimal</span>
              <span
                className={`material-symbols-outlined text-[19px] ${
                  selectedTemplate === 'minimal' ? 'text-[#006783]' : 'text-[#c3c6d1]'
                }`}
                style={{ fontVariationSettings: selectedTemplate === 'minimal' ? "'FILL' 1" : "'FILL' 0" }}
              >
                {selectedTemplate === 'minimal' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            {/* Visual Mini Diagram */}
            <div className="h-16 bg-[#f8f9ff] rounded-lg p-2 flex flex-col justify-center gap-1.5 border border-[#e2e8f0]">
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-1/2 bg-[#002956]/50 rounded"></div>
                <div className="w-4 h-4 rounded bg-[#57d1fe] flex items-center justify-center text-[10px] text-[#002956] font-bold">
                  •
                </div>
              </div>
              <div className="h-1.5 w-full bg-[#d3e4fe] rounded"></div>
              <div className="flex gap-2">
                <div className="h-1.5 w-1/3 bg-[#737780]/40 rounded"></div>
                <div className="h-1.5 w-1/3 bg-[#737780]/30 rounded"></div>
              </div>
            </div>
            <p className="text-[11px] text-[#43474f] mt-1.5 leading-tight">
              Clean horizontal hierarchy with compact footer.
            </p>
          </div>

          {/* 3. Corporate with Logo */}
          <div
            onClick={() => onSelectTemplate('corporate-logo')}
            className={`cursor-pointer p-3 rounded-xl transition-all duration-200 border ${
              selectedTemplate === 'corporate-logo'
                ? 'bg-[#e5eeff] border-[#006783] shadow-md ring-2 ring-[#006783]/20'
                : 'bg-[#ffffff] border-[#d6e3ff] shadow-xs hover:border-[#006783]/40 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[13px] text-[#002956] truncate">Brand & Logo</span>
              <span
                className={`material-symbols-outlined text-[19px] ${
                  selectedTemplate === 'corporate-logo' ? 'text-[#006783]' : 'text-[#c3c6d1]'
                }`}
                style={{ fontVariationSettings: selectedTemplate === 'corporate-logo' ? "'FILL' 1" : "'FILL' 0" }}
              >
                {selectedTemplate === 'corporate-logo' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            {/* Visual Mini Diagram */}
            <div className="h-16 bg-[#f8f9ff] rounded-lg p-2 flex items-center justify-between gap-1 border border-[#e2e8f0]">
              <div className="flex flex-col gap-1 w-3/5">
                <div className="h-2 w-full bg-[#002956]/45 rounded"></div>
                <div className="h-1.5 w-4/5 bg-[#006783]/60 rounded"></div>
                <div className="h-1.5 w-1/2 bg-[#737780]/30 rounded"></div>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#d3e4fe] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[16px] text-[#002956]">domain</span>
              </div>
            </div>
            <p className="text-[11px] text-[#43474f] mt-1.5 leading-tight">
              Emphasis on dual personal photo + corporate emblem.
            </p>
          </div>

          {/* 4. Photo + Social */}
          <div
            onClick={() => onSelectTemplate('social')}
            className={`cursor-pointer p-3 rounded-xl transition-all duration-200 border ${
              selectedTemplate === 'social'
                ? 'bg-[#e5eeff] border-[#006783] shadow-md ring-2 ring-[#006783]/20'
                : 'bg-[#ffffff] border-[#d6e3ff] shadow-xs hover:border-[#006783]/40 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[13px] text-[#002956] truncate">Photo + Social</span>
              <span
                className={`material-symbols-outlined text-[19px] ${
                  selectedTemplate === 'social' ? 'text-[#006783]' : 'text-[#c3c6d1]'
                }`}
                style={{ fontVariationSettings: selectedTemplate === 'social' ? "'FILL' 1" : "'FILL' 0" }}
              >
                {selectedTemplate === 'social' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            {/* Visual Mini Diagram */}
            <div className="h-16 bg-[#f8f9ff] rounded-lg p-2 flex items-center gap-2 border border-[#e2e8f0]">
              <div className="w-8 h-8 rounded-full bg-[#57d1fe] flex items-center justify-center text-[#005870] flex-shrink-0">
                <span className="material-symbols-outlined text-[15px]">account_circle</span>
              </div>
              <div className="flex flex-col gap-1 flex-grow">
                <div className="h-2 w-3/4 bg-[#002956]/50 rounded"></div>
                <div className="h-1.5 w-1/2 bg-[#006783]/50 rounded"></div>
                <div className="flex gap-1 mt-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006783]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006783]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006783]"></span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-[#43474f] mt-1.5 leading-tight">
              Prominent circular avatar with dedicated badge strip.
            </p>
          </div>

          {/* 5. Executive Suite */}
          <div
            onClick={() => onSelectTemplate('executive')}
            className={`cursor-pointer p-3 rounded-xl transition-all duration-200 border col-span-2 sm:col-span-1 ${
              selectedTemplate === 'executive'
                ? 'bg-[#e5eeff] border-[#006783] shadow-md ring-2 ring-[#006783]/20'
                : 'bg-[#ffffff] border-[#d6e3ff] shadow-xs hover:border-[#006783]/40 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[13px] text-[#002956] truncate">Executive Suite</span>
              <span
                className={`material-symbols-outlined text-[19px] ${
                  selectedTemplate === 'executive' ? 'text-[#006783]' : 'text-[#c3c6d1]'
                }`}
                style={{ fontVariationSettings: selectedTemplate === 'executive' ? "'FILL' 1" : "'FILL' 0" }}
              >
                {selectedTemplate === 'executive' ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>
            {/* Visual Mini Diagram */}
            <div className="h-16 bg-[#f8f9ff] rounded-lg p-2 flex flex-col justify-between border border-[#e2e8f0]">
              <div className="flex items-center justify-between">
                <div className="h-2.5 w-1/2 bg-[#002956]/60 rounded"></div>
                <div className="h-1.5 w-1/4 bg-[#006783] rounded"></div>
              </div>
              <div className="w-full h-0.5 bg-[#c3c6d1]/60"></div>
              <div className="grid grid-cols-2 gap-1">
                <div className="h-1.5 bg-[#737780]/40 rounded"></div>
                <div className="h-1.5 bg-[#737780]/40 rounded"></div>
              </div>
            </div>
            <p className="text-[11px] text-[#43474f] mt-1.5 leading-tight">
              Refined serif typography, dual contact columns & notices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
