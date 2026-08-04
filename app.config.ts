// app.config.ts
//
// Dynamic Expo configuration.
//
// WHY app.config.ts instead of app.json?
// app.json is static — it can't read environment variables at build time.
// app.config.ts is a JS/TS module that runs during `expo start` / `eas build`,
// allowing us to inject env vars into the app bundle.
//
// IMPORTANT: Only EXPO_PUBLIC_* vars are bundled into the client app.
// Never put secrets (API keys, private keys) in EXPO_PUBLIC_* vars.

import type { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: process.env.EXPO_PUBLIC_APP_NAME ?? 'Questly',
  slug: 'questly',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',

  // Dark-first: force dark UI chrome (status bar, navigation bar)
  userInterfaceStyle: 'automatic', // 'automatic' respects OS + our manual toggle

  scheme: 'questly', // Deep link scheme: questly://

  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.yourname.questly',
    infoPlist: {
      UIUserInterfaceStyle: 'Automatic',
    },
  },

  android: {
    package: 'com.yourname.questly',
    adaptiveIcon: {
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
      backgroundColor: '#0A0A0F',
    },
    // Edge-to-edge rendering is enabled by default in SDK 57 (no config needed)
  },

  web: {
    bundler: 'metro',
    favicon: './assets/favicon.png',
  },

  plugins: [
    'expo-router',
    'expo-font',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#0A0A0F', // Dark splash matching our theme
        image: './assets/icon.png',
        imageWidth: 120,
      },
    ],
    'expo-secure-store',
  ],

  extra: {
    appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? 'development',
  },

  experiments: {
    typedRoutes: true, // Expo Router typed route inference
  },
});
