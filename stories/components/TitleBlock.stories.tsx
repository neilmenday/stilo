import type { Meta, StoryObj } from '@storybook/react';
import type { TitleBlockProps } from '../../src/components/TitleBlock';

function TitleBlockDemo({
  title = 'Page Title',
  actionLabel = 'Edit',
  onActionClick,
  onHelpClick,
}: TitleBlockProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 0', fontFamily: 'system-ui, sans-serif',
    }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#111' }}>{title}</h2>
      <div style={{ display: 'flex', gap: 8 }}>
        {onHelpClick && (
          <button
            onClick={onHelpClick}
            style={{ width: 24, height: 24, borderRadius: '50%', background: '#e0e0e0', border: 'none', cursor: 'pointer', fontSize: 12, color: '#555' }}
          >?</button>
        )}
        {actionLabel && (
          <button
            onClick={onActionClick}
            style={{ padding: '6px 14px', background: '#111', color: '#fff', border: 'none', borderRadius: 4, fontSize: 13, cursor: 'pointer' }}
          >{actionLabel}</button>
        )}
      </div>
    </div>
  );
}

const meta: Meta<typeof TitleBlockDemo> = {
  title: 'Stilo/Foundations/TitleBlock',
  component: TitleBlockDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TitleBlockDemo>;

export const Default: Story = { args: { title: 'Account Overview', actionLabel: 'Edit' } };
