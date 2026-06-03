import type { Meta, StoryObj } from '@storybook/react';
import { useExpandableBox } from '../../src/components/ExpandableBox';
import type { ExpandableBoxProps } from '../../src/components/ExpandableBox';

function ExpandableBoxDemo({
  title = 'Section title',
  variant = 'default',
  defaultOpen = false,
  showPill = false,
  pillLabel = '3',
  children,
  onChange,
}: ExpandableBoxProps) {
  const { isOpen, toggle } = useExpandableBox({ variant, defaultOpen, onChange });

  return (
    <div style={{
      border: '1px solid #e0e0e0', borderRadius: 8, background: '#fff',
      fontFamily: 'system-ui, sans-serif', width: 360,
    }}>
      <div
        onClick={toggle}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', cursor: 'pointer',
          borderBottom: isOpen ? '1px solid #e0e0e0' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{title}</span>
          {showPill && (
            <span style={{ fontSize: 11, padding: '2px 6px', borderRadius: 10, background: '#f5f5f5', border: '1px solid #e0e0e0', color: '#555' }}>
              {pillLabel}
            </span>
          )}
        </div>
        <span style={{ fontSize: 12, color: '#555', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>▼</span>
      </div>
      {isOpen && (
        <div style={{ padding: '12px 16px', fontSize: 13, color: '#555' }}>
          {children ?? 'Expandable content goes here.'}
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof ExpandableBoxDemo> = {
  title: 'Stilo/Components - Passive/ExpandableBox',
  component: ExpandableBoxDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ExpandableBoxDemo>;

export const Default: Story = { args: { title: 'Advanced settings', variant: 'default', defaultOpen: false, showPill: true, pillLabel: '3' } };
export const OpenByDefault: Story = { args: { title: 'Open section', variant: 'default', defaultOpen: true } };
