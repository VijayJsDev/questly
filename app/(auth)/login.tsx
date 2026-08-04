// app/(auth)/login.tsx
//
// Login screen — PLACEHOLDER
// V1 feature: single user, stays logged in after first login.
// Business logic will be wired in the auth feature phase.

import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

import { useAuthStore } from '@/features/auth/store/authStore';
import { useTheme } from '@/hooks/useTheme';

export default function LoginScreen() {
  const { colors, typography, spacing } = useTheme();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    // TODO: Replace with real login form in auth feature phase
    await login('Vijay');
    router.replace('/(tabs)');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing[6],
      }}
    >
      {/* Logo / Brand */}
      <View style={{ alignItems: 'center', marginBottom: spacing[12] }}>
        <Text
          style={{
            ...typography.textVariants.displayMedium,
            color: colors.primary,
            marginBottom: spacing[2],
          }}
        >
          ⚡ Questly
        </Text>
        <Text
          style={{
            ...typography.textVariants.body,
            color: colors.textSecondary,
            textAlign: 'center',
          }}
        >
          Complete missions.{'\n'}Build streaks. Gain XP.
        </Text>
      </View>

      {/* CTA Button — placeholder */}
      <Pressable
        onPress={handleLogin}
        style={({ pressed }) => ({
          backgroundColor: pressed ? colors.primaryLight : colors.primary,
          paddingVertical: spacing[4],
          paddingHorizontal: spacing[10],
          borderRadius: 14,
          opacity: pressed ? 0.9 : 1,
        })}
      >
        <Text
          style={{
            ...typography.textVariants.bodyMedium,
            color: colors.textInverse,
            fontFamily: typography.fontFamily.semibold,
          }}
        >
          Get Started
        </Text>
      </Pressable>

      {/* Placeholder note */}
      <Text
        style={{
          ...typography.textVariants.caption,
          color: colors.textTertiary,
          marginTop: spacing[8],
          textAlign: 'center',
        }}
      >
        Placeholder screen — auth logic coming soon
      </Text>
    </View>
  );
}
