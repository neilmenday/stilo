import type React from 'react';

// ─── AddWorkflow ──────────────────────────────────────────────────────────────
export interface AddWorkflowProps {
  open:    boolean;
  onClose: () => void;
  onAdd?:  () => void;
  title?:  string;
  leftContent?: React.ReactNode;
  leftComplete?: boolean;
  rightContent?: React.ReactNode;
  addDisabled?: boolean;
  leftGuidance?:  { title: string; body: string };
  rightGuidance?: { title: string; body: string };
}

// ─── AddWorkflowStepped ───────────────────────────────────────────────────────
export interface AddStepDef {
  label: string;
  content: React.ReactNode;
}

export interface AddWorkflowSteppedProps {
  open:     boolean;
  onClose:  () => void;
  onAdd?:   () => void;
  title?:   string;
  steps:    AddStepDef[];
  activeStep?:   number;
  onStepChange?: (step: number) => void;
  addDisabled?:  boolean;
}

// ─── CreateWorkflow ───────────────────────────────────────────────────────────
export interface CreateWorkflowProps {
  open:     boolean;
  onClose:  () => void;
  onSave?:  () => void;
  onConfigure?: () => void;
  title?:   string;
  leftContent?: React.ReactNode;
  leftComplete?: boolean;
  rightContent?: React.ReactNode;
  saveDisabled?:      boolean;
  configureDisabled?: boolean;
  leftGuidance?:  { title: string; body: string };
  rightGuidance?: { title: string; body: string };
}

// ─── CreateWorkflowStepped ────────────────────────────────────────────────────
export interface StepDef {
  label: string;
  content: React.ReactNode;
}

export interface CreateWorkflowSteppedProps {
  open:     boolean;
  onClose:  () => void;
  onSave?:  () => void;
  title?:   string;
  steps:    StepDef[];
  activeStep?:   number;
  onStepChange?: (step: number) => void;
  saveDisabled?: boolean;
}

// ─── EditWorkflow ─────────────────────────────────────────────────────────────
export interface EditWorkflowProps {
  open:          boolean;
  onClose:       () => void;
  onSave?:       () => void;
  title?:        string;
  saveDisabled?: boolean;
  width?:        number;
  children?:     React.ReactNode;
}

// ─── EditTerritoryWorkflow ────────────────────────────────────────────────────
export interface EditTerritoryWorkflowProps {
  open:        boolean;
  title:       string;
  mapCenter?:  [number, number];
  mapZoom?:    number;
  width?:      number;
  onClose:     () => void;
}
