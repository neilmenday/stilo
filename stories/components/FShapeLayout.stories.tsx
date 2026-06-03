import type { Meta, StoryObj } from '@storybook/react';
import type { FShapeLayoutProps } from '../../src/components/FShapeLayout';

function FShapeLayoutDemo({ sidebar, children }: FShapeLayoutProps) {
  return (
    <div style={{
      display: 'flex', gap: 0, height: 320, border: '1px solid #e0e0e0',
      borderRadius: 8, overflow: 'hidden', fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ width: 220, borderRight: '1px solid #e0e0e0', background: '#f5f5f5', padding: 12 }}>
        {sidebar ?? (
          <div>
            {['Dashboard', 'Records', 'Reports', 'Settings'].map(item => (
              <div key={item} style={{ padding: '8px 10px', fontSize: 13, color: '#555', borderRadius: 4, cursor: 'pointer' }}>{item}</div>
            ))}
          </div>
        )}
      </div>
      <div style={{ flex: 1, background: '#fff', padding: 16 }}>
        {children ?? <div style={{ fontSize: 13, color: '#555' }}>Main content area</div>}
      </div>
    </div>
  );
}

const meta: Meta<typeof FShapeLayoutDemo> = {
  title: 'Stilo/Foundations/FShapeLayout',
  component: FShapeLayoutDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FShapeLayoutDemo>;

export const Default: Story = { args: {} };
