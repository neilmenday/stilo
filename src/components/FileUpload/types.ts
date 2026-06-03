export type UploadState = 'Default' | 'Uploading' | 'file added';
export type FileUploadVariant = 'Default' | 'Stacked';

export interface FileUploadProps {
  variant?:        FileUploadVariant;
  accept?:         string;
  acceptLabel?:    string;
  multiple?:       boolean;
  simulateUpload?: boolean;
}
