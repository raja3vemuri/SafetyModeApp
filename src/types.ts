export type TemplateArchetype = 'classic' | 'minimal' | 'corporate-logo' | 'social' | 'executive';

export type CanvasMode = 'desktop' | 'mobile';

export type SpacingPreset = 'compact' | 'normal' | 'comfortable';

export type NavTab = 'signature-editor' | 'templates-library' | 'live-preview-and-export' | 'help-and-documentation';

export interface PersonalData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  email: string;
  phone: string;
  mobile: string;
  pronouns: string;
  avatarUrl: string;
}

export interface CompanyData {
  name: string;
  website: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  tagline: string;
  logoUrl: string;
}

export interface StyleData {
  colorH1: string;
  colorH2: string;
  colorBody: string;
  colorLink: string;
  colorAccent: string;
  colorBg: string;
  fontFamily: string;
  nameFontSize: number;
  baseFontSize: number;
  toggles: {
    avatar: boolean;
    logo: boolean;
    department: boolean;
    phone: boolean;
    mobile: boolean;
    address: boolean;
    tagline: boolean;
    social: boolean;
    disclaimer: boolean;
    calendar: boolean;
    divider: boolean;
    pronouns: boolean;
  };
  calendarUrl: string;
  calendarLabel: string;
  disclaimer: string;
}

export interface SocialChannel {
  id: string;
  name: string;
  active: boolean;
  url: string;
  label: string;
  brandColor?: string;
}

export interface SignatureState {
  template: TemplateArchetype;
  canvasMode: CanvasMode;
  isDarkCanvas: boolean;
  spacingPreset: SpacingPreset;
  socialIconSize: number;
  activeStep: number;
  personal: PersonalData;
  company: CompanyData;
  style: StyleData;
  socials: SocialChannel[];
}
