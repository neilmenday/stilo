import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { ToastProps } from '../../src/components/Toast';

const VARIANT_STYLES: Record<string, { bg: string; border: string; color: string; icon: string }> = {
  Success: { bg: '#f6ffed', border: '#b7eb8f', color: '#135200', icon: '✓' },
  Error:   { bg: '#fff1f0', border: '#ffa39e', color: '#820014', icon: '✕' },
  Warning: { bg: '#fffbe6', border: '#ffe58f', color: '#7c5f00', icon: '⚠' },
  Info:    { bg: '#f5f5f5', border: '#e0e0e0', color: '#111', icon: 'ℹ' },
};

function ToastDemo({
  variant = 'Info',
  message = 'Changes saved successfully.',
  showIcon = true,
  dismissable = true,
  onDismiss,
}: ToastProps) {
  const [dismissed, setDismissed] = useState(false);
  const s = VARIANT_STYLES[variant ?? 'Info'];

  if (dismissed) {
    return (
      <button
        onClick={() => setDismissed(false)}
        style={{ fontSize: 12, color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer' }}
      >Show toast</button>
    );
  }

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'flex-start', gap: 8,
      padding: '10px 14px', borderRadius: 6, fontSize: 13,
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      fontFamily: 'system-ui, sans-serif', maxWidth: 360,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    }}>
      {showIcon && <span style={{ fontSize: 14, lineHeight: 1.4 }}>{s.icon}</span>}
      <span style={{ flex: 1, lineHeight: 1.5 }}>{message}</span>
      {dismissable && (
        <button
          onClick={() => { setDismissed(true); onDismiss?.(); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: s.color, padding: 0, lineHeight: 1 }}
        >✕</button>
      )}
    </div>
  );
}

const meta: Meta<typeof ToastDemo> = {
  title: 'Stilo/Components/Toast',
  component: ToastDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ToastDemo>;

export const Success: Story = { args: { variant: 'Success', message: 'Record saved successfully.' } };
export const Error: Story = { args: { variant: 'Error', message: 'Something went wrong. Please try again.' } };
export const Warning: Story = { args: { variant: 'Warning', message: 'This action may have unintended effects.' } };
export const Info: Story = { args: { variant: 'Info', message: 'Records will sync overnight.' } };
