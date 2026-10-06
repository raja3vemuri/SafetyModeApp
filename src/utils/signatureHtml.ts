import { SignatureState } from '../types';

export function buildSignatureMarkup(state: SignatureState): string {
  const p = state.personal;
  const c = state.company;
  const s = state.style;
  const t = s.toggles;

  const padMap = {
    compact: { cellPad: '1px', rowGap: '4px', blockGap: '8px' },
    normal: { cellPad: '3px', rowGap: '6px', blockGap: '12px' },
    comfortable: { cellPad: '5px', rowGap: '8px', blockGap: '16px' },
  };
  const spacing = padMap[state.spacingPreset] || padMap.normal;

  const font = s.fontFamily;
  const nameSize = `${s.nameFontSize}px`;
  const baseSize = `${s.baseFontSize}px`;
  const smallSize = `${Math.max(10, s.baseFontSize - 2)}px`;
  const h1Color = s.colorH1;
  const h2Color = s.colorH2;
  const bodyColor = state.isDarkCanvas ? '#e2e8f0' : s.colorBody;
  const linkColor = s.colorLink;
  const accentColor = s.colorAccent;
  const bgColor = state.isDarkCanvas ? '#1a202c' : (s.colorBg === '#ffffff' ? 'transparent' : s.colorBg);

  // Social Links Builder
  let socialIconsHtml = '';
  if (t.social) {
    const activeSocials = state.socials.filter(item => item.active && item.url.trim().length > 0);
    if (activeSocials.length > 0) {
      socialIconsHtml = `
        <table cellpadding="0" cellspacing="0" border="0" style="margin-top:${spacing.rowGap};">
          <tr>
            ${activeSocials
              .map(
                soc => `
              <td style="padding-right:6px;">
                <a href="${soc.url}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; display:inline-block;">
                  <span style="display:inline-block; width:${state.socialIconSize}px; height:${state.socialIconSize}px; line-height:${state.socialIconSize}px; text-align:center; background-color:${accentColor}; color:#002956; border-radius:4px; font-family:${font}; font-size:${Math.round(
                    state.socialIconSize * 0.55
                  )}px; font-weight:bold;">
                    ${soc.label}
                  </span>
                </a>
              </td>
            `
              )
              .join('')}
          </tr>
        </table>
      `;
    }
  }

  // Address String
  const addressParts: string[] = [];
  if (t.address) {
    if (c.address1) addressParts.push(c.address1);
    if (c.address2) addressParts.push(c.address2);
    const cityState = [c.city, c.state, c.zip].filter(Boolean).join(', ');
    if (cityState) addressParts.push(cityState);
  }
  const formattedAddress = addressParts.join(' • ');

  // Calendar CTA Button
  let calendarHtml = '';
  if (t.calendar && s.calendarUrl) {
    calendarHtml = `
      <div style="margin-top:${spacing.rowGap};">
        <a href="${s.calendarUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block; font-family:${font}; font-size:${smallSize}; font-weight:600; color:${h1Color}; background-color:${accentColor}; padding:6px 12px; border-radius:4px; text-decoration:none;">
          ${s.calendarLabel}
        </a>
      </div>
    `;
  }

  // Disclaimer block
  let disclaimerHtml = '';
  if (t.disclaimer && s.disclaimer) {
    disclaimerHtml = `
      <table cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:560px; margin-top:${spacing.blockGap}; border-top:1px dashed #cbd5e1; padding-top:6px;">
        <tr>
          <td style="font-family:${font}; font-size:${smallSize}; color:#64748b; line-height:1.4; text-align:left;">
            ${s.disclaimer}
          </td>
        </tr>
      </table>
    `;
  }

  const dividerBorder = t.divider ? `border-left: 2px solid ${accentColor};` : '';

  // ARCHETYPE 2: Modern Minimal
  if (state.template === 'minimal') {
    return `
      <table id="signatureTableRoot" cellpadding="0" cellspacing="0" border="0" style="background-color:${bgColor}; font-family:${font}; color:${bodyColor}; font-size:${baseSize}; line-height:1.4; max-width:560px; text-align:left;">
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-bottom:4px;">
                  <span style="font-size:${nameSize}; font-weight:bold; color:${h1Color};">${p.firstName} ${p.lastName}</span>
                  ${t.pronouns && p.pronouns ? `<span style="font-size:${smallSize}; color:#64748b; margin-left:6px;">(${p.pronouns})</span>` : ''}
                  <span style="color:${accentColor}; font-weight:bold; margin:0 6px;">/</span>
                  <span style="font-size:${baseSize}; color:${h2Color}; font-weight:600;">${p.jobTitle}</span>
                  ${t.department && p.department ? `<span style="font-size:${smallSize}; color:#64748b;"> — ${p.department}</span>` : ''}
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:${spacing.rowGap};">
                  <span style="font-weight:600; color:${h1Color};">${c.name}</span>
                  <span style="color:#94a3b8; margin:0 6px;">•</span>
                  <a href="https://${c.website.replace(/^https?:\/\//, '')}" target="_blank" rel="noopener noreferrer" style="color:${linkColor}; text-decoration:none;">${c.website}</a>
                </td>
              </tr>
              ${t.divider ? `<tr><td style="height:1px; background-color:${accentColor}; font-size:1px; line-height:1px; margin-bottom:${spacing.rowGap};"></td></tr>` : ''}
              <tr>
                <td style="padding-top:${spacing.rowGap};">
                  <span style="color:${bodyColor};">E: <a href="mailto:${p.email}" style="color:${linkColor}; text-decoration:none;">${p.email}</a></span>
                  ${t.phone && p.phone ? `<span style="color:#94a3b8; margin:0 6px;">|</span><span style="color:${bodyColor};">T: <a href="tel:${p.phone}" style="color:${bodyColor}; text-decoration:none;">${p.phone}</a></span>` : ''}
                  ${t.mobile && p.mobile ? `<span style="color:#94a3b8; margin:0 6px;">|</span><span style="color:${bodyColor};">M: <a href="tel:${p.mobile}" style="color:${bodyColor}; text-decoration:none;">${p.mobile}</a></span>` : ''}
                </td>
              </tr>
              ${t.address && formattedAddress ? `<tr><td style="padding-top:4px; font-size:${smallSize}; color:#64748b;">${formattedAddress}</td></tr>` : ''}
              ${socialIconsHtml ? `<tr><td style="padding-top:6px;">${socialIconsHtml}</td></tr>` : ''}
              ${calendarHtml ? `<tr><td style="padding-top:6px;">${calendarHtml}</td></tr>` : ''}
            </table>
          </td>
        </tr>
        ${disclaimerHtml ? `<tr><td>${disclaimerHtml}</td></tr>` : ''}
      </table>
    `.trim();
  }

  // ARCHETYPE 3: Corporate Brand & Logo
  if (state.template === 'corporate-logo') {
    return `
      <table id="signatureTableRoot" cellpadding="0" cellspacing="0" border="0" style="background-color:${bgColor}; font-family:${font}; color:${bodyColor}; font-size:${baseSize}; line-height:1.45; max-width:580px; text-align:left;">
        <tr>
          <td valign="top" style="padding-right:16px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <span style="font-size:${nameSize}; font-weight:bold; color:${h1Color}; display:block;">${p.firstName} ${p.lastName}</span>
                  <span style="font-size:${baseSize}; font-weight:600; color:${h2Color}; display:block; margin-top:1px;">${p.jobTitle}</span>
                  ${t.department && p.department ? `<span style="font-size:${smallSize}; color:#64748b;">${p.department} • ${c.name}</span>` : `<span style="font-size:${smallSize}; color:#64748b;">${c.name}</span>`}
                </td>
              </tr>
              <tr>
                <td style="padding-top:${spacing.rowGap};">
                  <table cellpadding="0" cellspacing="0" border="0" style="font-size:${baseSize};">
                    <tr>
                      <td style="color:#64748b; padding-right:8px;">Direct:</td>
                      <td><a href="mailto:${p.email}" style="color:${linkColor}; font-weight:500; text-decoration:none;">${p.email}</a></td>
                    </tr>
                    ${t.phone && p.phone ? `
                    <tr>
                      <td style="color:#64748b; padding-right:8px;">Office:</td>
                      <td><a href="tel:${p.phone}" style="color:${bodyColor}; text-decoration:none;">${p.phone}</a></td>
                    </tr>` : ''}
                    ${t.mobile && p.mobile ? `
                    <tr>
                      <td style="color:#64748b; padding-right:8px;">Cell:</td>
                      <td><a href="tel:${p.mobile}" style="color:${bodyColor}; text-decoration:none;">${p.mobile}</a></td>
                    </tr>` : ''}
                    <tr>
                      <td style="color:#64748b; padding-right:8px;">Web:</td>
                      <td><a href="https://${c.website.replace(/^https?:\/\//, '')}" target="_blank" rel="noopener noreferrer" style="color:${linkColor}; text-decoration:none;">${c.website}</a></td>
                    </tr>
                  </table>
                </td>
              </tr>
              ${t.address && formattedAddress ? `<tr><td style="padding-top:4px; font-size:${smallSize}; color:#64748b;">${formattedAddress}</td></tr>` : ''}
              ${socialIconsHtml ? `<tr><td style="padding-top:6px;">${socialIconsHtml}</td></tr>` : ''}
              ${calendarHtml ? `<tr><td style="padding-top:6px;">${calendarHtml}</td></tr>` : ''}
            </table>
          </td>
          ${t.logo && c.logoUrl ? `
          <td valign="top" style="padding-left:16px; border-left:1px solid #e2e8f0; text-align:center; min-width:110px;">
            <img src="${c.logoUrl}" alt="${c.name}" width="100" style="display:block; max-width:100px; height:auto; border-radius:6px; margin:0 auto;" />
            ${t.tagline && c.tagline ? `<div style="font-size:10px; color:#64748b; line-height:1.2; margin-top:8px; max-width:110px;">${c.tagline}</div>` : ''}
          </td>` : ''}
        </tr>
        ${disclaimerHtml ? `<tr><td colspan="2">${disclaimerHtml}</td></tr>` : ''}
      </table>
    `.trim();
  }

  // ARCHETYPE 4: Photo + Social
  if (state.template === 'social') {
    return `
      <table id="signatureTableRoot" cellpadding="0" cellspacing="0" border="0" style="background-color:${bgColor}; font-family:${font}; color:${bodyColor}; font-size:${baseSize}; line-height:1.4; max-width:560px; text-align:left;">
        <tr>
          ${t.avatar && p.avatarUrl ? `
          <td valign="top" style="padding-right:16px;">
            <img src="${p.avatarUrl}" alt="${p.firstName} ${p.lastName}" width="72" height="72" style="display:block; width:72px; height:72px; border-radius:50%; object-fit:cover; border:2px solid ${accentColor};" />
          </td>` : ''}
          <td valign="top">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <span style="font-size:${nameSize}; font-weight:bold; color:${h1Color};">${p.firstName} ${p.lastName}</span>
                  ${t.pronouns && p.pronouns ? `<span style="font-size:${smallSize}; color:#64748b; margin-left:4px;">(${p.pronouns})</span>` : ''}
                  <div style="font-size:${baseSize}; color:${h2Color}; font-weight:600;">${p.jobTitle} • <span style="color:${h1Color};">${c.name}</span></div>
                </td>
              </tr>
              <tr>
                <td style="padding-top:${spacing.rowGap};">
                  <a href="mailto:${p.email}" style="color:${linkColor}; font-weight:500; text-decoration:none;">${p.email}</a>
                  ${t.phone && p.phone ? `<span style="color:#94a3b8; margin:0 6px;">|</span><a href="tel:${p.phone}" style="color:${bodyColor}; text-decoration:none;">${p.phone}</a>` : ''}
                  <span style="color:#94a3b8; margin:0 6px;">|</span>
                  <a href="https://${c.website.replace(/^https?:\/\//, '')}" target="_blank" rel="noopener noreferrer" style="color:${linkColor}; text-decoration:none;">${c.website}</a>
                </td>
              </tr>
              ${socialIconsHtml ? `<tr><td style="padding-top:8px;">${socialIconsHtml}</td></tr>` : ''}
              ${calendarHtml ? `<tr><td style="padding-top:6px;">${calendarHtml}</td></tr>` : ''}
            </table>
          </td>
        </tr>
        ${disclaimerHtml ? `<tr><td colspan="${t.avatar ? 2 : 1}">${disclaimerHtml}</td></tr>` : ''}
      </table>
    `.trim();
  }

  // ARCHETYPE 5: Executive Suite
  if (state.template === 'executive') {
    return `
      <table id="signatureTableRoot" cellpadding="0" cellspacing="0" border="0" style="background-color:${bgColor}; font-family:${font}; color:${bodyColor}; font-size:${baseSize}; line-height:1.45; max-width:600px; text-align:left;">
        <tr>
          <td colspan="2" style="padding-bottom:6px; border-bottom:2px solid ${accentColor};">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td>
                  <span style="font-size:${nameSize}; font-weight:bold; color:${h1Color}; letter-spacing:0.5px;">${p.firstName.toUpperCase()} ${p.lastName.toUpperCase()}</span>
                  <div style="font-size:${baseSize}; color:${h2Color}; font-weight:500; font-style:italic;">${p.jobTitle} — ${c.name}</div>
                </td>
                ${t.logo && c.logoUrl ? `
                <td align="right" valign="middle">
                  <img src="${c.logoUrl}" alt="${c.name}" height="34" style="display:block; height:34px; width:auto;" />
                </td>` : ''}
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td valign="top" style="padding-top:10px; width:55%;">
            <table cellpadding="0" cellspacing="0" border="0" style="font-size:${baseSize};">
              <tr>
                <td style="font-weight:600; color:${h2Color}; padding-right:8px;">Mail:</td>
                <td><a href="mailto:${p.email}" style="color:${linkColor}; text-decoration:none;">${p.email}</a></td>
              </tr>
              ${t.phone && p.phone ? `
              <tr>
                <td style="font-weight:600; color:${h2Color}; padding-right:8px;">Direct:</td>
                <td><a href="tel:${p.phone}" style="color:${bodyColor}; text-decoration:none;">${p.phone}</a></td>
              </tr>` : ''}
              ${t.mobile && p.mobile ? `
              <tr>
                <td style="font-weight:600; color:${h2Color}; padding-right:8px;">Mobile:</td>
                <td><a href="tel:${p.mobile}" style="color:${bodyColor}; text-decoration:none;">${p.mobile}</a></td>
              </tr>` : ''}
            </table>
          </td>
          <td valign="top" style="padding-top:10px; width:45%; padding-left:12px; border-left:1px solid #e2e8f0;">
            <table cellpadding="0" cellspacing="0" border="0" style="font-size:${baseSize};">
              <tr>
                <td style="font-weight:600; color:${h2Color}; padding-right:8px;">Web:</td>
                <td><a href="https://${c.website.replace(/^https?:\/\//, '')}" target="_blank" rel="noopener noreferrer" style="color:${linkColor}; text-decoration:none;">${c.website}</a></td>
              </tr>
              ${t.address && formattedAddress ? `
              <tr>
                <td colspan="2" style="font-size:${smallSize}; color:#64748b; padding-top:2px;">${formattedAddress}</td>
              </tr>` : ''}
            </table>
            ${socialIconsHtml ? `<div style="margin-top:6px;">${socialIconsHtml}</div>` : ''}
          </td>
        </tr>
        ${calendarHtml ? `<tr><td colspan="2" style="padding-top:8px;">${calendarHtml}</td></tr>` : ''}
        ${disclaimerHtml ? `<tr><td colspan="2">${disclaimerHtml}</td></tr>` : ''}
      </table>
    `.trim();
  }

  // ARCHETYPE 1: Classic Corporate (Default)
  return `
    <table id="signatureTableRoot" cellpadding="0" cellspacing="0" border="0" style="background-color:${bgColor}; font-family:${font}; color:${bodyColor}; font-size:${baseSize}; line-height:1.45; max-width:560px; text-align:left;">
      <tr>
        ${t.avatar && p.avatarUrl ? `
        <td valign="top" style="padding-right:14px; text-align:center;">
          <img src="${p.avatarUrl}" alt="${p.firstName} ${p.lastName}" width="80" height="80" style="display:block; width:80px; height:80px; border-radius:8px; object-fit:cover;" />
          ${t.logo && c.logoUrl ? `<img src="${c.logoUrl}" alt="${c.name}" width="70" style="display:block; width:70px; height:auto; margin:8px auto 0;" />` : ''}
        </td>` : ''}
        
        <td valign="top" style="padding-left:14px; ${dividerBorder}">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding-bottom:${spacing.cellPad};">
                <span style="font-size:${nameSize}; font-weight:bold; color:${h1Color};">${p.firstName} ${p.lastName}</span>
                ${t.pronouns && p.pronouns ? `<span style="font-size:${smallSize}; color:#64748b; margin-left:6px;">(${p.pronouns})</span>` : ''}
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:${spacing.rowGap};">
                <span style="font-size:${baseSize}; font-weight:600; color:${h2Color};">${p.jobTitle}</span>
                ${t.department && p.department ? `<span style="font-size:${smallSize}; color:#64748b;"> • ${p.department}</span>` : ''}
                <div style="font-weight:600; color:${h1Color}; margin-top:1px;">${c.name}</div>
              </td>
            </tr>
            <tr>
              <td>
                <table cellpadding="0" cellspacing="0" border="0" style="font-size:${baseSize};">
                  <tr>
                    <td style="color:${h2Color}; font-weight:600; padding-right:6px;">Email:</td>
                    <td><a href="mailto:${p.email}" style="color:${linkColor}; text-decoration:none;">${p.email}</a></td>
                  </tr>
                  ${t.phone && p.phone ? `
                  <tr>
                    <td style="color:${h2Color}; font-weight:600; padding-right:6px;">Phone:</td>
                    <td><a href="tel:${p.phone}" style="color:${bodyColor}; text-decoration:none;">${p.phone}</a></td>
                  </tr>` : ''}
                  ${t.mobile && p.mobile ? `
                  <tr>
                    <td style="color:${h2Color}; font-weight:600; padding-right:6px;">Mobile:</td>
                    <td><a href="tel:${p.mobile}" style="color:${bodyColor}; text-decoration:none;">${p.mobile}</a></td>
                  </tr>` : ''}
                  <tr>
                    <td style="color:${h2Color}; font-weight:600; padding-right:6px;">Web:</td>
                    <td><a href="https://${c.website.replace(/^https?:\/\//, '')}" target="_blank" rel="noopener noreferrer" style="color:${linkColor}; text-decoration:none;">${c.website}</a></td>
                  </tr>
                </table>
              </td>
            </tr>
            ${t.address && formattedAddress ? `<tr><td style="padding-top:4px; font-size:${smallSize}; color:#64748b;">${formattedAddress}</td></tr>` : ''}
            ${t.tagline && c.tagline ? `<tr><td style="padding-top:2px; font-size:${smallSize}; font-style:italic; color:#64748b;">“${c.tagline}”</td></tr>` : ''}
            ${socialIconsHtml ? `<tr><td style="padding-top:6px;">${socialIconsHtml}</td></tr>` : ''}
            ${calendarHtml ? `<tr><td style="padding-top:6px;">${calendarHtml}</td></tr>` : ''}
          </table>
        </td>
      </tr>
      ${disclaimerHtml ? `<tr><td colspan="${t.avatar ? 2 : 1}">${disclaimerHtml}</td></tr>` : ''}
    </table>
  `.trim();
}
