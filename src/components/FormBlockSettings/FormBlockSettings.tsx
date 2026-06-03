import React from 'react';
import { useFormBlockRow } from './useFormBlockRow';
import type { FormBlockSettingsProps, FormBlockFieldDef } from './types';

export interface FormBlockFieldSlotProps {
  field:           FormBlockFieldDef;
  inactive:        boolean;
  toggleChecked:   boolean;
  onToggleChange:  (v: boolean) => void;
  onActivate:      () => void;
}

export interface FormBlockSettingsStructureProps extends FormBlockSettingsProps {
  /** Extension renders each form field. Receives the field definition and activation state. */
  renderField: (props: FormBlockFieldSlotProps) => React.ReactElement | null;
}

function FormBlockRow({
  row,
  isLast,
  showDescriptions,
  renderField,
}: {
  row: FormBlockSettingsProps['rows'][number];
  isLast: boolean;
  showDescriptions: boolean;
  renderField: FormBlockSettingsStructureProps['renderField'];
}) {
  const { primaryHasValue, setPrimaryHasValue, toggleStates, setToggle } = useFormBlockRow();
  const hasTwo = row.fields.length === 2;

  return (
    <div
      data-stilo="form-block-row"
      data-last={isLast || undefined}
      style={{ display: 'flex', alignItems: 'flex-start' }}
    >
      <div data-stilo="form-block-row-label" style={{ flex: 1 }}>
        <span data-stilo="form-block-row-title">{row.title}</span>
        {showDescriptions && row.description && (
          <span data-stilo="form-block-row-description">{row.description}</span>
        )}
      </div>
      <div data-stilo="form-block-row-fields" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        {renderField({
          field:          row.fields[0],
          inactive:       false,
          toggleChecked:  toggleStates[0],
          onToggleChange: v => setToggle(0, v),
          onActivate:     () => setPrimaryHasValue(true),
        })}
        {hasTwo && renderField({
          field:          (row.fields as [FormBlockFieldDef, FormBlockFieldDef])[1],
          inactive:       !primaryHasValue,
          toggleChecked:  toggleStates[1],
          onToggleChange: v => setToggle(1, v),
          onActivate:     () => {},
        })}
      </div>
    </div>
  );
}

export function FormBlockSettings({
  title,
  rows,
  showDescriptions = true,
  renderField,
}: FormBlockSettingsStructureProps) {
  return (
    <div data-stilo="form-block-settings">
      {title && <span data-stilo="form-block-settings-title">{title}</span>}
      <div data-stilo="form-block-settings-rows">
        {rows.map((row, i) => (
          <FormBlockRow
            key={i}
            row={row}
            isLast={i === rows.length - 1}
            showDescriptions={showDescriptions}
            renderField={renderField}
          />
        ))}
      </div>
    </div>
  );
}
