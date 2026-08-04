// app/(tabs)/index.tsx — Home Screen (Placeholder)

import { View, Text, ScrollView } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

export default function HomeScreen() {
  const { colors, typography, spacing } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: spacing[5], paddingTop: spacing[12] }}
    >
      {/* Header */}
      <View style={{ marginBottom: spacing[8] }}>
        <Text style={{ ...typography.textVariants.caption, color: colors.textSecondary, marginBottom: spacing[1] }}>
          GOOD MORNING
        </Text>
        <Text style={{ ...typography.textVariants.heading, color: colors.textPrimary }}>
          Welcome back! 👋
        </Text>
      </View>

      {/* Streak Card Placeholder */}
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          padding: spacing[5],
          marginBottom: spacing[4],
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ ...typography.textVariants.label, color: colors.textSecondary }}>
          CURRENT STREAK
        </Text>
        <Text style={{ ...typography.textVariants.displayMedium, color: colors.accent, marginTop: spacing[1] }}>
          🔥 0
        </Text>
        <Text style={{ ...typography.textVariants.caption, color: colors.textTertiary }}>
          Complete your first mission to start!
        </Text>
      </View>

      {/* XP Card Placeholder */}
      <View style={{ flexDirection: 'row', gap: spacing[3], marginBottom: spacing[4] }}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.surface,
            borderRadius: 16,
            padding: spacing[4],
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ ...typography.textVariants.label, color: colors.textSecondary }}>TODAY</Text>
          <Text style={{ ...typography.textVariants.heading, color: colors.primary }}>0 XP</Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.surface,
            borderRadius: 16,
            padding: spacing[4],
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ ...typography.textVariants.label, color: colors.textSecondary }}>THIS WEEK</Text>
          <Text style={{ ...typography.textVariants.heading, color: colors.success }}>0 XP</Text>
        </View>
      </View>

      {/* Progress Ring Placeholder */}
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          padding: spacing[5],
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ ...typography.textVariants.label, color: colors.textSecondary, marginBottom: spacing[4] }}>
          TODAY'S PROGRESS
        </Text>
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 8,
            borderColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ ...typography.textVariants.heading, color: colors.textPrimary }}>0%</Text>
        </View>
        <Text style={{ ...typography.textVariants.caption, color: colors.textTertiary, marginTop: spacing[3] }}>
          Progress ring — Reanimated implementation coming next phase
        </Text>
      </View>
    </ScrollView>
  );
}
