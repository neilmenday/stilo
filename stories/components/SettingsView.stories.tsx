import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useSettingsView } from '../../src/components/SettingsView';
import { FormBlockSettings } from '../../src/components/FormBlockSettings/FormBlockSettings';
import { FormBlockInput } from '../../src/components/FormBlockInput/FormBlockInput';
import { FormBlockExpandable } from '../../src/components/FormBlockExpandable/FormBlockExpandable';
import type { SettingsViewProps, FormBlockElement } from '../../src/components/SettingsView';
import type { FormBlockFieldSlotProps } from '../../src/components/FormBlockSettings/FormBlockSettings';

// Neutral field renderer for stilo stories — no CakeUI components
function NeutralField({ field, inactive }: FormBlockFieldSlotProps) {
  if (field.type === 'toggle') {
    return (
      <label style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: inactive ? 0.4 : 1 }}>
        <input type="checkbox" disabled={inactive} />
        <span style={{ fontSize: 13, fontFamily: 'system-ui', color: '#111' }}>{field.label}</span>
      </label>
    );
  }
  if (field.type === 'textfield') {
    return <input type="text" placeholder={field.placeholder ?? 'Enter'} disabled={inactive} style={{ fontSize: 13, fontFamily: 'system-ui', padding: '4px 8px', border: '1px solid #ccc', borderRadius: 4, opacity: inactive ? 0.4 : 1 }} />;
  }
  return (
    <select disabled={inactive} style={{ fontSize: 13, fontFamily: 'system-ui', padding: '4px 8px', border: '1px solid #ccc', borderRadius: 4, opacity: inactive ? 0.4 : 1 }}>
      {(field.items ?? []).map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
    </select>
  );
}

function SettingsViewDemo(props: SettingsViewProps) {
  const { activeNavItem, handleNavChange } = useSettingsView({
    navItems: props.navItems,
    activeNavItem: props.activeNavItem,
    onNavChange: props.onNavChange,
  });

  const blocks: FormBlockElement[] = [
    <FormBlockSettings
      key="general"
      title="General"
      showDescriptions
      rows={[
        { title: 'Timezone', description: 'Used for scheduling and reporting.', fields: [{ type: 'combobox', label: 'Timezone', items: [{ value: 'utc', label: 'UTC' }, { value: 'london', label: 'Europe / London' }] }] },
        { title: 'Language', fields: [{ type: 'combobox', label: 'Language', items: [{ value: 'en', label: 'English' }, { value: 'fr', label: 'French' }] }] },
        { title: 'Notifications', description: 'Send email when records are assigned.', fields: [{ type: 'toggle', label: 'Email notifications' }] },
      ]}
      renderField={props => <NeutralField {...props} />}
    />,
    <FormBlockInput
      key="name"
      nameField={<input type="text" placeholder="Name" style={{ width: '100%', fontSize: 13, fontFamily: 'system-ui', padding: '4px 8px', border: '1px solid #ccc', borderRadius: 4 }} />}
      descriptionField={<textarea placeholder="Description" rows={3} style={{ width: '100%', fontSize: 13, fontFamily: 'system-ui', padding: '4px 8px', border: '1px solid #ccc', borderRadius: 4 }} />}
    />,
    <FormBlockExpandable key="advanced" title="Advanced options" defaultOpen={false}>
      <p style={{ fontSize: 13, fontFamily: 'system-ui', color: '#555', margin: 0 }}>Advanced settings go here.</p>
    </FormBlockExpandable>,
  ];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24, display: 'flex', gap: 24 }}>
      {/* Nav */}
      <nav style={{ width: 160, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {(props.navItems ?? ['General', 'Team']).map(item => (
          <button
            key={item}
            onClick={() => handleNavChange(item)}
            style={{ textAlign: 'left', padding: '6px 10px', fontSize: 13, fontFamily: 'system-ui', border: 'none', borderRadius: 4, cursor: 'pointer', background: activeNavItem === item ? '#e0e0e0' : 'transparent', fontWeight: activeNavItem === item ? 700 : 400, color: '#111' }}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* FormBlocks as structural children */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {blocks}
      </div>
    </div>
  );
}

const meta: Meta<typeof SettingsViewDemo> = {
  title: 'Stilo/Views/SettingsView',
  component: SettingsViewDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
SettingsView is a layout shell whose children are FormBlock elements.
\`children\` is typed as \`FormBlockElement | FormBlockElement[]\` — the composition
contract is enforced structurally. Extensions render the FormBlocks with their
own visual tokens; the structural relationship is defined here in Stilo.

**Accepted children:**
- \`<FormBlockSettings>\` — titled section with labelled rows and form field slots
- \`<FormBlockInput>\` — primary name + description text entry
- \`<FormBlockExpandable>\` — collapsible section wrapping any FormBlock content
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SettingsViewDemo>;

export const WithFormBlocks: Story = {
  name: 'SettingsView with FormBlocks',
  args: {
    title: 'Settings',
    navItems: ['General', 'Team', 'Notifications'],
    activeNavItem: 'General',
    isDirty: false,
  },
};
