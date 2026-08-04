// src/theme/spacing.ts
//
// 4px-base spacing scale.
// Using a 4px base ensures all spacing is on a consistent grid,
// which produces visually harmonious layouts without thinking.
//
// Usage:  padding: spacing[4]   → 16px
//         margin: spacing[2]    → 8px
//         gap: spacing[6]       → 24px

export const spacing = {
  0: 0,
  0.5: 2,   // hairline
  1: 4,     // very tight
  1.5: 6,
  2: 8,     // tight
  2.5: 10,
  3: 12,    // compact
  3.5: 14,
  4: 16,    // default (most common)
  5: 20,
  6: 24,    // comfortable
  7: 28,
  8: 32,    // spacious
  9: 36,
  10: 40,
  11: 44,   // tap target minimum
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
} as const;

export type SpacingKey = keyof typeof spacing;

// ─── Layout Constants ───────────────────────────────────────────────────────
export const layout = {
  // Standard horizontal screen padding
  screenPaddingX: spacing[4],
  // Standard vertical screen padding
  screenPaddingY: spacing[6],
  // Card internal padding
  cardPadding: spacing[4],
  // Minimum touch target size (Apple HIG: 44×44pt)
  minTouchTarget: spacing[11],
  // Bottom tab bar height
  tabBarHeight: 60,
  // Standard border radius for cards/buttons
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 24,
  radiusFull: 9999,
} as const;
