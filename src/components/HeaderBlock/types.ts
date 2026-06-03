export interface HeaderBlockProps {
  title: string;
  actionLabel?:   string;
  onActionClick?: () => void;
  helpLabel?: string;
  onHelpClick?: () => void;
  showChooser?: boolean;
  chooserLabel?: string;
  chooserDisplayValue?: string;
  chooserItems?: { value: string; label: string }[];
  onChooserSelect?: (item: { value: string; label: string }) => void;
}
