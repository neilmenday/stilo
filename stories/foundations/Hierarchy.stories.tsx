import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Stilo/Foundations/Hierarchy',
  parameters: {
    docs: {
      description: {
        component: `
# Component Hierarchy

Stilo defines a strict five-level composition hierarchy. Every component belongs to exactly one level. Higher levels may only compose from the levels below them — never the reverse.

\`\`\`
Primitive → Component → Component Set → View
\`\`\`

---

## Primitive

Raw, unstyled structural elements. No visual opinion. Examples: a focusable container, a drag handle slot, a disclosure trigger.

Primitives carry:
- Accessibility roles and ARIA attributes
- Keyboard and pointer interaction contracts
- Focus management

Primitives do **not** carry: colours, typography, spacing, icons.

---

## Component

A single, self-contained structural unit. Wraps one or more primitives and adds:
- A defined props interface
- Interaction state management (hover, focus, open/close, checked, selected)
- Slot contracts (named areas where a themed layer applies visual content)

Examples: Button, TextField, Combobox, ListItem, Checkbox.

---

## Component Set

Two or more Components composed under a shared data or layout contract. Adds:
- A coordinating props interface
- Cross-component state (e.g. which row is selected across a table)
- A data schema components within the set depend on

Examples: ActionsSet, FormBlockSettings, InfoListSet, TableSet.

---

## View

A full-surface layout shell. Composes Component Sets and Components into a named page structure. Adds:
- A navigation contract (which sidebar items are active)
- A layout contract (where the header, nav, content, and footer regions are)
- No additional interaction state beyond what it delegates

Examples: ListView, SettingsView, MiscView, GridView.

---

## Rules

1. A View must not implement interaction logic — it delegates to Components and Component Sets inside it.
2. A Component Set must not define its own layout shell — it nests inside a View.
3. A Component must not import from a Component Set or View.
4. A Primitive must not import from any level above itself.
5. CakeUI (or any themed extension of Stilo) applies the visual layer at each level but does not redefine the structural hierarchy.
        `.trim(),
      },
    },
  },
};
export default meta;

export const HierarchyDiagram = {
  render: () => (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, lineHeight: 1.6 }}>
      {[
        { level: 'View', desc: 'Full-surface layout shells. Composes Component Sets and Components.', example: 'ListView, SettingsView, GridView' },
        { level: 'Component Set', desc: 'Multiple Components under a shared data contract.', example: 'ActionsSet, TableSet, InfoListSet' },
        { level: 'Component', desc: 'Single unit with props interface and interaction state.', example: 'Button, TextField, ListItem' },
        { level: 'Primitive', desc: 'Unstyled structural element with accessibility contract.', example: 'Focusable container, drag handle slot' },
      ].map(({ level, desc, example }, i, arr) => (
        <div key={level} style={{ display: 'flex', gap: 16, marginBottom: i < arr.length - 1 ? 0 : undefined }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 2 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#111', flexShrink: 0, marginTop: 6 }} />
            {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: '#e0e0e0', minHeight: 32 }} />}
          </div>
          <div style={{ paddingBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>{level}</div>
            <div style={{ fontSize: 13, color: '#555', marginTop: 2 }}>{desc}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 4, fontStyle: 'italic' }}>{example}</div>
          </div>
        </div>
      ))}
    </div>
  ),
};
