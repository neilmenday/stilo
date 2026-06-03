import { useState, useRef, useCallback } from 'react';
import type { UploadState } from './types';

interface UseFileUploadOptions {
  simulateUpload?: boolean;
}

export function useFileUpload({ simulateUpload = false }: UseFileUploadOptions = {}) {
  const [uploadState, setUploadState] = useState<UploadState>('Default');
  const [filename,    setFilename]    = useState('');
  const [isDragOver,  setDragOver]   = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((fileList: FileList) => {
    const f = fileList[0];
    if (!f) return;
    setFilename(f.name);
    if (simulateUpload) {
      setUploadState('Uploading');
      setTimeout(() => setUploadState('file added'), 1800);
    } else {
      setUploadState('file added');
    }
  }, [simulateUpload]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  };

  return {
    uploadState,
    filename,
    isDragOver,
    inputRef,
    handleFiles,
    handleInputChange,
    handleDrop,
    dragProps: {
      onDragOver: (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); },
      onDragLeave: () => setDragOver(false),
      onDrop: handleDrop,
    },
  };
}
