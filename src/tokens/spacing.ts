export const spacing = {
  webSpacing1: 60,
  webSpacing2: 30,
  baseSpacing1: 24,
  baseSpacing2: 16,
  tightSpacing: 12,
  componentInnerSpacing: 5,
} as const;

export type SpacingToken = keyof typeof spacing;
