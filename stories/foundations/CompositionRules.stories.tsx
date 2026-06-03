import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Stilo/Foundations/Composition Rules',
  parameters: {
    docs: {
      description: {
        component: `
# Composition Rules

These rules govern how Stilo components compose. Themed extensions (e.g. CakeUI) must follow them. Violating them breaks the outside-in contract.

---

## 1 — Outside-in only

Stilo has no knowledge of anything that extends it. CakeUI depends on Stilo, not the other way around. Stilo never imports from CakeUI or any themed layer.

---

## 2 — Structural before visual

Every structural decision (what props exist, what state is managed, what slots are defined) is made in Stilo first. CakeUI applies colours, typography, and spacing to the structure Stilo defines — it does not add new structural behaviour.

---

## 3 — Slots, not children

Components expose named slot props (\`header\`, \`sidebar\`, \`actions\`, etc.) rather than accepting arbitrary \`children\`. This makes composition contracts explicit and enforceable.

---

## 4 — Hooks own state, components own rendering

Interaction state (hover, focus, open/close, selection) lives in a \`use{Name}\` hook exported from Stilo. The themed component in CakeUI calls the hook and applies visual tokens to the returned state. State logic is never duplicated in the themed layer.

---

## 5 — Props flow down, events flow up

Stilo defines the direction of data flow for every component. Parent components pass configuration via props. Child components signal changes via callback props. No shared mutable state across levels.

---

## 6 — Passive before active

Components render correctly with no event handlers attached (passive mode). Interaction is layered on top. This means a CakeUI component always has a valid default render even if no callbacks are provided.
        `.trim(),
      },
    },
  },
};
export default meta;

export const Rules = {
  render: () => (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640 }}>
      {[
        { n: '1', title: 'Outside-in only', body: 'Stilo → CakeUI. Never CakeUI → Stilo.' },
        { n: '2', title: 'Structural before visual', body: 'Props, state, and slots are defined in Stilo. Colours and fonts are applied in CakeUI.' },
        { n: '3', title: 'Slots, not children', body: 'Named slot props make composition contracts explicit.' },
        { n: '4', title: 'Hooks own state', body: 'use{Name} hooks live in Stilo. CakeUI calls them and applies visual tokens.' },
        { n: '5', title: 'Props down, events up', body: 'Configuration flows via props. Changes flow via callbacks.' },
        { n: '6', title: 'Passive before active', body: 'Every component renders correctly with no callbacks attached.' },
      ].map(({ n, title, body }) => (
        <div key={n} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{n}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>{title}</div>
            <div style={{ fontSize: 13, color: '#555', marginTop: 4 }}>{body}</div>
          </div>
        </div>
      ))}
    </div>
  ),
};
