// app/(tabs)/settings.tsx — Settings Screen (Placeholder)
// Contains the theme toggle — this is live functionality, not a placeholder.

import { View, Text, Switch, ScrollView, Pressable } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

interface SettingsRowProps {
  label: string;
  description?: string;
  right?: React.ReactNode;
  onPress?: () => void;
}

function SettingsRow({ label, description, right, onPress }: SettingsRowProps) {
  const { colors, typography, spacing } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing[4],
        paddingHorizontal: spacing[4],
        backgroundColor: pressed && onPress ? colors.surfacePressed : 'transparent',
      })}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ ...typography.textVariants.bodyMedium, color: colors.textPrimary }}>
          {label}
        </Text>
        {description && (
          <Text style={{ ...typography.textVariants.caption, color: colors.textSecondary, marginTop: 2 }}>
            {description}
          </Text>
        )}
      </View>
      {right}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const { colors, typography, spacing, isDark, toggleTheme, preference, setPreference } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: spacing[12] }}
    >
      <Text
        style={{
          ...typography.textVariants.heading,
          color: colors.textPrimary,
          paddingHorizontal: spacing[5],
          marginBottom: spacing[6],
        }}
      >
        Settings
      </Text>

      {/* ── Appearance Section ──────────────────────────────────── */}
      <Text
        style={{
          ...typography.textVariants.overline,
          color: colors.textSecondary,
          paddingHorizontal: spacing[5],
          marginBottom: spacing[2],
        }}
      >
        APPEARANCE
      </Text>
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          marginHorizontal: spacing[5],
          marginBottom: spacing[5],
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
        }}
      >
        <SettingsRow
          label="Dark Mode"
          description={`Current: ${isDark ? 'Dark' : 'Light'} theme`}
          right={
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primaryMuted }}
              thumbColor={isDark ? colors.primary : colors.textTertiary}
            />
          }
        />
        <View style={{ height: 1, backgroundColor: colors.borderSubtle, marginHorizontal: spacing[4] }} />
        <SettingsRow
          label="Follow System Theme"
          description="Automatically match your device setting"
          right={
            <Switch
              value={preference === 'system'}
              onValueChange={(v) => setPreference(v ? 'system' : isDark ? 'dark' : 'light')}
              trackColor={{ false: colors.border, true: colors.primaryMuted }}
              thumbColor={preference === 'system' ? colors.primary : colors.textTertiary}
            />
          }
        />
      </View>

      {/* ── Notifications Section (placeholder) ──────────────────── */}
      <Text
        style={{
          ...typography.textVariants.overline,
          color: colors.textSecondary,
          paddingHorizontal: spacing[5],
          marginBottom: spacing[2],
        }}
      >
        NOTIFICATIONS
      </Text>
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          marginHorizontal: spacing[5],
          marginBottom: spacing[5],
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
        }}
      >
        <SettingsRow
          label="Daily Reminder"
          description="Placeholder — coming soon"
          right={
            <Switch
              value={false}
              disabled
              trackColor={{ false: colors.border, true: colors.primaryMuted }}
              thumbColor={colors.textTertiary}
            />
          }
        />
      </View>

      {/* ── Profile Section (placeholder) ────────────────────────── */}
      <Text
        style={{
          ...typography.textVariants.overline,
          color: colors.textSecondary,
          paddingHorizontal: spacing[5],
          marginBottom: spacing[2],
        }}
      >
        PROFILE
      </Text>
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          marginHorizontal: spacing[5],
          marginBottom: spacing[5],
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
        }}
      >
        <SettingsRow label="Edit Profile" description="Placeholder — coming soon" onPress={() => {}} />
        <View style={{ height: 1, backgroundColor: colors.borderSubtle, marginHorizontal: spacing[4] }} />
        <SettingsRow
          label="Reset All Data"
          description="Permanently delete all missions and stats"
          onPress={() => {}}
          right={
            <Text style={{ ...typography.textVariants.label, color: colors.error }}>Reset</Text>
          }
        />
      </View>

      {/* App Version */}
      <Text
        style={{
          ...typography.textVariants.caption,
          color: colors.textTertiary,
          textAlign: 'center',
          paddingBottom: spacing[8],
        }}
      >
        Questly v1.0.0 · Scaffold build
      </Text>
    </ScrollView>
  );
}
