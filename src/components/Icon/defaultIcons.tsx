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

// For icons authored on a 32x32 grid (e.g. exported straight from Figma) —
// same wrapper, different native viewBox, still scales to whatever `size` is requested.
const svg32 = (size: number, children: React.ReactNode) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
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
  // Sourced directly from Figma (CakeUI file).
  plus: s => svg32(s,
    <path fillRule="evenodd" clipRule="evenodd" d="M18.4615 17.846H28.6154C29.1077 17.846 29.5385 17.4153 29.5385 16.923V15.0768C29.5385 14.5845 29.1077 14.1537 28.6154 14.1537H18.4615C18.0923 14.1537 17.8462 13.9076 17.8462 13.5383V3.3845C17.8462 2.8922 17.4154 2.46143 16.9231 2.46143H15.0769C14.5846 2.46143 14.1539 2.8922 14.1539 3.3845V13.5383C14.1539 13.9076 13.9077 14.1537 13.5385 14.1537H3.38462C2.89232 14.1537 2.46155 14.5845 2.46155 15.0768V16.923C2.46155 17.4153 2.89232 17.846 3.38462 17.846H13.5385C13.9077 17.846 14.1539 18.0922 14.1539 18.4614V28.6153C14.1539 29.1076 14.5846 29.5383 15.0769 29.5383H16.9231C17.4154 29.5383 17.8462 29.1076 17.8462 28.6153V18.4614C17.8462 18.0922 18.0923 17.846 18.4615 17.846Z" fill="currentColor"/>
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
  // Sourced directly from Figma (CakeUI file, node 815:7119).
  edit: s => svg32(s,
    <path fillRule="evenodd" clipRule="evenodd" d="M5.84609 20.5539L11.323 26.0308C11.5692 26.277 11.9384 26.277 12.1846 26.0308L25.8462 12.3077C26.0923 12.0616 26.0923 11.6923 25.8462 11.4462L20.4308 6.03081C20.1846 5.78466 19.8154 5.78466 19.5692 6.03081L5.84609 19.7539C5.59993 20 5.59993 20.3693 5.84609 20.5539ZM22.2154 3.50788C21.9692 3.75403 21.9692 4.12326 22.2154 4.36942L27.6308 9.7848C27.8769 10.031 28.2462 10.031 28.4923 9.7848L30.0308 8.24634C31.0154 7.32326 31.0154 5.84634 30.0308 4.86173L27.1385 1.96942C26.1538 0.984803 24.6154 0.984803 23.6308 1.96942L22.2154 3.50788ZM1.2923 29.6617C1.16922 30.2771 1.72307 30.8309 2.33846 30.7078L9.04618 29.1078C9.29233 29.0463 9.47695 28.9232 9.60003 28.8002L9.72311 28.6771C9.84618 28.554 9.90772 28.1232 9.66157 27.8771L4.12308 22.3386C3.87693 22.0925 3.44616 22.154 3.32308 22.2771L3.2 22.4002C3.01539 22.5848 2.95385 22.7694 2.89231 22.954L1.2923 29.6617Z" fill="currentColor"/>
  ),
  // Sourced directly from Figma (CakeUI file, node 815:7598).
  import: s => svg32(s,
    <path d="M26.0554 25.7417C26.3818 25.7417 26.6949 25.8714 26.9257 26.1022C27.1565 26.333 27.2861 26.6461 27.2861 26.9725V29.5386C27.2861 29.8651 27.1565 30.1781 26.9257 30.4089C26.6949 30.6397 26.3818 30.7694 26.0554 30.7694H5.94461C5.61819 30.7694 5.30514 30.6397 5.07433 30.4089C4.84351 30.1781 4.71384 29.8651 4.71384 29.5386V26.9971C4.71384 26.6707 4.84351 26.3576 5.07433 26.1268C5.30514 25.896 5.61819 25.7663 5.94461 25.7663L26.0554 25.7417ZM17.2308 1.23096C17.5569 1.24122 17.8673 1.37328 18.1008 1.60111C18.3343 1.82894 18.474 2.13599 18.4923 2.46173V13.1694C18.4896 13.3304 18.5354 13.4884 18.6239 13.6228C18.7124 13.7573 18.8394 13.8619 18.9883 13.9231C19.1371 13.9842 19.301 13.9991 19.4585 13.9656C19.6159 13.9322 19.7596 13.852 19.8708 13.7356L22.8246 10.8494C22.9392 10.7322 23.0761 10.639 23.2272 10.5755C23.3784 10.5119 23.5407 10.4791 23.7046 10.4791C23.8686 10.4791 24.0309 10.5119 24.182 10.5755C24.3331 10.639 24.47 10.7322 24.5846 10.8494L26.3446 12.5417C26.4634 12.649 26.5583 12.7801 26.6233 12.9263C26.6882 13.0726 26.7218 13.2309 26.7218 13.391C26.7218 13.551 26.6882 13.7093 26.6233 13.8556C26.5583 14.0018 26.4634 14.1329 26.3446 14.2402L16.8554 23.471C16.7408 23.5882 16.6039 23.6813 16.4528 23.7449C16.3016 23.8085 16.1393 23.8413 15.9754 23.8413C15.8114 23.8413 15.6491 23.8085 15.498 23.7449C15.3469 23.6813 15.21 23.5882 15.0954 23.471L5.66769 14.2402C5.54894 14.1329 5.45401 14.0018 5.38904 13.8556C5.32407 13.7093 5.29051 13.551 5.29051 13.391C5.29051 13.2309 5.32407 13.0726 5.38904 12.9263C5.45401 12.7801 5.54894 12.649 5.66769 12.5417L7.38461 10.8494C7.49924 10.7322 7.63613 10.639 7.78724 10.5755C7.93836 10.5119 8.10066 10.4791 8.26461 10.4791C8.42857 10.4791 8.59087 10.5119 8.74198 10.5755C8.8931 10.639 9.02999 10.7322 9.14461 10.8494L12.0985 13.7356C12.2096 13.852 12.3533 13.9322 12.5108 13.9656C12.6682 13.9991 12.8321 13.9842 12.981 13.9231C13.1299 13.8619 13.2568 13.7573 13.3453 13.6228C13.4338 13.4884 13.4797 13.3304 13.4769 13.1694V2.46173C13.5052 2.13428 13.6522 1.82846 13.8902 1.60179C14.1282 1.37513 14.4408 1.24324 14.7692 1.23096H17.2308Z" fill="currentColor"/>
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
