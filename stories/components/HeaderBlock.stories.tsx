import type { Meta, StoryObj } from '@storybook/react';
import type { HeaderBlockProps } from '../../src/components/HeaderBlock';

function HeaderBlockDemo({
  title = 'Page title',
  actionLabel = 'Add record',
  helpLabel,
  showChooser = false,
  chooserLabel = 'View',
  chooserDisplayValue = 'All records',
  onActionClick,
  onHelpClick,
}: HeaderBlockProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 16px', border: '1px solid #e0e0e0', borderRadius: 8,
      background: '#fff', fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111' }}>{title}</h1>
        {showChooser && (
          <div style={{ fontSize: 13, color: '#555', border: '1px solid #e0e0e0', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>
            {chooserLabel}: {chooserDisplayValue} ▼
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {helpLabel && (
          <button onClick={onHelpClick} style={{ padding: '6px 12px', background: 'transparent', border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 13, cursor: 'pointer', color: '#555' }}>
            {helpLabel}
          </button>
        )}
        {actionLabel && (
          <button onClick={onActionClick} style={{ padding: '6px 12px', background: '#111', color: '#fff', border: 'none', borderRadius: 4, fontSize: 13, cursor: 'pointer' }}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

const meta: Meta<typeof HeaderBlockDemo> = {
  title: 'Stilo/Components/HeaderBlock',
  component: HeaderBlockDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof HeaderBlockDemo>;

export const Default: Story = { args: { title: 'Accounts', actionLabel: 'Add account', showChooser: false } };
