import type { Meta, StoryObj } from '@storybook/react';
import { useDatePicker } from '../../src/components/Date';
import type { UseDatePickerOptions } from '../../src/components/Date';
import { formatDate, formatDateRange } from '../../src/components/Date';

interface DateDemoProps extends UseDatePickerOptions {
  placeholder?: string;
}

function DateDemo({
  variant = 'Date range',
  placeholder = 'Select date range',
  onChange,
}: DateDemoProps) {
  const {
    isOpen, rangeFrom, rangeTo, wrapperRef, dropdownRef,
    dateValue, toggleCalendar, handleChange,
  } = useDatePicker({ variant, onChange });

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();

  return (
    <div ref={wrapperRef} style={{ fontFamily: 'system-ui, sans-serif', width: 320, position: 'relative' }}>
      <div
        onClick={toggleCalendar}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          border: `1px solid ${isOpen ? '#0066cc' : '#e0e0e0'}`, borderRadius: 4,
          padding: '7px 10px', cursor: 'pointer', background: '#fff',
          fontSize: 13, color: dateValue ? '#111' : '#ccc',
        }}
      >
        <span>{dateValue || placeholder}</span>
        <span style={{ fontSize: 12 }}>📅</span>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute', top: '100%', left: 0, zIndex: 10,
            background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)', padding: 16, marginTop: 4, width: 280,
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 13, color: '#111', marginBottom: 10, textAlign: 'center' }}>
            {today.toLocaleString('default', { month: 'long' })} {year}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 11, color: '#555', padding: '4px 0' }}>{d}</div>
            ))}
            {Array.from({ length: firstDow }, (_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const date = new Date(year, month, day);
              const isFrom = rangeFrom && date.toDateString() === rangeFrom.toDateString();
              const isTo = rangeTo && date.toDateString() === rangeTo.toDateString();
              const inRange = rangeFrom && rangeTo && date > rangeFrom && date < rangeTo;
              return (
                <div
                  key={day}
                  onClick={() => {
                    if (variant === 'Date') {
                      handleChange({ from: date, to: null });
                    } else if (!rangeFrom || (rangeFrom && rangeTo)) {
                      handleChange({ from: date, to: null });
                    } else {
                      handleChange({ from: rangeFrom, to: date });
                    }
                  }}
                  style={{
                    textAlign: 'center', fontSize: 12, padding: '6px 0',
                    borderRadius: 3, cursor: 'pointer',
                    background: isFrom || isTo ? '#111' : inRange ? '#e0e0e0' : 'transparent',
                    color: isFrom || isTo ? '#fff' : '#111',
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof DateDemo> = {
  title: 'Stilo/Components - Passive/Date',
  component: DateDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DateDemo>;

export const DateRange: Story = { args: { variant: 'Date range', placeholder: 'Select date range' } };
export const SingleDate: Story = { args: { variant: 'Date', placeholder: 'Select date' } };
