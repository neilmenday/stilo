import type { Meta, StoryObj } from '@storybook/react';
import { useDotMenu } from '../../src/components/DotMenu';
import type { DotMenuProps } from '../../src/components/DotMenu';

function DotMenuDemo({
  items = ['Edit', 'Duplicate', 'Delete'],
  align = 'left',
  onSelect,
}: DotMenuProps) {
  const { isOpen, selectedValue, wrapperRef, toggle, handleSelect } = useDotMenu({ items, onSelect });

  return (
    <div ref={wrapperRef} style={{ position: 'relative', display: 'inline-block', fontFamily: 'system-ui, sans-serif' }}>
      <button
        onClick={toggle}
        style={{
          width: 28, height: 28, borderRadius: 4,
          background: isOpen ? '#e0e0e0' : 'transparent',
          border: '1px solid transparent', cursor: 'pointer',
          fontSize: 18, color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        aria-label="More actions"
      >
        ⋮
      </button>
      {isOpen && (
        <div style={{
          position: 'absolute', top: '100%', [align]: 0, zIndex: 10,
          background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: 140, marginTop: 2,
        }}>
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => handleSelect({ value: item, label: item })}
              style={{
                padding: '8px 14px', fontSize: 13, color: '#111', cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
              onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
            >
              {item}
            </div>
          ))}
        </div>
      )}
      {selectedValue && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#555' }}>Last selected: {selectedValue}</div>
      )}
    </div>
  );
}

const meta: Meta<typeof DotMenuDemo> = {
  title: 'Stilo/Components - Passive/DotMenu',
  component: DotMenuDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DotMenuDemo>;

export const Default: Story = {
  args: {
    items: ['Edit', 'Duplicate', 'Delete'],
    align: 'left',
  },
};
