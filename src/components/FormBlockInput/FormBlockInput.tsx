import React from 'react';

export interface FormBlockInputStructureProps {
  /** Slot for the primary text input (e.g. a name field). Extension provides the rendered component. */
  nameField: React.ReactElement;
  /** Slot for the secondary text area (e.g. a description field). Extension provides the rendered component. */
  descriptionField: React.ReactElement;
  /** Optional slot for a notification/alert. Extension provides the rendered component. */
  notification?: React.ReactElement;
}

export function FormBlockInput({ nameField, descriptionField, notification }: FormBlockInputStructureProps) {
  return (
    <div data-stilo="form-block-input" style={{ display: 'flex', flexDirection: 'column' }}>
      <div data-stilo="form-block-input-name">{nameField}</div>
      <div data-stilo="form-block-input-description">{descriptionField}</div>
      {notification && (
        <div data-stilo="form-block-input-notification">{notification}</div>
      )}
    </div>
  );
}
