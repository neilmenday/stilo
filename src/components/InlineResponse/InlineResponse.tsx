import { Icon } from '../Icon/Icon';
import type { InlineResponseProps, InlineResponseVariant } from './types';

const ICON_NAME: Record<InlineResponseVariant, string> = {
  info: 'info', warning: 'warning', error: 'error', success: 'success',
};

// Generic fallback palette so this renders standalone in Stilo's own storybook.
// Extensions (e.g. CakeUI) override via CSS custom properties, same convention
// as FormBlockInput's --form-input-gap.
const DEFAULT_COLORS: Record<InlineResponseVariant, { bg: string; color: string }> = {
  info:    { bg: '#EEF2F7', color: '#1A1D33' },
  warning: { bg: '#FCECD5', color: '#1A1D33' },
  error:   { bg: '#FDE3E7', color: '#1A1D33' },
  success: { bg: '#D9F1E2', color: '#1A1D33' },
};

export function InlineResponse({ variant = 'info', message, iconVisible = true }: InlineResponseProps) {
  const { bg, color } = DEFAULT_COLORS[variant];
  return (
    <div
      data-stilo="inline-response"
      data-stilo-variant={variant}
      style={{
        background:   `var(--inline-response-bg, ${bg})`,
        color:        `var(--inline-response-color, ${color})`,
        borderRadius: 'var(--inline-response-radius, 4px)',
        padding:      'var(--inline-response-padding, 12px 16px)',
        display:      'flex',
        alignItems:   'center',
        gap:          'var(--inline-response-gap, 5px)',
        width:        'fit-content',
      }}
    >
      {iconVisible && <Icon name={ICON_NAME[variant]} size={16} />}
      <span style={{
        fontFamily: 'var(--inline-response-font, system-ui, sans-serif)',
        fontWeight: 400, fontSize: 14, lineHeight: '22px',
      }}>
        {message}
      </span>
    </div>
  );
}

export default InlineResponse;
