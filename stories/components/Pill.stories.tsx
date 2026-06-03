import type { Meta, StoryObj } from '@storybook/react';
import type { PillProps } from '../../src/components/Pill';

function PillDemo({
  label = 'Label',
  variant = 'Default',
  dismissible = false,
  onDismiss,
  customColor,
}: PillProps) {
  const styles: Record<string, React.CSSProperties> = {
    Default: { background: '#f5f5f5', border: '1px solid #e0e0e0', color: '#111' },
    Indicator: { background: '#e0e0e0', border: '1px solid #ccc', color: '#111' },
    'Indicator - Good': { background: '#e0e0e0', border: '1px solid #ccc', color: '#111' },
    'Indicator - Bad': { background: '#f5f5f5', border: '1px solid #ccc', color: '#c00' },
    Customisable: { background: customColor ? `${customColor}22` : '#f5f5f5', border: `1px solid ${customColor ?? '#ccc'}`, color: '#111' },
  };
  const s = styles[variant] ?? styles['Default'];

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 8px', borderRadius: 12, fontSize: 12,
      fontFamily: 'system-ui, sans-serif',
      ...s,
    }}>
      {label}
      {dismissible && (
        <button
          onClick={onDismiss}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 0 2px', fontSize: 11, color: '#555', lineHeight: 1 }}
        >✕</button>
      )}
    </div>
  );
}

const meta: Meta<typeof PillDemo> = {
  title: 'Stilo/Components - Passive/Pill',
  component: PillDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PillDemo>;

export const Default: Story = { args: { label: 'Active', variant: 'Default' } };
export const Dismissible: Story = { args: { label: 'North region', variant: 'Default', dismissible: true } };
export const GoodIndicator: Story = { args: { label: 'Active', variant: 'Indicator - Good' } };
export const BadIndicator: Story = { args: { label: 'Error', variant: 'Indicator - Bad' } };
