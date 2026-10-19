import type React from 'react';
import type { PillVariant } from '../Pill/types';
import type { AvatarRowProps } from '../AvatarRow/types';

export type GridCardIdentifierControl = 'none' | 'checkbox' | 'radio' | 'toggle';

export type GridCardSupportingInfo =
  | { variant: 'meta'; label?: string; pillLabel: string; pillVariant?: PillVariant }
  | { variant: 'content'; text: string };

/** 'default': header + content area (e.g. a map or data visualisation).
 *  'summary': no map or data visualisation - the title row, an AvatarRow and a
 *  summary sentence (with an optional link part), in one block. */
export type GridCardVariant = 'default' | 'summary';

export interface GridCardProps {
  variant?:            GridCardVariant;
  /** Summary: the people (e.g. team members) as an AvatarRow. */
  avatars?:            AvatarRowProps;
  /** Summary: the sentence's link part (dotted underline), then its plain text. */
  summaryLink?:        { label: string; onClick?: () => void };
  summaryText?:        string;
  /** Problem detected state (red border), e.g. a team with no active distributors. */
  hasProblem?:         boolean;
  identifier:          string;
  identifierControl?:  GridCardIdentifierControl;
  checked?:            boolean;
  onCheck?:            (checked: boolean) => void;
  radioGroupName?:     string;
  radioValue?:         string;
  showDotMenu?:        boolean;
  dotMenuItems?:       string[];
  onDotMenuSelect?:    (index: number, label: string) => void;
  supportingInfo?:     GridCardSupportingInfo;
  content?:            React.ReactNode;
  onCardClick?:        () => void;
  className?:          string;
}
