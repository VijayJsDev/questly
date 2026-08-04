// app/(tabs)/stats.tsx — Stats Screen (Placeholder)

import { View, Text, ScrollView } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

const STAT_CARDS = [
  { label: 'Missions Completed', value: '0', icon: '✅' },
  { label: 'Total XP Earned', value: '0', icon: '⭐' },
  { label: 'Longest Streak', value: '0 days', icon: '🔥' },
  { label: 'This Week', value: '0 XP', icon: '📈' },
];

export default function StatsScreen() {
  const { colors, typography, spacing } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: spacing[5], paddingTop: spacing[12] }}
    >
      <Text style={{ ...typography.textVariants.heading, color: colors.textPrimary, marginBottom: spacing[6] }}>
        Statistics
      </Text>

      {/* Stat grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3], marginBottom: spacing[6] }}>
        {STAT_CARDS.map((card) => (
          <View
            key={card.label}
            style={{
              width: '47%',
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: spacing[4],
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 28, marginBottom: spacing[2] }}>{card.icon}</Text>
            <Text style={{ ...typography.textVariants.heading, color: colors.primary }}>
              {card.value}
            </Text>
            <Text style={{ ...typography.textVariants.caption, color: colors.textSecondary }}>
              {card.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Chart placeholder */}
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          padding: spacing[5],
          borderWidth: 1,
          borderColor: colors.border,
          alignItems: 'center',
          height: 200,
          justifyContent: 'center',
        }}
      >
        <Text style={{ ...typography.textVariants.title, color: colors.textSecondary }}>
          📊 Chart coming next phase
        </Text>
      </View>
    </ScrollView>
  );
}
