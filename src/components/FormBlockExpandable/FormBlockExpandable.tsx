import React from 'react';
import { useExpandableBox } from '../ExpandableBox/useExpandableBox';
import type { FormBlockExpandableProps } from './types';

export interface FormBlockExpandableHeaderProps {
  title:       string;
  isOpen:      boolean;
  onToggle:    () => void;
  showPill:    boolean;
  pillLabel?:  string;
  showDotmenu: boolean;
}

export interface FormBlockExpandableStructureProps extends FormBlockExpandableProps {
  /** Extension renders the header (title, toggle control, pill, dotmenu). */
  renderHeader: (props: FormBlockExpandableHeaderProps) => React.ReactElement;
}

export function FormBlockExpandable({
  title       = 'Section',
  variant     = 'default',
  defaultOpen = false,
  showPill    = false,
  pillLabel,
  showDotmenu = false,
  children,
  onChange,
  renderHeader,
}: FormBlockExpandableStructureProps) {
  const { isOpen, toggle } = useExpandableBox({ variant, defaultOpen, onChange });

  return (
    <div data-stilo="form-block-expandable" data-open={isOpen || undefined}>
      {renderHeader({ title, isOpen, onToggle: toggle, showPill, pillLabel: pillLabel, showDotmenu })}
      {isOpen && (
        <div data-stilo="form-block-expandable-content">
          {children}
        </div>
      )}
    </div>
  );
}
