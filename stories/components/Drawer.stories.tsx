import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { DrawerProps } from '../../src/components/Drawer';

function DrawerDemo({
  title = 'Drawer panel',
  width = 360,
  onSave,
}: DrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', position: 'relative', minHeight: 200 }}>
      <button
        onClick={() => setOpen(true)}
        style={{ padding: '7px 14px', background: '#111', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}
      >
        Open Drawer
      </button>

      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div
            onClick={() => setOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }}
          />
          <div style={{
            position: 'relative', width, background: '#fff',
            boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
            display: 'flex', flexDirection: 'column', height: '100%',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px', borderBottom: '1px solid #e0e0e0',
            }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{title}</span>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#555' }}>✕</button>
            </div>
            <div style={{ flex: 1, padding: '16px', fontSize: 13, color: '#555' }}>
              Drawer content goes here.
            </div>
            <div style={{ padding: '12px 16px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setOpen(false)} style={{ padding: '7px 14px', background: 'transparent', border: '1px solid #e0e0e0', borderRadius: 4, cursor: 'pointer', fontSize: 13, color: '#111' }}>Cancel</button>
              {onSave && <button onClick={() => { onSave(); setOpen(false); }} style={{ padding: '7px 14px', background: '#111', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>Save</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof DrawerDemo> = {
  title: 'Stilo/Components/Drawer',
  component: DrawerDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DrawerDemo>;

export const Default: Story = { args: { title: 'Edit record', width: 360 } };
