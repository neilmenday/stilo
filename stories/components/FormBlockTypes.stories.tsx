import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormBlockSettings } from '../../src/components/FormBlockSettings/FormBlockSettings';
import { FormBlockInput } from '../../src/components/FormBlockInput/FormBlockInput';
import { FormBlockExpandable } from '../../src/components/FormBlockExpandable/FormBlockExpandable';
import { FormBlockStacked } from '../../src/components/FormBlockStacked/FormBlockStacked';
import type { FormBlockFieldSlotProps } from '../../src/components/FormBlockSettings/FormBlockSettings';

// ─── Neutral field renderer ───────────────────────────────────────────────────
function NeutralField({ field, inactive }: FormBlockFieldSlotProps) {
  if (field.type === 'toggle') {
    const [on, setOn] = useState(false);
    return (
      <div
        onClick={() => !inactive && setOn(v => !v)}
        style={{ width: 36, height: 20, borderRadius: 10, background: on ? '#111' : '#ccc', position: 'relative', cursor: inactive ? 'not-allowed' : 'pointer', opacity: inactive ? 0.4 : 1, flexShrink: 0, transition: 'background 0.15s' }}
      >
        <div style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.15s' }} />
      </div>
    );
  }
  if (field.type === 'combobox') {
    return (
      <select disabled={inactive} style={{ fontSize: 12, padding: '5px 8px', border: '1px solid #e0e0e0', borderRadius: 4, color: '#111', opacity: inactive ? 0.4 : 1 }}>
        {(field.items ?? []).map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
      </select>
    );
  }
  return <input type="text" placeholder={field.placeholder ?? 'Enter'} disabled={inactive} style={{ fontSize: 12, padding: '5px 8px', border: '1px solid #e0e0e0', borderRadius: 4, opacity: inactive ? 0.4 : 1 }} />;
}

// ─── Neutral input ────────────────────────────────────────────────────────────
function NeutralInput({ label, multiline }: { label: string; multiline?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 12, fontFamily: 'system-ui', color: '#555' }}>{label}</label>
      {multiline
        ? <textarea rows={3} style={{ padding: '6px 10px', border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 13, fontFamily: 'system-ui', resize: 'vertical' }} />
        : <input type="text" style={{ padding: '6px 10px', border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 13, fontFamily: 'system-ui' }} />
      }
    </div>
  );
}

// ─── Shared layout wrapper ────────────────────────────────────────────────────
function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 11, fontFamily: 'system-ui', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
      <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, background: '#fff' }}>{children}</div>
    </div>
  );
}

// ─── All four types ───────────────────────────────────────────────────────────
function AllFormBlockTypes() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: 24, padding: 24, background: '#f5f5f5', minHeight: '100vh' }}>

      <Block label="FormBlockSettings — labelled rows with 1–2 fields">
        <FormBlockSettings
          title="Preferences"
          showDescriptions
          rows={[
            { title: 'Timezone', description: 'Used for scheduling and reporting.', fields: [{ type: 'combobox', items: [{ value: 'utc', label: 'UTC' }, { value: 'eu', label: 'Europe / London' }] }] },
            { title: 'Notifications', description: 'Receive email when records are assigned.', fields: [{ type: 'toggle', label: 'Email notifications' }] },
            { title: 'Report frequency', fields: [{ type: 'combobox', items: [{ value: 'daily', label: 'Daily' }, { value: 'weekly', label: 'Weekly' }] }, { type: 'combobox', items: [{ value: 'email', label: 'Email' }, { value: 'slack', label: 'Slack' }] }] },
          ]}
          renderField={props => <NeutralField {...props} />}
        />
      </Block>

      <Block label="FormBlockInput — primary name + description entry">
        <FormBlockInput
          nameField={<NeutralInput label="Name" />}
          descriptionField={<NeutralInput label="Description" multiline />}
          notification={
            <div style={{ fontSize: 12, padding: '8px 12px', background: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: 4, color: '#555' }}>
              Changes take effect on next login.
            </div>
          }
        />
      </Block>

      <Block label="FormBlockExpandable — collapsible section">
        <FormBlockExpandable title="Advanced options" defaultOpen showPill pillLabel="3">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 12 }}>
            <NeutralInput label="Custom domain" />
            <NeutralInput label="Webhook URL" />
          </div>
        </FormBlockExpandable>
      </Block>

      <Block label="FormBlockStacked — free-form vertical stack">
        <FormBlockStacked title="Contact details">
          <NeutralInput label="First name" />
          <NeutralInput label="Last name" />
          <NeutralInput label="Email address" />
        </FormBlockStacked>
      </Block>

    </div>
  );
}

const meta: Meta = {
  title: 'Stilo/Views/SettingsView/FormBlock Types',
  component: AllFormBlockTypes,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The four structural FormBlock types that compose the content of a SettingsView.

| Type | Use when |
|------|----------|
| **FormBlockSettings** | Labelled rows with 1–2 fields on the right — the standard settings pattern |
| **FormBlockInput** | A primary name field + description textarea, optionally with a notification |
| **FormBlockExpandable** | A collapsible section wrapping any other FormBlock content |
| **FormBlockStacked** | Free-form vertical stack of any form components with consistent spacing |

All four are valid children of \`SettingsView\` via the \`FormBlockElement\` union type.
        `.trim(),
      },
    },
  },
};
export default meta;

export const AllTypes: StoryObj = {
  name: 'All four types',
  render: () => <AllFormBlockTypes />,
};
