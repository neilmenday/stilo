import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useSettingsView } from '../../src/components/SettingsView';
import { FormBlockSettings } from '../../src/components/FormBlockSettings/FormBlockSettings';
import { FormBlockInput } from '../../src/components/FormBlockInput/FormBlockInput';
import { FormBlockExpandable } from '../../src/components/FormBlockExpandable/FormBlockExpandable';
import { FormBlockStacked } from '../../src/components/FormBlockStacked/FormBlockStacked';
import type { FormBlockFieldSlotProps } from '../../src/components/FormBlockSettings/FormBlockSettings';

type FormBlockType = 'Settings' | 'Input' | 'Expandable' | 'Stacked';

// ─── Neutral field renderer ───────────────────────────────────────────────────
function NeutralField({ field, inactive }: FormBlockFieldSlotProps) {
  const [on, setOn] = useState(false);
  if (field.type === 'toggle') return (
    <div onClick={() => !inactive && setOn(v => !v)} style={{ width: 36, height: 20, borderRadius: 10, background: on ? '#111' : '#ccc', position: 'relative', cursor: inactive ? 'default' : 'pointer', opacity: inactive ? 0.4 : 1, flexShrink: 0, transition: 'background 0.15s' }}>
      <div style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.15s' }} />
    </div>
  );
  if (field.type === 'combobox') return (
    <select disabled={inactive} style={{ fontSize: 12, padding: '5px 8px', border: '1px solid #e0e0e0', borderRadius: 4, color: '#111', opacity: inactive ? 0.4 : 1 }}>
      {(field.items ?? []).map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
    </select>
  );
  return <input type="text" placeholder={field.placeholder ?? 'Enter'} disabled={inactive} style={{ fontSize: 12, padding: '5px 8px', border: '1px solid #e0e0e0', borderRadius: 4, opacity: inactive ? 0.4 : 1 }} />;
}

function NeutralInput({ label, multiline }: { label: string; multiline?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 12, fontFamily: 'system-ui', color: '#555' }}>{label}</label>
      {multiline
        ? <textarea rows={3} style={{ width: '100%', padding: '6px 10px', border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 13, fontFamily: 'system-ui', resize: 'vertical', boxSizing: 'border-box' }} />
        : <input type="text" style={{ width: '100%', padding: '6px 10px', border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 13, fontFamily: 'system-ui', boxSizing: 'border-box' }} />
      }
    </div>
  );
}

// ─── FormBlock switcher ───────────────────────────────────────────────────────
function ActiveFormBlock({ type }: { type: FormBlockType }) {
  if (type === 'Settings') return (
    <FormBlockSettings
      title="Preferences"
      showDescriptions
      rows={[
        { title: 'Timezone', description: 'Used for scheduling and reporting.', fields: [{ type: 'combobox', items: [{ value: 'utc', label: 'UTC' }, { value: 'eu', label: 'Europe / London' }] }] },
        { title: 'Notifications', description: 'Receive email when records are assigned.', fields: [{ type: 'toggle', label: 'Email' }] },
        { title: 'Report frequency', fields: [{ type: 'combobox', items: [{ value: 'daily', label: 'Daily' }, { value: 'weekly', label: 'Weekly' }] }, { type: 'combobox', items: [{ value: 'email', label: 'Email' }, { value: 'slack', label: 'Slack' }] }] },
      ]}
      renderField={props => <NeutralField {...props} />}
    />
  );
  if (type === 'Input') return (
    <FormBlockInput
      nameField={<NeutralInput label="Name" />}
      descriptionField={<NeutralInput label="Description" multiline />}
      notification={<div style={{ fontSize: 12, padding: '8px 12px', background: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: 4, color: '#555' }}>Changes take effect on next login.</div>}
    />
  );
  if (type === 'Expandable') return (
    <FormBlockExpandable title="Advanced options" defaultOpen showPill pillLabel="3">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
        <NeutralInput label="Custom domain" />
        <NeutralInput label="Webhook URL" />
      </div>
    </FormBlockExpandable>
  );
  return (
    <FormBlockStacked title="Contact details">
      <NeutralInput label="First name" />
      <NeutralInput label="Last name" />
      <NeutralInput label="Email address" />
    </FormBlockStacked>
  );
}

// ─── SettingsView demo ────────────────────────────────────────────────────────
interface SettingsViewDemoProps {
  title: string;
  navItems: string[];
  activeNavItem: string;
  formBlockType: FormBlockType;
}

function SettingsViewDemo({ title, navItems, activeNavItem: initialActive, formBlockType }: SettingsViewDemoProps) {
  const { activeNavItem, handleNavChange } = useSettingsView({ navItems, activeNavItem: initialActive });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', display: 'flex', minHeight: 400 }}>
      <nav style={{ width: 160, borderRight: '1px solid #e0e0e0', padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: 2, background: '#fafafa' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 1, padding: '0 8px 8px' }}>{title}</div>
        {navItems.map(item => (
          <button key={item} onClick={() => handleNavChange(item)} style={{ textAlign: 'left', padding: '6px 10px', fontSize: 13, border: 'none', borderRadius: 4, cursor: 'pointer', background: activeNavItem === item ? '#e0e0e0' : 'transparent', fontWeight: activeNavItem === item ? 700 : 400, color: '#111' }}>
            {item}
          </button>
        ))}
      </nav>
      <div style={{ flex: 1, padding: 24 }}>
        <ActiveFormBlock type={formBlockType} />
      </div>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────
const meta: Meta<typeof SettingsViewDemo> = {
  title: 'Stilo/Views/SettingsView',
  component: SettingsViewDemo,
  tags: ['autodocs'],
  argTypes: {
    formBlockType: {
      control: 'select',
      options: ['Settings', 'Input', 'Expandable', 'Stacked'] satisfies FormBlockType[],
      description: 'The FormBlock type rendered as the view\'s content',
    },
    title: { control: 'text' },
    navItems: { control: 'object' },
    activeNavItem: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof SettingsViewDemo>;

export const Playground: Story = {
  args: {
    title: 'Settings',
    navItems: ['General', 'Team', 'Notifications'],
    activeNavItem: 'General',
    formBlockType: 'Settings',
  },
};
