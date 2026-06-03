import type { Meta, StoryObj } from '@storybook/react';
import type { FormBlockExpandableProps } from '../../src/components/FormBlockExpandable';
import { useExpandableBox } from '../../src/components/ExpandableBox';

function FormBlockExpandableDemo({
  title = 'Advanced settings',
  defaultOpen = false,
  showPill = false,
  pillLabel = '2',
  children,
}: FormBlockExpandableProps) {
  const { isOpen, toggle } = useExpandableBox({ defaultOpen });

  return (
    <div style={{
      border: '1px solid #e0e0e0', borderRadius: 8, background: '#fff',
      fontFamily: 'system-ui, sans-serif', width: 400,
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
        <div style={{ padding: '16px', fontSize: 13, color: '#555' }}>
          {children ?? <div style={{ color: '#555' }}>Form fields go here inside the expandable block.</div>}
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof FormBlockExpandableDemo> = {
  title: 'Stilo/Component Sets/FormBlockExpandable',
  component: FormBlockExpandableDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FormBlockExpandableDemo>;

export const Default: Story = {
  args: { title: 'Advanced settings', defaultOpen: false, showPill: true, pillLabel: '2' },
};
