import { useState } from 'react';
import type { KeyboardEvent } from 'react';

// Tag-mode Textarea behaviour: the text being typed, which tag (if any) is
// focused, and the keys that add, cycle through and remove tags.
// - Enter / comma: add the typed text as a tag (ignoring blanks and duplicates)
// - Left / right (with nothing typed): move the focus through the tags; right
//   past the last tag goes back to typing
// - Backspace with nothing typed: focus the last tag; with a tag focused,
//   Backspace / Delete removes it
export function useTagTextarea(tags: string[], onTagsChange?: (tags: string[]) => void) {
  const [text, setText] = useState('');
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (tag && !tags.includes(tag)) onTagsChange?.([...tags, tag]);
    setText('');
  };

  const removeTag = (index: number) => {
    onTagsChange?.(tags.filter((_, i) => i !== index));
    setFocusedIndex(tags.length > 1 ? Math.max(0, index - 1) : null);
  };

  const onTextChange = (value: string) => {
    setFocusedIndex(null);
    if (value.endsWith(',')) addTag(value.slice(0, -1));
    else setText(value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const empty = text.length === 0;
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(text);
    } else if (focusedIndex !== null && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault();
      removeTag(focusedIndex);
    } else if (empty && e.key === 'Backspace' && tags.length > 0) {
      e.preventDefault();
      setFocusedIndex(tags.length - 1);
    } else if (empty && e.key === 'ArrowLeft' && tags.length > 0) {
      e.preventDefault();
      setFocusedIndex(i => (i === null ? tags.length - 1 : Math.max(0, i - 1)));
    } else if (empty && e.key === 'ArrowRight' && focusedIndex !== null) {
      e.preventDefault();
      setFocusedIndex(i => (i === null || i >= tags.length - 1 ? null : i + 1));
    } else if (e.key === 'Escape') {
      setFocusedIndex(null);
    }
  };

  return { text, focusedIndex, setFocusedIndex, onTextChange, onKeyDown, removeTag };
}
