import type { Meta, StoryObj } from '@storybook/react';
import type { ActionsSetProps } from '../../src/components/ActionsSet';

function ActionsSetDemo({
  showFilter = true,
  filterLabel = 'Filter',
  showSearch = true,
  searchLabel = 'Search',
  showButton = true,
  buttonLabel = 'Add record',
  showAction = false,
  actionLabel = 'Bulk action',
  filterVariant = 'combobox',
}: ActionsSetProps) {
  const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'system-ui, sans-serif' };
  const chip: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 4, padding: '5px 10px',
    border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 13, color: '#111',
    background: '#fff', cursor: 'pointer',
  };
  return (
    <div style={row}>
      {showFilter && (
        <div style={chip}>
          <span style={{ fontSize: 11, color: '#555' }}>▼</span>
          {filterLabel}
          {filterVariant === 'filter-mega' && <span style={{ fontSize: 11, color: '#555' }}> (mega)</span>}
        </div>
      )}
      {showSearch && (
        <div style={{ ...chip, width: 160, color: '#555' }}>
          <span>⌕</span> {searchLabel}
        </div>
      )}
      {showAction && (
        <div style={chip}>{actionLabel} <span style={{ fontSize: 11 }}>▼</span></div>
      )}
      {showButton && (
        <div style={{ ...chip, background: '#111', color: '#fff', border: 'none' }}>+ {buttonLabel}</div>
      )}
    </div>
  );
}

const meta: Meta<typeof ActionsSetDemo> = {
  title: 'Stilo/Component Sets/ActionsSet',
  component: ActionsSetDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ActionsSetDemo>;

export const Default: Story = {
  args: {
    showFilter: true,
    filterLabel: 'Filter',
    filterVariant: 'combobox',
    showSearch: true,
    searchLabel: 'Search',
    showButton: true,
    buttonLabel: 'Add record',
    showAction: false,
    actionLabel: 'Bulk action',
  },
};
