// src/theme/index.ts
// Barrel export — import everything from '@/theme' instead of individual files.

export { type ColorPalette, darkColors, lightColors } from './colors';
export {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textVariants,
  type TextVariant,
} from './typography';
export { layout, spacing, type SpacingKey } from './spacing';
