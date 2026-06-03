export interface AppliedPill {
  key: string;
  label: string;
  onDismiss: () => void;
}

export interface FilterResultsBarProps {
  pills: AppliedPill[];
  onClearAll: () => void;
}
