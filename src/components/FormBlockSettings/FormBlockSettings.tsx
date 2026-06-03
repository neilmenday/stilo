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

// CSS custom properties with neutral defaults — extensions override these via a wrapper.
// --form-row-border         : border-bottom on each row
// --form-row-padding        : paddingBlock on each row
// --form-row-gap            : gap between label column and fields column
// --form-row-field-gap      : gap between two fields in a row
// --form-row-title-size     : font-size for row title
// --form-row-title-weight   : font-weight for row title
// --form-row-title-color    : color for row title
// --form-row-desc-color     : color for row description
// --form-block-title-size   : font-size for section title
// --form-block-title-weight : font-weight for section title
// --form-block-title-color  : color for section title
// --form-block-gap          : gap between section title and rows

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
      style={{
        display:       'flex',
        alignItems:    'flex-start',
        gap:           'var(--form-row-gap, 16px)',
        paddingBlock:  'var(--form-row-padding, 12px)',
        borderBottom:  isLast ? 'none' : 'var(--form-row-border, 1px solid #e0e0e0)',
      }}
    >
      <div data-stilo="form-block-row-label" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{
          fontSize:   'var(--form-row-title-size, 15px)',
          fontWeight: 'var(--form-row-title-weight, 600)' as React.CSSProperties['fontWeight'],
          color:      'var(--form-row-title-color, #111)',
          lineHeight: 1.5,
        }}>
          {row.title}
        </span>
        {showDescriptions && row.description && (
          <span style={{
            fontSize:   'var(--form-row-desc-size, 13px)',
            fontWeight: 400,
            color:      'var(--form-row-desc-color, #555)',
            lineHeight: 1.5,
          }}>
            {row.description}
          </span>
        )}
      </div>
      <div data-stilo="form-block-row-fields" style={{ display: 'flex', alignItems: 'center', gap: 'var(--form-row-field-gap, 12px)', flexShrink: 0 }}>
        {renderField({ field: row.fields[0], inactive: false,            toggleChecked: toggleStates[0], onToggleChange: v => setToggle(0, v), onActivate: () => setPrimaryHasValue(true) })}
        {hasTwo && renderField({ field: (row.fields as [FormBlockFieldDef, FormBlockFieldDef])[1], inactive: !primaryHasValue, toggleChecked: toggleStates[1], onToggleChange: v => setToggle(1, v), onActivate: () => {} })}
      </div>
    </div>
  );
}

export function FormBlockSettings({ title, rows, showDescriptions = true, renderField }: FormBlockSettingsStructureProps) {
  return (
    <div data-stilo="form-block-settings" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--form-block-gap, 12px)' }}>
      {title && (
        <span style={{
          fontSize:   'var(--form-block-title-size, 16px)',
          fontWeight: 'var(--form-block-title-weight, 700)' as React.CSSProperties['fontWeight'],
          color:      'var(--form-block-title-color, #111)',
        }}>
          {title}
        </span>
      )}
      <div>
        {rows.map((row, i) => (
          <FormBlockRow key={i} row={row} isLast={i === rows.length - 1} showDescriptions={showDescriptions} renderField={renderField} />
        ))}
      </div>
    </div>
  );
}
