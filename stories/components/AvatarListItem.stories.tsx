import type { Meta, StoryObj } from '@storybook/react';
import { useAvatarListItem } from '../../src/components/AvatarListItem';
import type { AvatarListItemProps } from '../../src/components/AvatarListItem';
// Real nested composition, not hand-rolled approximations - Stilo has no
// separate importable production Avatar/Pill component (structural
// skeleton only), so the real place their real rendering exists is each
// one's own demo function, exported from its own story file for exactly
// this: genuine cross-component composition within Stilo itself.
import { AvatarDemo } from './Avatar.stories';
import { PillDemo } from './Pill.stories';
import { ButtonDemo } from './Button.stories';

function AvatarListItemDemo({
  name = 'Neil Menday',
  avatarInitials = 'NM',
  status = 'active',
  onLabel = 'Active',
  offLabel = 'Inactive',
  showStatus = true,
  showIdentifierIcon = false,
  identifierActive = false,
  onNameClick,
}: AvatarListItemProps) {
  const { iconVisible, nameHoverProps, handleNameClick } = useAvatarListItem({
    identifierActive,
    showIdentifierIcon,
    onNameClick,
  });
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: 'system-ui, sans-serif', padding: '8px 12px',
      border: '1px solid #e0e0e0', borderRadius: 4, width: 280,
    }}>
      <AvatarDemo variant="initials" initials={avatarInitials} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }} {...nameHoverProps}>
        <ButtonDemo variant="text" label={name} onClick={handleNameClick} />
        {showIdentifierIcon && iconVisible && (
          <span style={{ marginLeft: 4, fontSize: 11 }}>→</span>
        )}
      </div>
      {showStatus && (
        <PillDemo
          variant={status === 'active' ? 'Indicator - Good' : 'Default'}
          label={status === 'active' ? onLabel : offLabel}
        />
      )}
    </div>
  );
}

const meta: Meta<typeof AvatarListItemDemo> = {
  title: 'Stilo/Components - Passive/AvatarListItem',
  component: AvatarListItemDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AvatarListItemDemo>;

export const Default: Story = {
  args: {
    name: 'Neil Menday',
    avatarInitials: 'NM',
    status: 'active',
    onLabel: 'Active',
    offLabel: 'Inactive',
    showStatus: true,
    showIdentifierIcon: false,
    identifierActive: false,
  },
};
