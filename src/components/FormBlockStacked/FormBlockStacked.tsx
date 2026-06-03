import React from 'react';

export interface FormBlockStackedProps {
  title?: string;
  children: React.ReactNode;
}

// --form-stacked-gap         : gap between stacked children
// --form-stacked-title-size  : font-size for section title
// --form-stacked-title-weight: font-weight for section title
// --form-stacked-title-color : color for section title

export function FormBlockStacked({ title, children }: FormBlockStackedProps) {
  return (
    <div data-stilo="form-block-stacked">
      {title && (
        <span
          data-stilo="form-block-stacked-title"
          style={{
            display:    'block',
            fontSize:   'var(--form-stacked-title-size, 16px)',
            fontWeight: 'var(--form-stacked-title-weight, 600)' as React.CSSProperties['fontWeight'],
            color:      'var(--form-stacked-title-color, #111)',
          }}
        >
          {title}
        </span>
      )}
      <div
        data-stilo="form-block-stacked-items"
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--form-stacked-gap, 16px)' }}
      >
        {children}
      </div>
    </div>
  );
}
