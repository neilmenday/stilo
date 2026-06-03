import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useCodeTextarea } from '../../src/components/CodeTextarea';
import type { CodeTextareaProps } from '../../src/components/CodeTextarea';
import { CODE_LINE_H, CODE_PAD_V, CODE_PAD_H } from '../../src/components/CodeTextarea';

function CodeTextareaDemo({
  value: valueProp = 'function hello() {\n  return "world";\n}\n\nconsole.log(hello());',
  placeholder = 'Enter code...',
  rows = 8,
  disabled = false,
  readOnly = false,
  showCopy = true,
}: CodeTextareaProps) {
  const [value, setValue] = useState(valueProp ?? '');
  const { focused, hovered, copied, textareaRef, handleScroll, handleCopy, hoverProps, focusProps } =
    useCodeTextarea({ value });

  const lineCount = value.split('\n').length;

  return (
    <div
      style={{
        position: 'relative', width: 440, fontFamily: 'monospace', fontSize: 13,
        border: `1px solid ${focused ? '#0066cc' : hovered ? '#ccc' : '#e0e0e0'}`,
        borderRadius: 4, background: '#fff', overflow: 'hidden',
      }}
      {...hoverProps}
    >
      {showCopy && (
        <button
          onClick={handleCopy}
          style={{
            position: 'absolute', top: 8, right: 8,
            fontSize: 11, padding: '3px 8px', border: '1px solid #e0e0e0',
            borderRadius: 3, background: '#f5f5f5', cursor: 'pointer', color: '#555', zIndex: 1,
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      )}
      <div style={{ display: 'flex' }}>
        <div style={{
          padding: `${CODE_PAD_V}px 8px`,
          background: '#f5f5f5', borderRight: '1px solid #e0e0e0',
          color: '#ccc', fontSize: 12, lineHeight: `${CODE_LINE_H}px`,
          userSelect: 'none', minWidth: 32, textAlign: 'right',
        }}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onScroll={handleScroll}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          readOnly={readOnly}
          {...focusProps}
          style={{
            flex: 1, border: 'none', outline: 'none', resize: 'none',
            padding: `${CODE_PAD_V}px ${CODE_PAD_H}px`,
            fontFamily: 'monospace', fontSize: 13, lineHeight: `${CODE_LINE_H}px`,
            color: '#111', background: 'transparent',
          }}
        />
      </div>
    </div>
  );
}

const meta: Meta<typeof CodeTextareaDemo> = {
  title: 'Stilo/Components/CodeTextarea',
  component: CodeTextareaDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof CodeTextareaDemo>;

export const Default: Story = {
  args: {
    value: 'function hello() {\n  return "world";\n}\n\nconsole.log(hello());',
    rows: 8,
    showCopy: true,
    disabled: false,
    readOnly: false,
  },
};
