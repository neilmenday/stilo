import type React from 'react';

export type ButtonVariant = 'fill' | 'outline' | 'text';
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
}
