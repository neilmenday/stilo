import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconProvider, defaultIcons } from '../../src/components/Icon';
import type { IconRegistry } from '../../src/components/Icon';

const meta: Meta<typeof Icon> = {
  title: 'Stilo/Icons/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`Icon\` component resolves its glyph from the active \`IconRegistry\` via context.
Stilo ships a default set of 22 neutral icons. Extensions override individual icons
or the entire registry via \`IconProvider\`.

**Override a single icon (merge=true, the default):**
\`\`\`tsx
<IconProvider icons={{ search: size => <MySvg size={size} /> }}>
  <Icon name="search" />
</IconProvider>
\`\`\`

**Replace the entire registry (e.g. SLDS, Material, Chakra):**
\`\`\`tsx
const sldsIcons: IconRegistry = {
  search: size => <svg width={size} height={size}><use href="/utility-sprite.svg#search" /></svg>,
  // map all icon names used in your app
};
<IconProvider icons={sldsIcons} merge={false}>
  <App />
</IconProvider>
\`\`\`
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const DefaultSet: Story = {
  name: 'Default icon set',
  render: () => (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 12 }}>
        {Object.keys(defaultIcons).map(name => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 12, border: '1px solid #e0e0e0', borderRadius: 6 }}>
            <Icon name={name} size={24} />
            <span style={{ fontSize: 11, color: '#555', textAlign: 'center' }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const SingleOverride: Story = {
  name: 'Override a single icon',
  render: () => {
    const customSearch = (size: number) => (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ display: 'block' }}>
        <path d="M13 13l-3.5-3.5m0 0a5 5 0 10-7.07-7.07 5 5 0 007.07 7.07z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', display: 'flex', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#555' }}>Stilo default</span>
          <Icon name="search" size={24} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#555' }}>Extension override</span>
          <IconProvider icons={{ search: customSearch }}>
            <Icon name="search" size={24} />
          </IconProvider>
        </div>
      </div>
    );
  },
};

export const FullReplacement: Story = {
  name: 'Replace entire registry (merge=false)',
  render: () => {
    const minimalSet: IconRegistry = {
      check:  s => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" style={{ display: 'block' }}><path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      close:  s => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" style={{ display: 'block' }}><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
      search: s => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" style={{ display: 'block' }}><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="2"/><path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
    };
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif' }}>
        <p style={{ fontSize: 13, color: '#555', marginTop: 0 }}>With <code>merge=false</code> only the extension's icons exist. Unknown names render nothing.</p>
        <IconProvider icons={minimalSet} merge={false}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
            {['check', 'close', 'search', 'plus'].map(name => (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={name} size={24} />
                </div>
                <span style={{ fontSize: 11, color: name === 'plus' ? '#bbb' : '#555' }}>{name}{name === 'plus' ? ' (null)' : ''}</span>
              </div>
            ))}
          </div>
        </IconProvider>
      </div>
    );
  },
};

export const Single: Story = {
  name: 'Single icon',
  args: { name: 'search', size: 16 },
};
