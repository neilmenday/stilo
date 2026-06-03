import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { PopoverProps } from '../../src/components/Popover';

function PopoverDemo({
  title = 'Popover title',
  body = 'This is the popover body text. It provides additional context.',
  property1 = 'Down centre',
  closable = true,
}: PopoverProps) {
  const [closed, setClosed] = useState(false);

  if (closed) {
    return (
      <button
        onClick={() => setClosed(false)}
        style={{ fontSize: 12, color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        Show popover
      </button>
    );
  }

  return (
    <div style={{
      position: 'relative', display: 'inline-block',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8,
        padding: '12px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        maxWidth: 260, fontSize: 13,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
          {title && <strong style={{ fontSize: 13, color: '#111' }}>{title}</strong>}
          {closable && (
            <button
              onClick={() => setClosed(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#555', padding: 0, marginLeft: 8 }}
            >✕</button>
          )}
        </div>
        <p style={{ margin: 0, fontSize: 12, color: '#555', lineHeight: 1.5 }}>{body}</p>
      </div>
      <div style={{ fontSize: 11, color: '#555', marginTop: 6 }}>Position: {property1}</div>
    </div>
  );
}

const meta: Meta<typeof PopoverDemo> = {
  title: 'Stilo/Components - Passive/Popover',
  component: PopoverDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PopoverDemo>;

export const Default: Story = {
  args: {
    title: 'Helpful tip',
    body: 'Click the field to enter a value. You can also paste from your clipboard.',
    property1: 'Down centre',
    closable: true,
  },
};
