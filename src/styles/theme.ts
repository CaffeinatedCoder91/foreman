export const theme = {
  color: {
    page: '#D7DADF',
    panel: '#EEF0F3',
    ink: '#1B2027',
    // WCAG AA small-text contrast: 4.80:1 on page, 5.64:1 on locked rows.
    inkMuted: '#565C66',
    // WCAG AA small-text contrast: 4.52:1 on page, 5.30:1 on locked rows.
    inkFaint: '#59606C',
    border: 'rgba(27,32,39,0.07)',
    borderMid: 'rgba(27,32,39,0.14)',
    lockedBg: 'rgba(27,32,39,0.025)',
    accent: '#A8285C',
    accentLight: '#C13D74',
    accentSoft: 'rgba(168,40,92,0.10)',
    accentDim: 'rgba(168,40,92,0.35)',
    lcdGreen: '#7BE0A8',
    lcdGreenFaint: 'rgba(123,224,168,0.5)',
    white: '#FFFFFF',
    status: {
      clearBg: 'rgba(46,143,125,0.12)',
      clearFg: '#1F7561',
      flaggedBg: 'rgba(184,130,31,0.14)',
      // WCAG AA small-text contrast: at least 4.75:1 on the tinted badge surfaces.
      flaggedFg: '#805A10',
    },
  },
  gradient: {
    surface: 'linear-gradient(180deg, #FAFBFC, #F6F7F9)',
    gaugeHousing: 'linear-gradient(160deg, #D8DBE0, #C2C6CC)',
    gaugeFace:
      'radial-gradient(circle at 38% 32%, #FAFBFC 0%, #E9EBEE 55%, #DADDE2 100%)',
    glassHighlight:
      'linear-gradient(115deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
    lcd: 'linear-gradient(180deg, #10141A, #1B2027)',
    accentDot: 'radial-gradient(circle at 35% 30%, #C13D74, #A8285C 70%)',
    statusDotOk: 'radial-gradient(circle at 35% 30%, #4FB89F, #2E8F7D 70%)',
    statusDotWatch: 'radial-gradient(circle at 35% 30%, #D49E3A, #B8821F 70%)',
  },
  shadow: {
    frame: '0 16px 36px rgba(27,32,39,.14), 0 1px 0 rgba(255,255,255,.5)',
    card: '0 1px 2px rgba(27,32,39,.04), inset 0 1px 0 rgba(255,255,255,.9)',
    cardElevated:
      '0 4px 12px rgba(27,32,39,.1), inset 0 1px 0 rgba(255,255,255,.8)',
    lcd: 'inset 0 1px 3px rgba(0,0,0,.6), 0 2px 4px rgba(27,32,39,.18)',
    gaugeHousing:
      '0 2px 4px rgba(27,32,39,.22), inset 0 1px 1px rgba(255,255,255,.5)',
    gaugeFace:
      'inset 0 -2px 4px rgba(27,32,39,.16), inset 0 2px 2px rgba(255,255,255,.85)',
    button: '0 1px 3px rgba(27,32,39,.12), inset 0 1px 0 rgba(255,255,255,.8)',
    buttonActive:
      '0 1px 1px rgba(27,32,39,.08), inset 0 1px 2px rgba(27,32,39,.08)',
    statusDot:
      '0 1px 2px rgba(27,32,39,.12), inset 0 1px 0 rgba(255,255,255,.55)',
  },
  font: {
    brand: 'var(--font-space-grotesk), sans-serif',
    mono: 'var(--font-ibm-plex-mono), monospace',
    body: 'var(--font-inter), sans-serif',
  },
  radius: {
    xs: '5px',
    sm: '9px',
    md: '16px',
    full: '9999px',
  },
} as const

export type Theme = typeof theme
