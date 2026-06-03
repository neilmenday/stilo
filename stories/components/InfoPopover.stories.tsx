import type { Meta, StoryObj } from '@storybook/react';
import { useInfoPopover } from '../../src/components/InfoPopover';
import type { InfoPopoverProps } from '../../src/components/InfoPopover';

function InfoPopoverDemo({
  title = 'Information',
  body = 'This is additional context about the field.',
  variant = 'Down centre',
}: InfoPopoverProps) {
  const { open, triggerRef, handleMouseEnter, handleMouseLeave } = useInfoPopover();

  return (
    <div style={{ padding: 40, fontFamily: 'system-ui, sans-serif', position: 'relative', display: 'inline-block' }}>
      <button
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: 18, height: 18, borderRadius: '50%', background: '#e0e0e0',
          border: 'none', cursor: 'pointer', fontSize: 11, color: '#111',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        aria-label="More info"
      >
        i
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '120%', left: '50%', transform: 'translateX(-50%)',
          background: '#111', color: '#fff', padding: '8px 12px', borderRadius: 6,
          fontSize: 12, width: 200, zIndex: 10,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}>
          {title && <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>}
          <div style={{ lineHeight: 1.4 }}>{body}</div>
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof InfoPopoverDemo> = {
  title: 'Stilo/Components - Passive/InfoPopover',
  component: InfoPopoverDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof InfoPopoverDemo>;

export const Default: Story = {
  args: {
    title: 'Field info',
    body: 'This value is auto-calculated from your regional settings.',
    variant: 'Down centre',
  },
};
