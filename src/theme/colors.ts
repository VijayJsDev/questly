// src/theme/colors.ts
//
// All color tokens for Questly's design system.
//
// ARCHITECTURE:
// - ColorPalette is an interface that BOTH dark and light palettes must satisfy.
//   This guarantees type safety when swapping themes — if a token is missing in
//   one palette, TypeScript will error at compile time.
// - Colors are semantic (e.g. "background", "primary") NOT literal (e.g. "purple600").
//   This means switching themes requires NO changes to component code.

export interface ColorPalette {
  // ─── Backgrounds ──────────────────────────────────────────────────────
  background: string;       // Main screen background
  surface: string;          // Cards, sheets, panels
  surfaceElevated: string;  // Modals, floating elements
  surfacePressed: string;   // Pressed/active state of surface

  // ─── Brand ────────────────────────────────────────────────────────────
  primary: string;          // Main CTA, active tab, key actions
  primaryLight: string;     // Hover/pressed states of primary
  primaryMuted: string;     // Very subtle primary tint (backgrounds)

  // ─── Semantic ─────────────────────────────────────────────────────────
  accent: string;           // XP counter, streak highlights, badges
  accentLight: string;
  success: string;          // Completed missions checkmarks
  successLight: string;
  warning: string;          // Near-deadline, caution states
  warningLight: string;
  error: string;            // Delete actions, validation errors
  errorLight: string;

  // ─── Text ─────────────────────────────────────────────────────────────
  textPrimary: string;      // Headings, main body text
  textSecondary: string;    // Labels, captions, placeholder text
  textTertiary: string;     // Disabled text, very subtle hints
  textInverse: string;      // Text on colored/primary backgrounds

  // ─── UI Elements ──────────────────────────────────────────────────────
  border: string;           // Dividers, card outlines
  borderSubtle: string;     // Very light separation lines
  icon: string;             // Default icon color
  iconMuted: string;        // Inactive tab icons
  overlay: string;          // Modal backdrop
  tabBar: string;           // Tab bar background
  tabBarActive: string;     // Active tab indicator/icon
}

// ─── Dark Palette (Default) ────────────────────────────────────────────────────
// Premium dark gamified feel — deep space with purple accent
export const darkColors: ColorPalette = {
  background: '#0A0A0F',
  surface: '#13131A',
  surfaceElevated: '#1C1C28',
  surfacePressed: '#22223A',

  primary: '#7C6AF7',
  primaryLight: '#A89BFF',
  primaryMuted: '#7C6AF720',

  accent: '#FF6B6B',
  accentLight: '#FF9E9E',
  success: '#4ECDC4',
  successLight: '#7EDDD6',
  warning: '#FFE66D',
  warningLight: '#FFF0A0',
  error: '#FF4757',
  errorLight: '#FF6B7A',

  textPrimary: '#FFFFFF',
  textSecondary: '#8888AA',
  textTertiary: '#55556A',
  textInverse: '#0A0A0F',

  border: '#2A2A3D',
  borderSubtle: '#1E1E2E',
  icon: '#CCCCDD',
  iconMuted: '#55556A',
  overlay: '#00000088',
  tabBar: '#0D0D14',
  tabBarActive: '#7C6AF7',
};

// ─── Light Palette ─────────────────────────────────────────────────────────────
// Clean, airy productivity feel — off-white with indigo accent
export const lightColors: ColorPalette = {
  background: '#F8F8FF',
  surface: '#FFFFFF',
  surfaceElevated: '#F0F0FB',
  surfacePressed: '#E8E8F5',

  primary: '#5B4FD6',
  primaryLight: '#7C6AF7',
  primaryMuted: '#5B4FD615',

  accent: '#E55555',
  accentLight: '#FF6B6B',
  success: '#2BA89F',
  successLight: '#4ECDC4',
  warning: '#F0C94B',
  warningLight: '#FFE66D',
  error: '#E03040',
  errorLight: '#FF4757',

  textPrimary: '#0A0A0F',
  textSecondary: '#555577',
  textTertiary: '#9999AA',
  textInverse: '#FFFFFF',

  border: '#E0E0F0',
  borderSubtle: '#F0F0F8',
  icon: '#333355',
  iconMuted: '#9999AA',
  overlay: '#00000055',
  tabBar: '#FFFFFF',
  tabBarActive: '#5B4FD6',
};
