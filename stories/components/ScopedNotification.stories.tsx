import type { Meta, StoryObj } from '@storybook/react';
import type { ScopedNotificationProps } from '../../src/components/ScopedNotification';

const VARIANT_STYLES: Record<string, React.CSSProperties> = {
  info:    { background: '#f5f5f5', border: '1px solid #e0e0e0', color: '#111' },
  warning: { background: '#fffbe6', border: '1px solid #ffe58f', color: '#7c5f00' },
  error:   { background: '#fff1f0', border: '1px solid #ffa39e', color: '#820014' },
  success: { background: '#f6ffed', border: '1px solid #b7eb8f', color: '#135200' },
  light:   { background: '#fff', border: '1px solid #e0e0e0', color: '#555' },
  copyable:{ background: '#f5f5f5', border: '1px solid #e0e0e0', color: '#111' },
};

const ICONS: Record<string, string> = {
  info: 'ℹ', warning: '⚠', error: '✕', success: '✓', light: 'ℹ', copyable: '⊕',
};

function ScopedNotificationDemo({
  variant = 'info',
  label = 'This is a scoped notification message.',
  iconVisible = true,
  onCopy,
}: ScopedNotificationProps) {
  const style = VARIANT_STYLES[variant ?? 'info'] ?? VARIANT_STYLES['info'];
  const icon = ICONS[variant ?? 'info'];

  return (
    <div style={{
      ...style, display: 'flex', alignItems: 'flex-start', gap: 8,
      padding: '10px 14px', borderRadius: 6, fontSize: 13, width: 360,
      fontFamily: 'system-ui, sans-serif',
    }}>
      {iconVisible && <span style={{ fontSize: 14, lineHeight: 1.4, flexShrink: 0 }}>{icon}</span>}
      <span style={{ flex: 1, lineHeight: 1.5 }}>{label}</span>
      {variant === 'copyable' && onCopy && (
        <button onClick={onCopy} style={{ fontSize: 11, color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Copy</button>
      )}
    </div>
  );
}

const meta: Meta<typeof ScopedNotificationDemo> = {
  title: 'Stilo/Components - Passive/ScopedNotification',
  component: ScopedNotificationDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ScopedNotificationDemo>;

export const Info: Story = { args: { variant: 'info', label: 'Records will update overnight.', iconVisible: true } };
export const Warning: Story = { args: { variant: 'warning', label: 'This action cannot be undone.', iconVisible: true } };
export const Error: Story = { args: { variant: 'error', label: 'Something went wrong. Please try again.', iconVisible: true } };
export const Success: Story = { args: { variant: 'success', label: 'Changes saved successfully.', iconVisible: true } };
