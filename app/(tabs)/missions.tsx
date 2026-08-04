// app/(tabs)/missions.tsx — Missions Screen (Placeholder)

import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

import { useTheme } from '@/hooks/useTheme';

export default function MissionsScreen() {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing[5] }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: spacing[12],
          marginBottom: spacing[6],
        }}
      >
        <Text style={{ ...typography.textVariants.heading, color: colors.textPrimary }}>
          Missions
        </Text>
        {/* FAB placeholder */}
        <Pressable
          onPress={() => router.push('/mission/create')}
          style={({ pressed }) => ({
            backgroundColor: pressed ? colors.primaryLight : colors.primary,
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text style={{ color: colors.textInverse, fontSize: 24, lineHeight: 28 }}>+</Text>
        </Pressable>
      </View>

      {/* Empty state */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 64, marginBottom: spacing[4] }}>⚡</Text>
        <Text style={{ ...typography.textVariants.title, color: colors.textPrimary, marginBottom: spacing[2] }}>
          No missions yet
        </Text>
        <Text style={{ ...typography.textVariants.body, color: colors.textSecondary, textAlign: 'center' }}>
          Create your first mission to start earning XP and building streaks.
        </Text>
      </View>
    </View>
  );
}
