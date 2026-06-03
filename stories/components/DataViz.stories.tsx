import type { Meta, StoryObj } from '@storybook/react';
import type { DataVizProps } from '../../src/components/DataViz';

function DataVizDemo({
  variant = 'bar',
  title = 'Chart',
  subtitle,
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  series = [{ label: 'Sales', data: [40, 65, 50, 80, 70] }],
  height = 200,
}: DataVizProps) {
  const data = (series?.[0]?.data ?? []) as number[];
  const maxVal = Math.max(...data, 1);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 400, border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, background: '#fff' }}>
      {title && <div style={{ fontWeight: 600, fontSize: 14, color: '#111', marginBottom: 2 }}>{title}</div>}
      {subtitle && <div style={{ fontSize: 12, color: '#555', marginBottom: 10 }}>{subtitle}</div>}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: height, paddingTop: 12 }}>
        {data.map((val, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: '100%', background: '#111', borderRadius: '2px 2px 0 0',
              height: `${(val / maxVal) * (height - 30)}px`,
              transition: 'height 0.3s',
            }} />
            <div style={{ fontSize: 11, color: '#555' }}>{(labels ?? [])[i] ?? i}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#555' }}>{series?.[0]?.label}</div>
    </div>
  );
}

const meta: Meta<typeof DataVizDemo> = {
  title: 'Stilo/DataViz/DataViz',
  component: DataVizDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DataVizDemo>;

export const Default: Story = {
  args: {
    variant: 'bar',
    title: 'Monthly Sales',
    subtitle: 'Jan – May 2026',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    series: [{ label: 'Sales', data: [40, 65, 50, 80, 70] }],
    height: 200,
  },
};
