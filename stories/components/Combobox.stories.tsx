import type { Meta, StoryObj } from '@storybook/react';
import { useCombobox } from '../../src/components/Combobox';
import type { ComboboxProps, ComboboxItem } from '../../src/components/Combobox';

const DEMO_ITEMS: ComboboxItem[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
];

function ComboboxDemo({
  label = 'Select fruit',
  showLabel = true,
  placeholder = 'Choose...',
  items = DEMO_ITEMS,
  listVariant = 'list',
  onSelect,
}: ComboboxProps) {
  const { open, displayValue, ref, triggerRef, handleToggle, handleSelect } = useCombobox({
    listVariant, items, onSelect,
  });

  return (
    <div ref={ref} style={{ width: 240, fontFamily: 'system-ui, sans-serif', position: 'relative' }}>
      {showLabel && <div style={{ fontSize: 12, color: '#555', marginBottom: 4 }}>{label}</div>}
      <div
        ref={triggerRef}
        onClick={handleToggle}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          border: `1px solid ${open ? '#0066cc' : '#e0e0e0'}`, borderRadius: 4,
          padding: '7px 10px', cursor: 'pointer', background: '#fff',
          fontSize: 13, color: displayValue ? '#111' : '#ccc',
        }}
      >
        <span>{displayValue || placeholder}</span>
        <span style={{ fontSize: 10, color: '#555' }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10,
          background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginTop: 2,
        }}>
          {(items ?? []).map(item => (
            <div
              key={item.value}
              onClick={() => handleSelect(item)}
              style={{
                padding: '8px 12px', fontSize: 13, color: '#111', cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
              onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof ComboboxDemo> = {
  title: 'Stilo/Components/Combobox',
  component: ComboboxDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ComboboxDemo>;

export const Default: Story = {
  args: {
    label: 'Select fruit',
    showLabel: true,
    placeholder: 'Choose...',
    items: DEMO_ITEMS,
    listVariant: 'list',
  },
};
