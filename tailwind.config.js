/** @type {import('tailwindcss').Config} */
module.exports = {
  // NativeWind preset: adapts Tailwind for React Native
  // (removes web-only utilities, adds RN-specific ones)
  presets: [require('nativewind/preset')],

  // content: Every file that uses className props must be listed here.
  // Tailwind scans these at build time to generate only the classes you use.
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  // darkMode: 'class' lets us manually toggle dark mode via a className
  // on a parent element, driven by our Zustand theme store.
  darkMode: 'class',

  theme: {
    extend: {
      // ─── Questly Brand Colors ────────────────────────────────────────
      colors: {
        // Primary brand purple
        primary: {
          DEFAULT: '#7C6AF7',
          light: '#A89BFF',
          dark: '#5B4FD6',
        },
        // Accent / XP / streak
        accent: {
          DEFAULT: '#FF6B6B',
          light: '#FF9E9E',
          dark: '#E55555',
        },
        // Success / completed missions
        success: {
          DEFAULT: '#4ECDC4',
          light: '#7EDDD6',
          dark: '#2BA89F',
        },
        // Warning / near deadline
        warning: {
          DEFAULT: '#FFE66D',
          light: '#FFF0A0',
          dark: '#F0C94B',
        },
        // ─── Dark Theme Surfaces ─────────────────────────────────────
        dark: {
          bg: '#0A0A0F',
          surface: '#13131A',
          elevated: '#1C1C28',
          border: '#2A2A3D',
        },
        // ─── Light Theme Surfaces ────────────────────────────────────
        light: {
          bg: '#F8F8FF',
          surface: '#FFFFFF',
          elevated: '#F0F0F8',
          border: '#E0E0F0',
        },
      },

      // ─── Typography ──────────────────────────────────────────────────
      fontFamily: {
        sans: ['Inter_400Regular', 'System'],
        medium: ['Inter_500Medium', 'System'],
        semibold: ['Inter_600SemiBold', 'System'],
        bold: ['Inter_700Bold', 'System'],
      },

      // ─── Border Radius ───────────────────────────────────────────────
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
    },
  },

  plugins: [],
};
