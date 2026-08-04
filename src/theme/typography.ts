// src/theme/typography.ts
//
// Typography scale for Questly.
// All font sizes are in sp (scale-independent pixels) — React Native handles
// accessibility scaling automatically when users set system font size.
//
// Font family: Inter — clean, modern, highly legible at small sizes.
// Loaded via expo-font in app/_layout.tsx.

export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  // System fallbacks (used before fonts load)
  systemRegular: 'System',
} as const;

// Font sizes follow a Major Third scale (ratio: 1.25)
export const fontSize = {
  '2xs': 10,  // Tiny badges, timestamps
  xs: 11,     // Fine print, footnotes
  sm: 13,     // Captions, helper text
  base: 15,   // Default body text
  md: 17,     // Slightly prominent body
  lg: 20,     // Section subheadings
  xl: 24,     // Screen subheadings
  '2xl': 30,  // Screen headings
  '3xl': 38,  // Hero numbers (XP total, streak count)
  '4xl': 48,  // Display / onboarding
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

export const lineHeight = {
  tight: 1.2,   // Headings
  snug: 1.35,   // Subheadings
  normal: 1.5,  // Body text
  relaxed: 1.7, // Long-form reading
} as const;

export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,    // Uppercase labels, caps headings
} as const;

// ─── Preset Text Styles ────────────────────────────────────────────────────────
// These are consumed by the <Text> component's "variant" prop.
export const textVariants = {
  displayLarge: {
    fontSize: fontSize['4xl'],
    fontFamily: fontFamily.bold,
    lineHeight: fontSize['4xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  displayMedium: {
    fontSize: fontSize['3xl'],
    fontFamily: fontFamily.bold,
    lineHeight: fontSize['3xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  heading: {
    fontSize: fontSize['2xl'],
    fontFamily: fontFamily.bold,
    lineHeight: fontSize['2xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  subheading: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.semibold,
    lineHeight: fontSize.xl * lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  title: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.semibold,
    lineHeight: fontSize.lg * lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  body: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.regular,
    lineHeight: fontSize.base * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  bodyMedium: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.medium,
    lineHeight: fontSize.base * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  label: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    lineHeight: fontSize.sm * lineHeight.snug,
    letterSpacing: letterSpacing.wide,
  },
  caption: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
    lineHeight: fontSize.xs * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  overline: {
    fontSize: fontSize['2xs'],
    fontFamily: fontFamily.semibold,
    lineHeight: fontSize['2xs'] * lineHeight.normal,
    letterSpacing: letterSpacing.widest,
    textTransform: 'uppercase' as const,
  },
} as const;

export type TextVariant = keyof typeof textVariants;
