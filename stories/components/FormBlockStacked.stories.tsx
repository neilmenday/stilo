import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormBlockStacked } from '../../src/components/FormBlockStacked';

const meta: Meta<typeof FormBlockStacked> = {
  title: 'Stilo/Views/SettingsView/FormBlockStacked',
  component: FormBlockStacked,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A structural layout shell that stacks any number of form-related components vertically with consistent spacing.

Use when a settings surface needs a free-form vertical arrangement of fields rather than the labelled-row layout of \`FormBlockSettings\`.

**CSS custom properties (extension overrides):**
- \`--form-stacked-gap\` — gap between children (default: 16px)
- \`--form-stacked-title-size\` — section title font-size (default: 16px)
- \`--form-stacked-title-weight\` — section title font-weight (default: 600)
- \`--form-stacked-title-color\` — section title colour (default: #111)
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof FormBlockStacked>;

const NeutralInput = ({ label }: { label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, fontFamily: 'system-ui', color: '#555' }}>{label}</label>
    <input type="text" style={{ padding: '6px 10px', border: '1px solid #ccc', borderRadius: 4, fontSize: 13, fontFamily: 'system-ui' }} />
  </div>
);

export const Default: Story = {
  args: { title: 'Contact details' },
  render: args => (
    <FormBlockStacked {...args}>
      <NeutralInput label="First name" />
      <NeutralInput label="Last name" />
      <NeutralInput label="Email address" />
    </FormBlockStacked>
  ),
};

export const NoTitle: Story = {
  render: () => (
    <FormBlockStacked>
      <NeutralInput label="Username" />
      <NeutralInput label="Password" />
    </FormBlockStacked>
  ),
};
