// app/(auth)/_layout.tsx
//
// Auth group layout.
// If the user IS already authenticated, redirect immediately to (tabs).
// Using Expo Router's <Redirect> is the v4-recommended pattern for auth guarding.
// It avoids the flash of the login screen and keeps guard logic in the layout,
// not scattered across screens.

import { Redirect, Stack } from 'expo-router';

import { useAuthStore } from '@/features/auth/store/authStore';

export default function AuthLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // If logged in, skip auth group entirely and go to main app
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}
