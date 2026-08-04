// src/hooks/useTheme.ts
//
// Re-exports useTheme from ThemeProvider for a clean import path.
// Components import from '@/hooks/useTheme', not from the provider directly.
// This indirection means we could swap the theme implementation (e.g. move from
// Context to something else) without changing any component import.

export { useTheme, useThemeStore } from '@/providers/ThemeProvider';
export type { ThemeContextValue, ThemePreference } from '@/providers/ThemeProvider';
