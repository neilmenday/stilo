import type { Meta, StoryObj } from '@storybook/react';
import type { FilterResultsBarProps } from '../../src/components/FilterResultsBar';

function FilterResultsBarDemo({ pills, onClearAll }: FilterResultsBarProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
      fontFamily: 'system-ui, sans-serif', padding: '8px 0',
    }}>
      <span style={{ fontSize: 12, color: '#555' }}>Filtered by:</span>
      {pills.map(pill => (
        <div key={pill.key} style={{
          display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px',
          background: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: 12,
          fontSize: 12, color: '#111',
        }}>
          {pill.label}
          <button
            onClick={pill.onDismiss}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#555', padding: '0 0 0 2px' }}
          >✕</button>
        </div>
      ))}
      {pills.length > 0 && (
        <button
          onClick={onClearAll}
          style={{ fontSize: 12, color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >Clear all</button>
      )}
    </div>
  );
}

const meta: Meta<typeof FilterResultsBarDemo> = {
  title: 'Stilo/Components/FilterResultsBar',
  component: FilterResultsBarDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FilterResultsBarDemo>;

export const Default: Story = {
  args: {
    pills: [
      { key: 'region', label: 'North', onDismiss: () => {} },
      { key: 'status', label: 'Active', onDismiss: () => {} },
    ],
    onClearAll: () => {},
  },
};
