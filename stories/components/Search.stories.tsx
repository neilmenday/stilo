import type { Meta, StoryObj } from '@storybook/react';
import { useSearch } from '../../src/components/Search';
import type { SearchProps } from '../../src/components/Search';

function SearchDemo({
  variant = 'Default',
  label = 'Search',
  showLabel = true,
  onChange,
}: SearchProps) {
  const {
    inputValue, isFocused, inputRef, handleInputChange, clearInput, focusProps, hoverProps,
  } = useSearch({ variant, onChange });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 280 }}>
      {showLabel && <div style={{ fontSize: 12, color: '#555', marginBottom: 4 }}>{label}</div>}
      <div
        {...hoverProps}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          border: `1px solid ${isFocused ? '#0066cc' : '#e0e0e0'}`,
          borderRadius: 4, padding: '7px 10px', background: '#fff',
        }}
      >
        <span style={{ fontSize: 14, color: '#555' }}>⌕</span>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={e => handleInputChange(e.target.value)}
          placeholder="Search…"
          {...focusProps}
          style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, color: '#111', background: 'transparent' }}
        />
        {inputValue && (
          <button
            onClick={clearInput}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#555', padding: 0 }}
          >✕</button>
        )}
      </div>
    </div>
  );
}

const meta: Meta<typeof SearchDemo> = {
  title: 'Stilo/Components/Search',
  component: SearchDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SearchDemo>;

export const Default: Story = { args: { variant: 'Default', label: 'Search records', showLabel: true } };
