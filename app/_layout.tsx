// app/_layout.tsx
//
// ROOT LAYOUT — the single entry point for the entire Expo Router app.
//
// Responsibilities:
// 1. Load fonts before rendering any UI (prevents FOUT — Flash of Unstyled Text)
// 2. Control the splash screen (keep visible until fonts are ready)
// 3. Wrap the app in all global providers (Theme, Query)
// 4. Set up the root Stack navigator with our two groups: (auth) and (tabs)
//
// WHY IMPORT global.css HERE?
// NativeWind requires its entry CSS to be imported ONCE at the top of the tree.
// The root layout is guaranteed to run before any screen, making it the right place.

// CSS side-effect import (processed by NativeWind v5 / react-native-css via PostCSS)
import '../global.css';


import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import { QueryProvider } from '@/providers/QueryProvider';
import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';

// Keep the splash screen visible while fonts are loading
SplashScreen.preventAutoHideAsync();

// Set Android navigation bar to match our dark theme
SystemUI.setBackgroundColorAsync('#0A0A0F');

// ─── Inner layout (needs access to theme) ─────────────────────────────────────
function RootLayoutContent() {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        {/* (auth) group: login screen — shown when unauthenticated */}
        <Stack.Screen name="(auth)" />
        {/* (tabs) group: main app — shown when authenticated */}
        <Stack.Screen name="(tabs)" />
        {/* Mission modals presented over the tabs */}
        <Stack.Screen
          name="mission/create"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="mission/create-set"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="mission/[id]/edit"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />

      </Stack>
    </>
  );
}

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Don't render until fonts are ready
  if (!fontsLoaded && !fontError) return null;

  return (
    <QueryProvider>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </QueryProvider>
  );
}
