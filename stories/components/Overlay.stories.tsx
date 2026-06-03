import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useOverlay } from '../../src/components/Overlay';
import type { OverlayProps } from '../../src/components/Overlay';

function OverlayDemo({
  title = 'Overlay panel',
  width = 480,
  variant = 'default',
}: OverlayProps) {
  const [open, setOpen] = useState(false);
  const { contentVisible } = useOverlay({ open });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <button
        onClick={() => setOpen(true)}
        style={{ padding: '7px 14px', background: '#111', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}
      >
        Open Overlay
      </button>

      {contentVisible && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            onClick={() => setOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', opacity: open ? 1 : 0, transition: 'opacity 0.22s' }}
          />
          <div style={{
            position: 'relative', width: variant === 'large' ? 720 : width,
            background: '#fff', borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
            maxHeight: '80vh', display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px', borderBottom: '1px solid #e0e0e0',
            }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{title}</span>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#555' }}>✕</button>
            </div>
            <div style={{ flex: 1, padding: 16, fontSize: 13, color: '#555', overflowY: 'auto' }}>
              Overlay content goes here.
            </div>
            <div style={{ padding: '12px 16px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setOpen(false)} style={{ padding: '7px 14px', background: 'transparent', border: '1px solid #e0e0e0', borderRadius: 4, cursor: 'pointer', fontSize: 13, color: '#111' }}>Cancel</button>
              <button style={{ padding: '7px 14px', background: '#111', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof OverlayDemo> = {
  title: 'Stilo/Components - Passive/Overlay',
  component: OverlayDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof OverlayDemo>;

export const Default: Story = { args: { title: 'Edit record', width: 480, variant: 'default' } };
