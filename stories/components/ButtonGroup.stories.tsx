import type { Meta, StoryObj } from '@storybook/react';
import { useButtonGroup } from '../../src/components/ButtonGroup';
import type { ButtonGroupProps } from '../../src/components/ButtonGroup';

function ButtonGroupDemo({
  buttons = ['Option A', 'Option B', 'Option C'],
  label = 'View',
  showLabel = true,
  layout = 'Inline',
  state = 'Default',
  onChange,
}: ButtonGroupProps) {
  const { activeIndex, handleClick } = useButtonGroup({ onChange });
  const isInactive = state === 'Inactive';

  return (
    <div style={{
      display: 'flex', flexDirection: layout === 'Stacked' ? 'column' : 'row',
      alignItems: layout === 'Stacked' ? 'flex-start' : 'center',
      gap: layout === 'Stacked' ? 6 : 12,
      fontFamily: 'system-ui, sans-serif',
    }}>
      {showLabel && (
        <div style={{ fontSize: 12, color: '#555', minWidth: 80 }}>{label}</div>
      )}
      <div style={{ display: 'flex', border: '1px solid #e0e0e0', borderRadius: 4, overflow: 'hidden' }}>
        {(buttons ?? []).map((btn, i) => (
          <button
            key={i}
            onClick={() => !isInactive && handleClick(i)}
            disabled={isInactive}
            style={{
              padding: '6px 14px',
              fontSize: 13,
              border: 'none',
              borderRight: i < (buttons ?? []).length - 1 ? '1px solid #e0e0e0' : 'none',
              background: activeIndex === i ? '#111' : '#fff',
              color: isInactive ? '#ccc' : activeIndex === i ? '#fff' : '#111',
              cursor: isInactive ? 'not-allowed' : 'pointer',
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

const meta: Meta<typeof ButtonGroupDemo> = {
  title: 'Stilo/Components/ButtonGroup',
  component: ButtonGroupDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ButtonGroupDemo>;

export const Default: Story = {
  args: {
    buttons: ['Option A', 'Option B', 'Option C'],
    label: 'View',
    showLabel: true,
    layout: 'Inline',
    state: 'Default',
  },
};
