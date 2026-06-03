import React from 'react';
import type { IconRegistry } from './types';

const svg = (size: number, children: React.ReactNode) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    style={{ display: 'block', flexShrink: 0 }}
  >
    {children}
  </svg>
);

export const defaultIcons: IconRegistry = {
  search: s => svg(s,
    <><circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
  ),
  close: s => svg(s,
    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  ),
  check: s => svg(s,
    <path d="M2.5 8l4 4 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  plus: s => svg(s,
    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  ),
  minus: s => svg(s,
    <path d="M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  ),
  'chevron-down': s => svg(s,
    <path d="M3 5.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'chevron-up': s => svg(s,
    <path d="M3 10.5l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'chevron-left': s => svg(s,
    <path d="M10.5 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  'chevron-right': s => svg(s,
    <path d="M5.5 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  info: s => svg(s,
    <><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
  ),
  warning: s => svg(s,
    <><path d="M8 2L14.5 13.5H1.5L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 6v3.5M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
  ),
  error: s => svg(s,
    <><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
  ),
  success: s => svg(s,
    <><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8l2.5 2.5L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>
  ),
  drag: s => svg(s,
    <><circle cx="5.5" cy="4"  r="1.25" fill="currentColor"/><circle cx="10.5" cy="4"  r="1.25" fill="currentColor"/><circle cx="5.5" cy="8"  r="1.25" fill="currentColor"/><circle cx="10.5" cy="8"  r="1.25" fill="currentColor"/><circle cx="5.5" cy="12" r="1.25" fill="currentColor"/><circle cx="10.5" cy="12" r="1.25" fill="currentColor"/></>
  ),
  edit: s => svg(s,
    <path d="M11 2.5l2.5 2.5-8 8H3V10.5l8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  delete: s => svg(s,
    <><path d="M2.5 4.5h11M6 4.5V3h4v1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M4.5 4.5l.75 8.5h5.5l.75-8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>
  ),
  settings: s => svg(s,
    <><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
  ),
  user: s => svg(s,
    <><circle cx="8" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
  ),
  calendar: s => svg(s,
    <><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 2v2M11 2v2M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
  ),
  clock: s => svg(s,
    <><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5.5V8l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>
  ),
  filter: s => svg(s,
    <path d="M2 4h12M4.5 8h7M7 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  ),
  'external-link': s => svg(s,
    <><path d="M9 3h4v4M13 3L7.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 4H4a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
  ),
  copy: s => svg(s,
    <><rect x="6" y="5" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M4 11H3a1 1 0 01-1-1V3a1 1 0 011-1h7a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
  ),
};
