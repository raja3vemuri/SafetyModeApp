import React, { useState, ChangeEvent } from 'react';
import { SignatureState, SpacingPreset } from '../types';
import { PRESET_AVATARS, PRESET_LOGOS } from '../constants';
import { ImageCropper } from './ImageCropper';

interface AccordionEditorProps {
  state: SignatureState;
  onChange: (updater: (prev: SignatureState) => SignatureState) => void;
  onRestoreStyle: () => void;
  onClearSavedData: () => void;
  onReloadDefaults: () => void;
  rememberWorkstation: boolean;
  onToggleRemember: (enabled: boolean) => void;
  showToast: (msg: string) => void;
  onOpenCloudSignatures?: () => void;
}

export const AccordionEditor: React.FC<AccordionEditorProps> = ({
  state,
  onChange,
  onRestoreStyle,
  onClearSavedData,
  onReloadDefaults,
  rememberWorkstation,
  onToggleRemember,
  showToast,
  onOpenCloudSignatures,
}) => {
  const [openSections, setOpenSections] = useState({
    personal: true,
    company: true,
    style: true,
    socials: true,
  });
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updatePersonal = (field: keyof SignatureState['personal'], val: string) => {
    onChange(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: val },
    }));
  };

  const updateCompany = (field: keyof SignatureState['company'], val: string) => {
    onChange(prev => ({
      ...prev,
      company: { ...prev.company, [field]: val },
    }));
  };

  const updateStyle = <K extends keyof SignatureState['style']>(
    field: K,
    val: SignatureState['style'][K]
  ) => {
    onChange(prev => ({
      ...prev,
      style: { ...prev.style, [field]: val },
    }));
  };

  const updateToggle = (toggleKey: keyof SignatureState['style']['toggles'], checked: boolean) => {
    onChange(prev => ({
      ...prev,
      style: {
        ...prev.style,
        toggles: { ...prev.style.toggles, [toggleKey]: checked },
      },
    }));
  };

  const updateSocialItem = (id: string, active: boolean, url: string) => {
    onChange(prev => ({
      ...prev,
      socials: prev.socials.map(soc => (soc.id === id ? { ...soc, active, url } : soc)),
    }));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, target: 'avatar' | 'logo') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const base64 = evt.target?.result as string;
      if (target === 'avatar') {
        setImageToCrop(base64);
      } else {
        updateCompany('logoUrl', base64);
        showToast('Logo image loaded successfully');
      }
    };
    reader.readAsDataURL(file);
  };


  const applyPalettePreset = (h1: string, accent: string, link: string, name: string) => {
    onChange(prev => ({
      ...prev,
      style: {
        ...prev.style,
        colorH1: h1,
        colorAccent: accent,
        colorLink: link,
      },
    }));
    showToast(`✓ Applied ${name} brand palette`);
  };

  return (
    <div className="flex flex-col gap-4">
      {imageToCrop && (
        <ImageCropper
          image={imageToCrop}
          onCropComplete={(croppedImage) => {
            updatePersonal('avatarUrl', croppedImage);
            setImageToCrop(null);
            showToast('Portrait adjusted successfully');
          }}
          onCancel={() => setImageToCrop(null)}
        />
      )}
      {/* Step Header & Auto-Save Badge */}
      <div className="flex items-center justify-between bg-[#ffffff] px-5 py-4 rounded-2xl shadow-sm border border-[#cbd5e1]">
        <div>
          <span className="text-[11px] font-bold text-[#d29900] uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d29900]"></span>
            Step 3 of 4
          </span>
          <h2 className="text-[20px] sm:text-[22px] text-[#002956] font-extrabold tracking-tight">
            Enter signature details
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#002956] bg-orange-50 border border-orange-200/80 px-3 py-1 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#d29900] animate-pulse"></span>
            Auto-Saved
          </span>
        </div>
      </div>

      {/* ACCORDION 1: Personal Data */}
      <div className="bg-[#ffffff] rounded-2xl shadow-sm border border-[#cbd5e1] overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('personal')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-[#f8fafc] transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#002956] flex items-center justify-center text-[#d29900] shadow-sm">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <div>
              <span className="text-[15px] text-[#002956] block font-bold">A. Personal Data</span>
              <span className="text-[12px] text-[#64748b]">
                Name, title, direct communication & portrait
              </span>
            </div>
          </div>
          <span
            className={`material-symbols-outlined text-[#64748b] transition-transform duration-200 ${
              openSections.personal ? '' : 'rotate-180'
            }`}
          >
            expand_more
          </span>
        </button>

        {openSections.personal && (
          <div className="px-5 pb-5 pt-2 flex flex-col gap-4 border-t border-[#f1f5f9]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">First Name *</label>
                <input
                  type="text"
                  value={state.personal.firstName}
                  onChange={e => updatePersonal('firstName', e.target.value)}
                  placeholder="John"
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">Last Name *</label>
                <input
                  type="text"
                  value={state.personal.lastName}
                  onChange={e => updatePersonal('lastName', e.target.value)}
                  placeholder="Doe"
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">Job Title</label>
                <input
                  type="text"
                  value={state.personal.jobTitle}
                  onChange={e => updatePersonal('jobTitle', e.target.value)}
                  placeholder="Director"
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">Department</label>
                <input
                  type="text"
                  value={state.personal.department}
                  onChange={e => updatePersonal('department', e.target.value)}
                  placeholder="Enterprise Strategy"
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">Email Address *</label>
                <input
                  type="email"
                  value={state.personal.email}
                  onChange={e => updatePersonal('email', e.target.value)}
                  placeholder="john.doe@my-company.com"
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">Office Phone</label>
                <input
                  type="tel"
                  value={state.personal.phone}
                  onChange={e => updatePersonal('phone', e.target.value)}
                  placeholder="(800) 555-0199"
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">Mobile Number</label>
                <input
                  type="tel"
                  value={state.personal.mobile}
                  onChange={e => updatePersonal('mobile', e.target.value)}
                  placeholder="(800) 555-0299"
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">
                  Pronouns / Name Pronunciation
                </label>
                <input
                  type="text"
                  value={state.personal.pronouns}
                  onChange={e => updatePersonal('pronouns', e.target.value)}
                  placeholder="He / Him"
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                />
              </div>
            </div>

            {/* Profile Photo Uploader Section */}
            <div className="bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] p-4 rounded-xl border border-[#cbd5e1] flex flex-col gap-3 mt-1">
              <span className="text-[12px] font-bold text-[#002956] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#d29900] text-[18px]">photo_camera</span>
                Profile Photo or Executive Portrait
              </span>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#e2e8f0] flex-shrink-0 shadow-sm border-2 border-[#d29900] flex items-center justify-center">
                  <img
                    src={state.personal.avatarUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80';
                    }}
                  />
                </div>
                <div className="flex-grow w-full flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="cursor-pointer bg-[#002956] hover:bg-[#071933] text-white px-3.5 py-1.5 rounded-lg text-[12px] font-semibold inline-flex items-center gap-1.5 shadow-sm transition-all border border-[#0f3460]">
                      <span className="material-symbols-outlined text-[#d29900] text-[16px]">upload_file</span>
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => handleFileUpload(e, 'avatar')}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        updatePersonal('avatarUrl', PRESET_AVATARS.executive);
                        showToast('Applied Preset Avatar A');
                      }}
                      className="bg-white hover:bg-orange-50 text-[#002956] hover:text-[#ea580c] px-3 py-1.5 rounded-lg text-[11px] font-bold border border-[#cbd5e1] hover:border-orange-300 shadow-xs transition-all"
                    >
                      Preset Avatar A
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updatePersonal('avatarUrl', PRESET_AVATARS.creative);
                        showToast('Applied Preset Avatar B');
                      }}
                      className="bg-white hover:bg-orange-50 text-[#002956] hover:text-[#ea580c] px-3 py-1.5 rounded-lg text-[11px] font-bold border border-[#cbd5e1] hover:border-orange-300 shadow-xs transition-all"
                    >
                      Preset Avatar B
                    </button>
                  </div>
                  <input
                    type="text"
                    value={state.personal.avatarUrl}
                    onChange={e => updatePersonal('avatarUrl', e.target.value)}
                    placeholder="Paste portrait image URL"
                    className="h-9 px-3 rounded-lg bg-white border border-[#cbd5e1] text-[12px] text-[#0f172a] outline-none shadow-xs focus:border-[#d29900]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 2: Company Data */}
      <div className="bg-[#ffffff] rounded-2xl shadow-sm border border-[#cbd5e1] overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('company')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-[#f8fafc] transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#002956] flex items-center justify-center text-[#d29900] shadow-sm">
              <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
            </div>
            <div>
              <span className="text-[15px] text-[#002956] block font-bold">B. Company Data</span>
              <span className="text-[12px] text-[#64748b]">
                Entity branding, web domain, HQ address & logo
              </span>
            </div>
          </div>
          <span
            className={`material-symbols-outlined text-[#64748b] transition-transform duration-200 ${
              openSections.company ? '' : 'rotate-180'
            }`}
          >
            expand_more
          </span>
        </button>

        {openSections.company && (
          <div className="px-5 pb-5 pt-2 flex flex-col gap-4 border-t border-[#f1f5f9]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">Company Name *</label>
                <input
                  type="text"
                  value={state.company.name}
                  onChange={e => updateCompany('name', e.target.value)}
                  placeholder="SignatureCraft Enterprise"
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">Website URL *</label>
                <input
                  type="text"
                  value={state.company.website}
                  onChange={e => updateCompany('website', e.target.value)}
                  placeholder="www.signaturecraft.io"
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">Address Line 1</label>
                <input
                  type="text"
                  value={state.company.address1}
                  onChange={e => updateCompany('address1', e.target.value)}
                  placeholder="350 Fifth Avenue"
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">Address Line 2 (Suite/Floor)</label>
                <input
                  type="text"
                  value={state.company.address2}
                  onChange={e => updateCompany('address2', e.target.value)}
                  placeholder="Suite 4800"
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">City</label>
                <input
                  type="text"
                  value={state.company.city}
                  onChange={e => updateCompany('city', e.target.value)}
                  placeholder="New York"
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#002956]">State</label>
                  <input
                    type="text"
                    value={state.company.state}
                    onChange={e => updateCompany('state', e.target.value)}
                    placeholder="NY"
                    className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#002956]">ZIP Code</label>
                  <input
                    type="text"
                    value={state.company.zip}
                    onChange={e => updateCompany('zip', e.target.value)}
                    placeholder="10118"
                    className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">Company Motto / Tagline</label>
                <input
                  type="text"
                  value={state.company.tagline}
                  onChange={e => updateCompany('tagline', e.target.value)}
                  placeholder="Precision Mail Formatting Engine & Global Brand Governance"
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] focus:ring-2 focus:ring-[#d29900]/20 transition-all"
                />
              </div>
            </div>

            {/* Logo Uploader Section */}
            <div className="bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] p-4 rounded-xl border border-[#cbd5e1] flex flex-col gap-3 mt-1">
              <span className="text-[12px] font-bold text-[#002956] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#d29900] text-[18px]">verified_user</span>
                Company Logo or Vector Symbol
              </span>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-20 h-14 rounded-xl bg-white border border-[#cbd5e1] p-1.5 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <img
                    src={state.company.logoUrl}
                    alt="Logo Preview"
                    className="max-h-full max-w-full object-contain"
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                </div>
                <div className="flex-grow w-full flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="cursor-pointer bg-[#002956] hover:bg-[#071933] text-white px-3.5 py-1.5 rounded-lg text-[12px] font-semibold inline-flex items-center gap-1.5 shadow-sm transition-all border border-[#0f3460]">
                      <span className="material-symbols-outlined text-[#d29900] text-[16px]">cloud_upload</span>
                      Upload Logo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => handleFileUpload(e, 'logo')}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        updateCompany('logoUrl', PRESET_LOGOS.tech);
                        showToast('Applied Default Tech Logo');
                      }}
                      className="bg-white hover:bg-orange-50 text-[#002956] hover:text-[#ea580c] px-3 py-1.5 rounded-lg text-[11px] font-bold border border-[#cbd5e1] hover:border-orange-300 shadow-xs transition-all"
                    >
                      Default Tech Logo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateCompany('logoUrl', PRESET_LOGOS.crest);
                        showToast('Applied Executive Crest');
                      }}
                      className="bg-white hover:bg-orange-50 text-[#002956] hover:text-[#ea580c] px-3 py-1.5 rounded-lg text-[11px] font-bold border border-[#cbd5e1] hover:border-orange-300 shadow-xs transition-all"
                    >
                      Executive Crest
                    </button>
                  </div>
                  <input
                    type="text"
                    value={state.company.logoUrl}
                    onChange={e => updateCompany('logoUrl', e.target.value)}
                    placeholder="Paste transparent PNG logo URL"
                    className="h-9 px-3 rounded-lg bg-white border border-[#cbd5e1] text-[12px] text-[#0f172a] outline-none shadow-xs focus:border-[#d29900]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 3: Style & Signature Blocks */}
      <div className="bg-[#ffffff] rounded-2xl shadow-sm border border-[#cbd5e1] overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('style')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-[#f8fafc] transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#002956] flex items-center justify-center text-[#d29900] shadow-sm">
              <span className="material-symbols-outlined text-[20px]">style</span>
            </div>
            <div>
              <span className="text-[15px] text-[#002956] block font-bold">
                C. Style & Signature Blocks
              </span>
              <span className="text-[12px] text-[#64748b]">
                Hex colors, creative palettes, typography scale & spacing
              </span>
            </div>
          </div>
          <span
            className={`material-symbols-outlined text-[#64748b] transition-transform duration-200 ${
              openSections.style ? '' : 'rotate-180'
            }`}
          >
            expand_more
          </span>
        </button>

        {openSections.style && (
          <div className="px-5 pb-5 pt-2 flex flex-col gap-4 border-t border-[#f1f5f9]">
            {/* Quick 1-Click Creative Palettes */}
            <div>
              <span className="text-[12px] font-bold text-[#002956] block mb-2">
                1-Click Brand Themes (Dark Blue & Orange Highlights)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => applyPalettePreset('#002956', '#d29900', '#ea580c', 'Navy & Electric Orange')}
                  className="p-2.5 rounded-xl border border-[#cbd5e1] hover:border-[#d29900] bg-gradient-to-r from-blue-50 to-orange-50 text-left transition-all group cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#002956]"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#d29900]"></span>
                  </div>
                  <span className="text-[11px] font-bold text-[#002956] block group-hover:text-[#ea580c]">
                    Navy & Orange
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => applyPalettePreset('#0b192c', '#fb923c', '#ea580c', 'Midnight & Tangerine')}
                  className="p-2.5 rounded-xl border border-[#cbd5e1] hover:border-[#d29900] bg-gradient-to-r from-slate-50 to-amber-50 text-left transition-all group cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0b192c]"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#fb923c]"></span>
                  </div>
                  <span className="text-[11px] font-bold text-[#002956] block group-hover:text-[#ea580c]">
                    Midnight Amber
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => applyPalettePreset('#002956', '#57d1fe', '#006783', 'Corporate Cyan')}
                  className="p-2.5 rounded-xl border border-[#cbd5e1] hover:border-[#006783] bg-gradient-to-r from-blue-50 to-cyan-50 text-left transition-all group cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#002956]"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#57d1fe]"></span>
                  </div>
                  <span className="text-[11px] font-bold text-[#002956] block group-hover:text-[#006783]">
                    Corporate Cyan
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => applyPalettePreset('#0f172a', '#10b981', '#059669', 'Slate & Emerald')}
                  className="p-2.5 rounded-xl border border-[#cbd5e1] hover:border-[#059669] bg-gradient-to-r from-slate-50 to-emerald-50 text-left transition-all group cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0f172a]"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#10b981]"></span>
                  </div>
                  <span className="text-[11px] font-bold text-[#002956] block group-hover:text-[#059669]">
                    Slate Emerald
                  </span>
                </button>
              </div>
            </div>

            {/* Custom Color Pickers */}
            <div>
              <span className="text-[12px] font-bold text-[#002956] block mb-2">
                Custom Palette & Brand Color Overrides
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { label: 'Primary (H1)', key: 'colorH1' as const },
                  { label: 'Secondary (H2)', key: 'colorH2' as const },
                  { label: 'Body Text', key: 'colorBody' as const },
                  { label: 'Links', key: 'colorLink' as const },
                  { label: 'Accent Line', key: 'colorAccent' as const },
                  { label: 'Card Fill', key: 'colorBg' as const },
                ].map(({ label, key }) => (
                  <div
                    key={key}
                    className="bg-[#f8fafc] p-2.5 rounded-xl border border-[#cbd5e1] flex items-center justify-between"
                  >
                    <span className="text-[11px] font-bold text-[#002956]">{label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-[#64748b]">
                        {state.style[key]}
                      </span>
                      <input
                        type="color"
                        value={state.style[key]}
                        onChange={e => updateStyle(key, e.target.value)}
                        className="w-7 h-7 rounded cursor-pointer border-0 p-0 bg-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">Font Family</label>
                <select
                  value={state.style.fontFamily}
                  onChange={e => updateStyle('fontFamily', e.target.value)}
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[12px] text-[#0f172a] outline-none focus:border-[#d29900]"
                >
                  <option value="Arial, sans-serif">Arial (Universal)</option>
                  <option value="'Helvetica Neue', Helvetica, sans-serif">Helvetica</option>
                  <option value="Verdana, Geneva, sans-serif">Verdana (Readable)</option>
                  <option value="Georgia, serif">Georgia (Executive)</option>
                  <option value="'Times New Roman', Times, serif">Times New Roman</option>
                  <option value="Tahoma, sans-serif">Tahoma</option>
                  <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                  <option value="'Segoe UI', sans-serif">Segoe UI (Modern)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label className="text-[12px] font-bold text-[#002956]">Name Size</label>
                  <span className="text-[12px] text-[#d29900] font-bold">
                    {state.style.nameFontSize}px
                  </span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="24"
                  value={state.style.nameFontSize}
                  onChange={e => updateStyle('nameFontSize', parseInt(e.target.value, 10))}
                  className="accent-[#d29900] h-2 mt-2 bg-[#e2e8f0] rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label className="text-[12px] font-bold text-[#002956]">Base Text Size</label>
                  <span className="text-[12px] text-[#d29900] font-bold">
                    {state.style.baseFontSize}px
                  </span>
                </div>
                <input
                  type="range"
                  min="11"
                  max="16"
                  value={state.style.baseFontSize}
                  onChange={e => updateStyle('baseFontSize', parseInt(e.target.value, 10))}
                  className="accent-[#d29900] h-2 mt-2 bg-[#e2e8f0] rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Spacing & Social Icon Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">
                  Table Spacing Rhythm
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['compact', 'normal', 'comfortable'] as SpacingPreset[]).map(p => {
                    const label = p === 'compact' ? 'Compact' : p === 'normal' ? 'Normal' : 'Roomy';
                    const active = state.spacingPreset === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => onChange(prev => ({ ...prev, spacingPreset: p }))}
                        className={`px-2 py-1.5 rounded-xl text-[12px] font-bold transition-all border cursor-pointer ${
                          active
                            ? 'bg-[#002956] text-white border-[#002956] shadow-sm ring-1 ring-[#d29900]'
                            : 'bg-[#f8fafc] text-[#0f172a] border-[#cbd5e1] hover:bg-[#edf2f9]'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">
                  Social Icon Size
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[16, 18, 20, 24].map(sz => {
                    const active = state.socialIconSize === sz;
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => onChange(prev => ({ ...prev, socialIconSize: sz }))}
                        className={`px-1.5 py-1.5 rounded-xl text-[12px] font-bold transition-all border cursor-pointer ${
                          active
                            ? 'bg-[#002956] text-white border-[#002956] shadow-sm ring-1 ring-[#d29900]'
                            : 'bg-[#f8fafc] text-[#0f172a] border-[#cbd5e1] hover:bg-[#edf2f9]'
                        }`}
                      >
                        {sz}px
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Toggleable Signature Blocks */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-[#002956]">
                  Active Signature Blocks (Show / Hide)
                </span>
                <button
                  type="button"
                  onClick={onRestoreStyle}
                  className="text-[#d29900] text-[11px] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                  Restore Default Style
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-[#f8fafc] p-3.5 rounded-xl border border-[#cbd5e1]">
                {[
                  { key: 'avatar' as const, label: 'Profile Photo' },
                  { key: 'logo' as const, label: 'Company Logo' },
                  { key: 'department' as const, label: 'Department' },
                  { key: 'phone' as const, label: 'Office Phone' },
                  { key: 'mobile' as const, label: 'Mobile Number' },
                  { key: 'address' as const, label: 'HQ Postal Address' },
                  { key: 'tagline' as const, label: 'Company Motto' },
                  { key: 'social' as const, label: 'Social Icons Bar' },
                  { key: 'disclaimer' as const, label: 'Legal Disclaimer' },
                  { key: 'calendar' as const, label: 'Book Meeting Badge' },
                  { key: 'divider' as const, label: 'Stylized Divider' },
                  { key: 'pronouns' as const, label: 'Pronouns' },
                ].map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 cursor-pointer text-[12px] font-medium text-[#0f172a] hover:text-[#d29900]"
                  >
                    <input
                      type="checkbox"
                      checked={state.style.toggles[key]}
                      onChange={e => updateToggle(key, e.target.checked)}
                      className="rounded accent-[#d29900] w-4 h-4 cursor-pointer"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Meeting Link & Disclaimer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">
                  Calendar Booking URL
                </label>
                <input
                  type="text"
                  value={state.style.calendarUrl}
                  onChange={e => updateStyle('calendarUrl', e.target.value)}
                  placeholder="https://calendly.com/..."
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">
                  Calendar Link Call-To-Action
                </label>
                <input
                  type="text"
                  value={state.style.calendarLabel}
                  onChange={e => updateStyle('calendarLabel', e.target.value)}
                  placeholder="📅 Schedule a 15-min discovery call"
                  className="h-10 px-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[13px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] transition-all"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#002956]">
                  Confidentiality & Legal Disclaimer Notice
                </label>
                <textarea
                  rows={2}
                  value={state.style.disclaimer}
                  onChange={e => updateStyle('disclaimer', e.target.value)}
                  className="p-3 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] text-[12px] text-[#0f172a] outline-none focus:bg-[#ffffff] focus:border-[#d29900] transition-all resize-y"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 4: Social Media Channels (16 Platforms) */}
      <div className="bg-[#ffffff] rounded-2xl shadow-sm border border-[#cbd5e1] overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('socials')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-[#f8fafc] transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#002956] flex items-center justify-center text-[#d29900] shadow-sm">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </div>
            <div>
              <span className="text-[15px] text-[#002956] block font-bold">
                D. Social Media Channels (16 Platforms)
              </span>
              <span className="text-[12px] text-[#64748b]">
                Toggle authentic channel badges and input profile URLs
              </span>
            </div>
          </div>
          <span
            className={`material-symbols-outlined text-[#64748b] transition-transform duration-200 ${
              openSections.socials ? '' : 'rotate-180'
            }`}
          >
            expand_more
          </span>
        </button>

        {openSections.socials && (
          <div className="px-5 pb-5 pt-2 flex flex-col gap-2.5 border-t border-[#f1f5f9]">
            <p className="text-[12px] text-[#64748b]">
              Only checked platforms with active URLs will render into the signature table.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
              {state.socials.map(soc => (
                <div
                  key={soc.id}
                  className="bg-[#f8fafc] p-2.5 rounded-xl border border-[#cbd5e1] flex items-center gap-2 hover:border-[#d29900]/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={soc.active}
                    onChange={e => updateSocialItem(soc.id, e.target.checked, soc.url)}
                    className="rounded accent-[#d29900] w-4 h-4 flex-shrink-0 cursor-pointer"
                  />
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[#ffffff] font-bold text-[11px] flex-shrink-0 shadow-xs"
                    style={{ backgroundColor: soc.brandColor || '#002956' }}
                  >
                    {soc.label}
                  </span>
                  <span className="text-[11px] font-bold w-16 text-[#002956] truncate flex-shrink-0">
                    {soc.name}
                  </span>
                  <input
                    type="text"
                    value={soc.url}
                    onChange={e => updateSocialItem(soc.id, soc.active, e.target.value)}
                    placeholder="Profile URL"
                    className="flex-grow h-8 px-2.5 rounded-lg bg-[#ffffff] border border-[#cbd5e1] text-[11px] text-[#0f172a] outline-none shadow-xs focus:border-[#d29900]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Persistence & Reset Bar */}
      <div className="bg-[#ffffff] p-4 rounded-2xl shadow-sm border border-[#cbd5e1] flex flex-col sm:flex-row items-center justify-between gap-3">
        <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-[#002956] font-semibold">
          <input
            type="checkbox"
            checked={rememberWorkstation}
            onChange={e => onToggleRemember(e.target.checked)}
            className="rounded accent-[#d29900] w-4 h-4 cursor-pointer"
          />
          <span>Remember my details on this workstation</span>
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {onOpenCloudSignatures && (
            <button
              type="button"
              onClick={onOpenCloudSignatures}
              className="px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#ea580c] hover:text-[#c2410c] text-[12px] font-bold transition-all flex items-center gap-1.5 border border-orange-200 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[17px] text-[#d29900]">cloud_sync</span>
              Cloud Signatures
            </button>
          )}
          <button
            type="button"
            onClick={onClearSavedData}
            className="px-3.5 py-2 rounded-xl bg-[#f8fafc] text-[#002956] hover:bg-[#edf2f9] text-[12px] font-bold transition-colors flex items-center gap-1.5 border border-[#cbd5e1] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#64748b]">clear_all</span>
            Clear Saved Data
          </button>
          <button
            type="button"
            onClick={onReloadDefaults}
            className="px-3.5 py-2 rounded-xl bg-[#002956] text-white hover:bg-[#071933] text-[12px] font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#d29900]">auto_fix_high</span>
            Reload Defaults
          </button>
        </div>
      </div>
    </div>
  );
};
