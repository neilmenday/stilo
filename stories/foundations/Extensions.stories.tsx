import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Stilo/Foundations/Extensions',
  parameters: {
    docs: {
      description: {
        component: `
# Extending Stilo

Stilo is the structural foundation. A themed UI system extends it by applying a visual layer — colours, typography, iconography, motion — on top of the structural primitives and hooks Stilo defines.

---

## What an extension provides

| Layer | Owned by Stilo | Owned by the extension |
|-------|---------------|----------------------|
| Props interface | ✓ | — |
| Interaction hooks | ✓ | — |
| Slot contracts | ✓ | — |
| Composition rules | ✓ | — |
| Colours | — | ✓ |
| Typography | — | ✓ |
| Spacing values | Tokens defined here | Extension maps them to theme values |
| Icons | — | ✓ |
| Motion / transitions | — | ✓ |
| Brand | — | ✓ |

---

## How to build an extension

1. Add \`@neilmenday/stilo\` as a dependency.
2. For each Stilo component, create a themed wrapper that:
   - Imports the props interface and hook from Stilo
   - Calls the hook to get interaction state
   - Renders JSX using your visual tokens applied to the state
3. Re-export the Stilo types for consumer backward compatibility.
4. Never define new structural behaviour in the themed layer — open a Stilo PR instead.

---

## Extension contract

An extension must not:
- Redefine props that Stilo already defines for a component
- Add \`useState\` for state that Stilo's hook already manages
- Import from another extension (cross-extension dependencies break the outside-in rule)
- Reference Stilo internals beyond its public exports

An extension should:
- Re-export all Stilo types it consumes so its own consumers do not need to depend on Stilo directly
- Apply its visual layer only through the slots and state values Stilo returns
- Document which Stilo version it targets
        `.trim(),
      },
    },
  },
};
export default meta;

export const ExtensionContract = {
  render: () => (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 600 }}>
      <div style={{ padding: 20, background: '#f5f5f5', borderRadius: 8, marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: '#555', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Dependency direction</div>
        {[
          { name: 'Your App', color: '#e0e0e0', text: '#111' },
          { name: 'CakeUI (or any extension)', color: '#ccc', text: '#111' },
          { name: 'Stilo', color: '#111', text: '#fff' },
        ].map(({ name, color, text }, i) => (
          <div key={name}>
            <div style={{ padding: '10px 16px', background: color, color: text, borderRadius: 4, fontSize: 13, fontWeight: 600 }}>{name}</div>
            {i < 2 && <div style={{ display: 'flex', justifyContent: 'center', color: '#888', fontSize: 16, lineHeight: '20px' }}>↓</div>}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 13, color: '#555', lineHeight: 1.7 }}>
        Stilo has no knowledge of CakeUI or your app. The arrow is always downward. This ensures Stilo stays generic and any themed system built on it remains independently deployable.
      </div>
    </div>
  ),
};
