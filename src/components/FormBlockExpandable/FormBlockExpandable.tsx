import React from 'react';
import type { FormBlockExpandableProps } from './types';

export function FormBlockExpandable({
  title       = 'Section',
  variant     = 'default',
  defaultOpen = false,
  showPill    = false,
  pillLabel,
  showDotmenu = false,
  children,
  onChange,
}: FormBlockExpandableProps) {
  return (
    <div
      data-stilo="form-block-expandable"
      data-variant={variant}
      data-default-open={defaultOpen || undefined}
    >
      <div data-stilo="form-block-expandable-header">
        <span data-stilo="form-block-expandable-title">{title}</span>
        {showPill && pillLabel && (
          <span data-stilo="form-block-expandable-pill">{pillLabel}</span>
        )}
        {showDotmenu && <span data-stilo="form-block-expandable-dotmenu" />}
      </div>
      <div data-stilo="form-block-expandable-content">
        {children}
      </div>
    </div>
  );
}
