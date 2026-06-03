import type { Meta, StoryObj } from '@storybook/react';
import { useCalendar } from '../../src/components/Calendar';
import type { CalendarProps } from '../../src/components/Calendar';
import { buildWeeks, MONTH_NAMES, isWeekendCol } from '../../src/components/Calendar';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function CalendarDemo({ initialYear, initialMonth, onDayClick }: CalendarProps) {
  const { year, month, today, prevMonth, nextMonth } = useCalendar({ initialYear, initialMonth });
  const weeks = buildWeeks(year, month);

  const cellStyle = (dayNum: number | null, di: number): React.CSSProperties => {
    const isToday =
      dayNum !== null &&
      dayNum === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();
    return {
      width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, borderRadius: 4,
      background: isToday ? '#111' : 'transparent',
      color: dayNum === null ? 'transparent' : isToday ? '#fff' : isWeekendCol(di) ? '#555' : '#111',
      cursor: dayNum ? 'pointer' : 'default',
    };
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 280 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px 12px' }}>
        <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#111' }}>‹</button>
        <span style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{MONTH_NAMES[month]} {year}</span>
        <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#111' }}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 36px)', gap: 2, marginBottom: 4 }}>
        {DAY_LABELS.map(d => (
          <div key={d} style={{ width: 36, textAlign: 'center', fontSize: 11, color: '#555', fontWeight: 600 }}>{d}</div>
        ))}
      </div>
      {weeks.map((week, wi) => (
        <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 36px)', gap: 2 }}>
          {week.map((day, di) => (
            <div
              key={di}
              style={cellStyle(day, di)}
              onClick={() => {
                if (day) {
                  const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  onDayClick?.(key, day);
                }
              }}
            >
              {day ?? ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const meta: Meta<typeof CalendarDemo> = {
  title: 'Stilo/Components - Passive/Calendar',
  component: CalendarDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof CalendarDemo>;

export const Default: Story = { args: {} };
