import type { Meta, StoryObj } from '@storybook/react';
import { useDrawerPanel } from '../../src/components/DrawerPanel';
import type { DrawerPanelProps } from '../../src/components/DrawerPanel';

function DrawerPanelDemo({
  title = 'Panel title',
  width = 360,
  onSave,
  onCancel,
}: DrawerPanelProps) {
  const { isOpen, animateClose } = useDrawerPanel();

  return (
    <div style={{
      width, border: '1px solid #e0e0e0', borderRadius: 8, background: '#fff',
      fontFamily: 'system-ui, sans-serif',
      opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateX(0)' : 'translateX(40px)',
      transition: 'opacity 0.22s, transform 0.22s',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px', borderBottom: '1px solid #e0e0e0',
      }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{title}</span>
        <button
          onClick={() => animateClose(onCancel)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#555' }}
        >✕</button>
      </div>
      <div style={{ padding: '16px', fontSize: 13, color: '#555', minHeight: 120 }}>
        Panel content area. The panel slides in from the right.
      </div>
      <div style={{ padding: '12px 16px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button
          onClick={() => animateClose(onCancel)}
          style={{ padding: '7px 14px', background: 'transparent', border: '1px solid #e0e0e0', borderRadius: 4, cursor: 'pointer', fontSize: 13, color: '#111' }}
        >Cancel</button>
        {onSave && (
          <button
            onClick={onSave}
            style={{ padding: '7px 14px', background: '#111', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}
          >Save</button>
        )}
      </div>
    </div>
  );
}

const meta: Meta<typeof DrawerPanelDemo> = {
  title: 'Stilo/Foundations/DrawerPanel',
  component: DrawerPanelDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DrawerPanelDemo>;

export const Default: Story = { args: { title: 'Edit record', width: 360 } };
