import type { Meta, StoryObj } from '@storybook/react';
import { useFileUpload } from '../../src/components/FileUpload';
import type { FileUploadProps } from '../../src/components/FileUpload';

function FileUploadDemo({
  variant = 'Default',
  accept = '*',
  acceptLabel = 'Any file type',
  multiple = false,
  simulateUpload = true,
}: FileUploadProps) {
  const { uploadState, filename, isDragOver, inputRef, handleInputChange, dragProps } = useFileUpload({ simulateUpload });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 360 }}>
      <div
        {...dragProps}
        style={{
          border: `2px dashed ${isDragOver ? '#0066cc' : '#e0e0e0'}`,
          borderRadius: 8, padding: '32px 24px', textAlign: 'center',
          background: isDragOver ? '#f5f5f5' : '#fff', cursor: 'pointer',
          transition: 'border-color 0.15s, background 0.15s',
        }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          style={{ display: 'none' }}
        />
        {uploadState === 'Default' && (
          <>
            <div style={{ fontSize: 32, marginBottom: 8 }}>↑</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>Drop file here or click to browse</div>
            <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{acceptLabel}</div>
          </>
        )}
        {uploadState === 'Uploading' && (
          <div style={{ fontSize: 13, color: '#555' }}>Uploading {filename}…</div>
        )}
        {uploadState === 'file added' && (
          <div style={{ fontSize: 13, color: '#111' }}>
            <span style={{ marginRight: 6 }}>✓</span>
            {filename}
          </div>
        )}
      </div>
    </div>
  );
}

const meta: Meta<typeof FileUploadDemo> = {
  title: 'Stilo/Components/FileUpload',
  component: FileUploadDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FileUploadDemo>;

export const Default: Story = {
  args: {
    variant: 'Default',
    accept: '*',
    acceptLabel: 'Any file type',
    multiple: false,
    simulateUpload: true,
  },
};
