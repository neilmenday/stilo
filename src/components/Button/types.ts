import type React from 'react';

export type ButtonVariant = 'fill' | 'outline' | 'text' | 'mini';
export type ButtonIntent  = 'default' | 'destructive';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: ButtonVariant;
  intent?: ButtonIntent;
  iconOnly?: boolean;
  stacked?: boolean;
  showInfoIcon?: boolean;
  infoTitle?: string;
  infoBody?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Mini: shown with a resting background, as one of a set of options. */
  selectable?: boolean;
  /** Mini: the chosen option (Active). */
  selected?: boolean;
}
