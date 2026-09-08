import type { Meta, StoryObj } from '@storybook/react';
import { useHoverPopover } from '../../src/components/Popover';

interface LinkPopoverTriggerDemoProps {
  label?: string;
  title?: string;
  body?: string;
}

function LinkPopoverTriggerDemo({
  label = 'eligible records',
  title = 'Eligible records',
  body = 'Records that meet all the criteria for this distribution rule.',
}: LinkPopoverTriggerDemoProps) {
  const { open, triggerRef, handleMouseEnter, handleMouseLeave } = useHoverPopover<HTMLSpanElement>();

  return (
    <div style={{ padding: 40, fontFamily: 'system-ui, sans-serif', position: 'relative', display: 'inline-block' }}>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          color: '#0066cc',
          textDecoration: 'underline',
          textDecorationStyle: 'dashed',
          cursor: 'help',
        }}
      >
        {label}
      </span>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 40, marginTop: 6,
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

const meta: Meta<typeof LinkPopoverTriggerDemo> = {
  title: 'Stilo/Components - Passive/LinkPopoverTrigger',
  component: LinkPopoverTriggerDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof LinkPopoverTriggerDemo>;

export const Default: Story = {
  args: {
    label: 'eligible records',
    title: 'Eligible records',
    body: 'Records that meet all the criteria for this distribution rule.',
  },
};
