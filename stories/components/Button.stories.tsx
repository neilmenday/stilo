import type { Meta, StoryObj } from '@storybook/react';
import type { ButtonProps } from '../../src/components/Button';

function ButtonDemo({
  label,
  variant = 'fill',
  intent = 'default',
  disabled = false,
  iconOnly = false,
  ...rest
}: ButtonProps) {
  const isFill = variant === 'fill';
  const isOutline = variant === 'outline';
  const isDestructive = intent === 'destructive';

  const bg = isFill ? (isDestructive ? '#c00' : '#111') : 'transparent';
  const color = isFill ? '#fff' : (isDestructive ? '#c00' : '#111');
  const border = isOutline ? `1px solid ${isDestructive ? '#c00' : '#e0e0e0'}` : isFill ? 'none' : 'none';

  return (
    <button
      disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: iconOnly ? '7px' : '7px 14px',
        background: disabled ? '#f5f5f5' : bg,
        color: disabled ? '#ccc' : color,
        border,
        borderRadius: 4,
        fontSize: 13,
        fontFamily: 'system-ui, sans-serif',
        cursor: disabled ? 'not-allowed' : 'pointer',
        textDecoration: variant === 'text' && !disabled ? 'underline' : 'none',
      }}
      {...rest}
    >
      {label}
    </button>
  );
}

const meta: Meta<typeof ButtonDemo> = {
  title: 'Stilo/Components - Passive/Button',
  component: ButtonDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ButtonDemo>;

export const Fill: Story = { args: { label: 'Save', variant: 'fill' } };
export const Outline: Story = { args: { label: 'Cancel', variant: 'outline' } };
export const Text: Story = { args: { label: 'Learn more', variant: 'text' } };
export const Destructive: Story = { args: { label: 'Delete', variant: 'fill', intent: 'destructive' } };
export const Disabled: Story = { args: { label: 'Save', variant: 'fill', disabled: true } };
