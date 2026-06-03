import type { Meta, StoryObj } from '@storybook/react';
import { useListItemGroup } from '../../src/components/ListItemGroup';
import type { ListItemGroupProps, ListItemGroupItem } from '../../src/components/ListItemGroup';

const DEMO_ITEMS: ListItemGroupItem[] = [
  { id: 'a', label: 'North Region' },
  { id: 'b', label: 'South Region' },
  { id: 'c', label: 'East Region' },
  { id: 'd', label: 'West Region' },
];

function ListItemGroupDemo({
  items = DEMO_ITEMS,
  variant = 'static',
  selectedId,
  onSelect,
  onReorder,
}: ListItemGroupProps) {
  const { items: orderedItems, draggingId, dragOverId, canDrag, handleDragStart, handleDragEnter, handleDragEnd } =
    useListItemGroup({ externalItems: items, variant, onReorder });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 280, border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}>
      {orderedItems.map(item => (
        <div
          key={item.id}
          draggable={canDrag}
          onDragStart={canDrag ? e => handleDragStart(e, item.id) : undefined}
          onDragEnter={canDrag ? () => handleDragEnter(item.id) : undefined}
          onDragEnd={canDrag ? handleDragEnd : undefined}
          onDragOver={e => e.preventDefault()}
          onClick={() => onSelect?.(item.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px',
            fontSize: 13, color: '#111', cursor: canDrag ? 'grab' : onSelect ? 'pointer' : 'default',
            background: item.id === selectedId ? '#f5f5f5' : dragOverId === item.id ? '#e0e0e0' : '#fff',
            borderBottom: '1px solid #e0e0e0',
            opacity: draggingId === item.id ? 0.4 : 1,
            transition: 'background 0.1s',
          }}
        >
          {canDrag && <span style={{ color: '#ccc', fontSize: 14 }}>⠿</span>}
          {item.colour && (
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.colour, flexShrink: 0 }} />
          )}
          {item.label}
        </div>
      ))}
    </div>
  );
}

const meta: Meta<typeof ListItemGroupDemo> = {
  title: 'Stilo/Components/ListItemGroup',
  component: ListItemGroupDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ListItemGroupDemo>;

export const Static: Story = { args: { items: DEMO_ITEMS, variant: 'static' } };
export const Draggable: Story = { args: { items: DEMO_ITEMS, variant: 'draggable' } };
