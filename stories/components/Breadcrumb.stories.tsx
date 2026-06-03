import type { Meta, StoryObj } from '@storybook/react';
import type { BreadcrumbProps } from '../../src/components/Breadcrumb';

function BreadcrumbDemo({ items }: BreadcrumbProps) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'system-ui, sans-serif', fontSize: 13 }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {i > 0 && <span style={{ color: '#ccc' }}>/</span>}
          {item.onClick
            ? (
              <button
                onClick={item.onClick}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#0066cc', padding: 0 }}
              >{item.label}</button>
            )
            : <span style={{ color: i === items.length - 1 ? '#111' : '#555' }}>{item.label}</span>
          }
        </span>
      ))}
    </nav>
  );
}

const meta: Meta<typeof BreadcrumbDemo> = {
  title: 'Stilo/Components - Passive/Breadcrumb',
  component: BreadcrumbDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof BreadcrumbDemo>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => {} },
      { label: 'Records', onClick: () => {} },
      { label: 'Detail view' },
    ],
  },
};
