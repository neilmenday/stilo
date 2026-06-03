import type { Meta, StoryObj } from '@storybook/react';
import type { BoxProps } from '../../src/components/Box';

function BoxDemo({ title = 'Box title', pill, action = 'Edit', onAction, children }: BoxProps) {
  return (
    <div style={{
      border: '1px solid #e0e0e0', borderRadius: 8, fontFamily: 'system-ui, sans-serif',
      background: '#fff', width: 320,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', borderBottom: '1px solid #e0e0e0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{title}</span>
          {pill && (
            <span style={{
              fontSize: 11, padding: '2px 6px', borderRadius: 10,
              background: '#f5f5f5', border: '1px solid #e0e0e0', color: '#555',
            }}>{pill}</span>
          )}
        </div>
        {action && (
          <button
            onClick={onAction}
            style={{
              fontSize: 12, color: '#0066cc', background: 'none',
              border: 'none', cursor: 'pointer', padding: 0,
            }}
          >{action}</button>
        )}
      </div>
      <div style={{ padding: '12px 16px', fontSize: 13, color: '#555' }}>
        {children ?? 'Box content goes here.'}
      </div>
    </div>
  );
}

const meta: Meta<typeof BoxDemo> = {
  title: 'Stilo/Components/Box',
  component: BoxDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof BoxDemo>;

export const Default: Story = { args: { title: 'Box title', action: 'Edit', pill: '3' } };
