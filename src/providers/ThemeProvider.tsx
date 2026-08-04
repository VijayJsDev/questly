// src/providers/ThemeProvider.tsx
//
// Theme system architecture:
//
// 1. ThemeStore (Zustand) — source of truth for the current theme preference.
//    It persists the user's choice to AsyncStorage so it survives app restarts.
//    On first launch it reads the system color scheme as the default.
//
// 2. ThemeContext (React Context) — exposes the RESOLVED theme values (colors,
//    typography, spacing) to components. This is a thin read-only context that
//    derives from the Zustand store. Components never touch the store directly —
//    they always go through useTheme().
//
// WHY BOTH ZUSTAND AND CONTEXT?
// Zustand holds the mutable state (the preference: 'dark' | 'light' | 'system').
// Context broadcasts the derived values (the actual color objects) efficiently.
// This avoids every component re-subscribing to Zustand individually, and lets
// us pass the resolved colors as a single stable context value.

import { useColorScheme } from 'react-native';
import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { create } from 'zustand';

import { darkColors, lightColors, type ColorPalette } from '@/theme/colors';
import { fontFamily, fontSize, fontWeight, letterSpacing, lineHeight, textVariants } from '@/theme/typography';
import { layout, spacing } from '@/theme/spacing';
import { storageGet, storageSet, STORAGE_KEYS } from '@/lib/storage';

// ─── Theme Preference ──────────────────────────────────────────────────────────
export type ThemePreference = 'dark' | 'light' | 'system';

interface ThemeStore {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  _hydrated: boolean;
  _setHydrated: (hydrated: boolean) => void;
}

// Zustand store for the theme preference (mutable)
export const useThemeStore = create<ThemeStore>((set) => ({
  preference: 'dark', // Default: dark-first as decided
  _hydrated: false,
  _setHydrated: (hydrated) => set({ _hydrated: hydrated }),
  setPreference: async (preference) => {
    set({ preference });
    // Persist to AsyncStorage for next launch
    await storageSet(STORAGE_KEYS.SETTINGS, { themePreference: preference });
  },
}));

// ─── Theme Context ─────────────────────────────────────────────────────────────
export interface ThemeContextValue {
  // The resolved color palette for the currently active theme
  colors: ColorPalette;
  // Typography tokens
  typography: {
    fontFamily: typeof fontFamily;
    fontSize: typeof fontSize;
    fontWeight: typeof fontWeight;
    lineHeight: typeof lineHeight;
    letterSpacing: typeof letterSpacing;
    textVariants: typeof textVariants;
  };
  // Spacing scale
  spacing: typeof spacing;
  layout: typeof layout;
  // Convenience booleans
  isDark: boolean;
  isLight: boolean;
  // Theme control
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ─── Provider ──────────────────────────────────────────────────────────────────
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme(); // 'dark' | 'light' | null
  const { preference, setPreference, _hydrated, _setHydrated } = useThemeStore();

  // Hydrate from AsyncStorage on first mount
  useEffect(() => {
    async function hydrate() {
      const settings = await storageGet<{ themePreference?: ThemePreference }>(
        STORAGE_KEYS.SETTINGS,
      );
      if (settings?.themePreference) {
        useThemeStore.setState({ preference: settings.themePreference });
      }
      _setHydrated(true);
    }
    hydrate();
  }, [_setHydrated]);

  // Resolve the active scheme: 'system' defers to the OS preference
  const activeScheme = useMemo<'dark' | 'light'>(() => {
    if (preference === 'system') {
      return systemColorScheme === 'light' ? 'light' : 'dark';
    }
    return preference;
  }, [preference, systemColorScheme]);

  const isDark = activeScheme === 'dark';

  // Memoize the context value — only recomputes when theme actually changes
  const value = useMemo<ThemeContextValue>(
    () => ({
      colors: isDark ? darkColors : lightColors,
      typography: { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textVariants },
      spacing,
      layout,
      isDark,
      isLight: !isDark,
      preference,
      setPreference,
      toggleTheme: () => setPreference(isDark ? 'light' : 'dark'),
    }),
    [isDark, preference, setPreference],
  );

  // Don't render until hydrated (avoids flash of wrong theme)
  if (!_hydrated) return null;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ─── Consumer Hook ─────────────────────────────────────────────────────────────
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
