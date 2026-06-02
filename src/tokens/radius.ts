export const radius = {
  cornerRadius1: 20,
  cornerRadius2: 8,
  cornerRadius3: 4,
} as const;

export type RadiusToken = keyof typeof radius;
