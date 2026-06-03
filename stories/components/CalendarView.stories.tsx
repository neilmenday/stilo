import type { Meta, StoryObj } from '@storybook/react';
import type { CalendarViewProps } from '../../src/components/CalendarView';

function CalendarViewDemo({
  title = 'Calendar View',
  buttonLabel = 'Add event',
  initialYear,
  initialMonth,
}: CalendarViewProps) {
  const today = new Date();
  const displayYear = initialYear ?? today.getFullYear();
  const displayMonth = initialMonth ?? today.getMonth();
  const monthName = new Date(displayYear, displayMonth).toLocaleString('default', { month: 'long' });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', border: '1px solid #e0e0e0', borderRadius: 8, background: '#fff', width: 520 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{title}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {buttonLabel && (
            <button style={{ fontSize: 12, padding: '5px 12px', background: '#111', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
              {buttonLabel}
            </button>
          )}
        </div>
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: '#111', marginBottom: 8 }}>{monthName} {displayYear}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: 11, color: '#555', padding: '4px 0', fontWeight: 600 }}>{d}</div>
          ))}
          {Array.from({ length: 35 }, (_, i) => (
            <div key={i} style={{ textAlign: 'center', fontSize: 12, color: '#111', padding: '8px 4px', background: i % 7 >= 5 ? '#f5f5f5' : '#fff', border: '1px solid #e0e0e0' }}>
              {i < 30 ? i + 1 : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof CalendarViewDemo> = {
  title: 'Stilo/Views/CalendarView',
  component: CalendarViewDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof CalendarViewDemo>;

export const Default: Story = { args: { title: 'Calendar View', buttonLabel: 'Add event' } };
