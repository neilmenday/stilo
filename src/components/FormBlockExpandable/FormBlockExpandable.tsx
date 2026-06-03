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

function DefaultHeader({ title, isOpen, onToggle }: FormBlockExpandableHeaderProps) {
  return (
    <button
      onClick={onToggle}
      style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', width: '100%', textAlign: 'left' }}
    >
      <span style={{ flex: 1, fontFamily: 'system-ui, sans-serif', fontSize: 14, fontWeight: 600, color: '#111' }}>{title}</span>
      <span style={{ fontSize: 11, color: '#555' }}>{isOpen ? '▲' : '▼'}</span>
    </button>
  );
}

export interface FormBlockExpandableStructureProps extends FormBlockExpandableProps {
  /** Extension renders the header (title, toggle control, pill, dotmenu).
   *  Defaults to a neutral header if not provided. */
  renderHeader?: (props: FormBlockExpandableHeaderProps) => React.ReactElement;
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
  renderHeader = DefaultHeader,
}: FormBlockExpandableStructureProps) {
  const { isOpen, toggle } = useExpandableBox({ variant, defaultOpen, onChange });

  return (
    <div data-stilo="form-block-expandable" data-open={isOpen || undefined}>
      {renderHeader({ title, isOpen, onToggle: toggle, showPill, pillLabel, showDotmenu })}
      {isOpen && (
        <div data-stilo="form-block-expandable-content">
          {children}
        </div>
      )}
    </div>
  );
}
