import type { Meta, StoryObj } from '@storybook/react';
import { useControllableCalendarSet } from '../../src/components/ControllableCalendarSet';
import type { ControllableCalendarSetProps } from '../../src/components/ControllableCalendarSet';
import type { CalendarEventMap } from '../../src/components/Calendar';

const SAMPLE_EVENTS: CalendarEventMap = {
  '2026-06-05': { events: [{ label: 'Team sync', color: 'blue' }] },
  '2026-06-10': { events: [{ label: 'Review', color: 'green' }] },
  '2026-06-15': { spanEvents: [{ label: 'Sprint', color: 'orange', spanVariant: 'Span start' }] },
  '2026-06-16': { spanEvents: [{ label: '', color: 'orange', spanVariant: 'Span middle' }] },
  '2026-06-17': { spanEvents: [{ label: '', color: 'orange', spanVariant: 'Span end' }] },
};

function ControllableCalendarSetDemo({
  events = SAMPLE_EVENTS,
  variant,
  searchLabel = 'Search events',
  buttonLabel = 'Add event',
}: ControllableCalendarSetProps) {
  const {
    searchText, setSearchText, selected, onClose, enrichedEvents,
  } = useControllableCalendarSet({ events, variant });

  const eventCount = Object.values(enrichedEvents).reduce(
    (acc, day) => acc + (day.events?.length ?? 0) + (day.spanEvents?.length ?? 0), 0
  );

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', border: '1px solid #e0e0e0', borderRadius: 8, width: 480, background: '#fff' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', display: 'flex', gap: 8 }}>
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder={searchLabel}
          style={{ flex: 1, fontSize: 13, padding: '6px 10px', border: '1px solid #e0e0e0', borderRadius: 4, color: '#111' }}
        />
        {buttonLabel && (
          <button style={{ fontSize: 12, padding: '6px 12px', background: '#111', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
            {buttonLabel}
          </button>
        )}
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ fontSize: 13, color: '#555' }}>
          {searchText
            ? `${eventCount} event${eventCount !== 1 ? 's' : ''} matching "${searchText}"`
            : `${eventCount} event${eventCount !== 1 ? 's' : ''} in calendar`}
        </div>
        {Object.entries(enrichedEvents).slice(0, 5).map(([key, day]) => (
          <div key={key} style={{ marginTop: 8, padding: '6px 10px', background: '#f5f5f5', borderRadius: 4 }}>
            <div style={{ fontSize: 11, color: '#555', fontWeight: 600 }}>{key}</div>
            {day.events?.map((ev, i) => (
              <div key={i} style={{ fontSize: 12, color: '#111', marginTop: 2 }}>{ev.label}</div>
            ))}
          </div>
        ))}
      </div>
      {selected && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid #e0e0e0', fontSize: 13, color: '#111' }}>
          Selected: {selected.label}
          <button onClick={onClose} style={{ marginLeft: 8, fontSize: 12, color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof ControllableCalendarSetDemo> = {
  title: 'Stilo/Component Sets/ControllableCalendarSet',
  component: ControllableCalendarSetDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ControllableCalendarSetDemo>;

export const Default: Story = {
  args: {
    events: SAMPLE_EVENTS,
    searchLabel: 'Search events',
    buttonLabel: 'Add event',
  },
};
