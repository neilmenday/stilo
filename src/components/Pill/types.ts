export type PillVariant = 'Default' | 'Indicator' | 'Indicator - Good' | 'Indicator - Bad' | 'Customisable';

export interface PillProps {
  label?: string;
  variant?: PillVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
  customColor?: string;
}

/** Compute accessible bg/border/text from a hex colour for Customisable variant */
export function resolveCustomPillColour(hex: string): { bg: string; border: string; textColor: string } {
  const cleaned = hex.replace('#', '');
  if (cleaned.length !== 6) return { bg: '#ECF1F6', border: '#BCCCE0', textColor: '#1A1D33' };

  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);

  const BG_ALPHA = 0.12;
  const sRGBChannel = (v: number) => { const n = v / 255; return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4); };
  const luminance = (r: number, g: number, b: number) => 0.2126 * sRGBChannel(r) + 0.7152 * sRGBChannel(g) + 0.0722 * sRGBChannel(b);
  const contrastRatio = (l1: number, l2: number) => { const hi = Math.max(l1, l2); const lo = Math.min(l1, l2); return (hi + 0.05) / (lo + 0.05); };
  const toHex = (r: number, g: number, b: number) => '#' + [r, g, b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');

  const er = 255 * (1 - BG_ALPHA) + r * BG_ALPHA;
  const eg = 255 * (1 - BG_ALPHA) + g * BG_ALPHA;
  const eb = 255 * (1 - BG_ALPHA) + b * BG_ALPHA;
  const bgLum = luminance(er, eg, eb);

  let cr = r, cg = g, cb = b;
  for (let i = 0; i < 30; i++) {
    if (contrastRatio(bgLum, luminance(cr, cg, cb)) >= 3) break;
    cr *= 0.8; cg *= 0.8; cb *= 0.8;
  }

  return {
    bg: `rgba(${r}, ${g}, ${b}, ${BG_ALPHA})`,
    border: toHex(cr, cg, cb),
    textColor: '#1A1D33',
  };
}
