// app/(tabs)/index.tsx — Home Screen

import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useTodaysMissions } from '@/features/missions/hooks/useMissionSets';
import {
  useTodayCompletedIds,
  useCompleteMission,
  useUncompleteMission,
} from '@/features/missions/hooks/useCompleteMission';
import { DAY_FULL_LABELS, type Mission } from '@/features/missions/types';

// ─── Greeting Helper ──────────────────────────────────────────────────────────
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function getTodayLabel(): string {
  const dow = new Date().getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;
  const date = new Date();
  return `${DAY_FULL_LABELS[dow]}, ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
}

// ─── Mission Check Row ────────────────────────────────────────────────────────
function MissionCheckRow({
  mission,
  isCompleted,
}: {
  mission: Mission;
  isCompleted: boolean;
}) {
  const { colors, typography, spacing } = useTheme();
  const { mutate: complete, isPending: completing } = useCompleteMission();
  const { mutate: uncomplete, isPending: uncompleting } = useUncompleteMission();
  const isPending = completing || uncompleting;

  const priorityColor = { low: '#4ECDC4', medium: '#FFE66D', high: '#FF6B6B' }[mission.priority];

  const toggle = () => {
    if (isPending) return;
    if (isCompleted) {
      uncomplete(mission.id);
    } else {
      complete({ missionId: mission.id, xpReward: mission.xpReward });
    }
  };

  return (
    <Pressable
      onPress={toggle}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: isCompleted ? colors.success + '12' : colors.surface,
        borderRadius: 12,
        padding: spacing[4],
        borderWidth: 1,
        borderColor: isCompleted ? colors.success + '40' : colors.border,
        gap: spacing[3],
        opacity: pressed ? 0.75 : 1,
      })}
    >
      {/* Checkbox */}
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: isCompleted ? colors.success : colors.border,
          backgroundColor: isCompleted ? colors.success : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isPending ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : isCompleted ? (
          <Text style={{ color: '#FFF', fontSize: 13, fontWeight: '700' }}>✓</Text>
        ) : null}
      </View>

      {/* Mission info */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            ...typography.textVariants.body,
            color: isCompleted ? colors.textTertiary : colors.textPrimary,
            textDecorationLine: isCompleted ? 'line-through' : 'none',
          }}
        >
          {mission.title}
        </Text>
        {mission.description ? (
          <Text
            style={{ ...typography.textVariants.caption, color: colors.textTertiary, marginTop: 2 }}
            numberOfLines={1}
          >
            {mission.description}
          </Text>
        ) : null}
      </View>

      {/* Priority dot + XP */}
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: priorityColor }} />
        <Text style={{ ...typography.textVariants.caption, color: isCompleted ? colors.success : colors.primary }}>
          {isCompleted ? '✓ ' : '+'}{mission.xpReward} XP
        </Text>
      </View>
    </Pressable>
  );
}

// ─── Progress Ring (simple) ───────────────────────────────────────────────────
function SimpleProgressRing({ total, completed }: { total: number; completed: number }) {
  const { colors, typography, spacing } = useTheme();
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          width: 96,
          height: 96,
          borderRadius: 48,
          borderWidth: 8,
          borderColor: percent === 100 ? colors.success : colors.border,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: percent > 0 ? (percent === 100 ? colors.success + '15' : colors.primary + '10') : 'transparent',
        }}
      >
        <Text style={{ ...typography.textVariants.heading, color: percent === 100 ? colors.success : colors.textPrimary }}>
          {percent}%
        </Text>
      </View>
      <Text style={{ ...typography.textVariants.caption, color: colors.textTertiary, marginTop: spacing[2] }}>
        {completed}/{total} done
      </Text>
    </View>
  );
}

// ─── Main Home Screen ─────────────────────────────────────────────────────────
export default function HomeScreen() {
  const { colors, typography, spacing } = useTheme();
  const user = useAuthStore((s) => s.user);
  const { data: todayData, isLoading } = useTodaysMissions();
  const completedIds = useTodayCompletedIds();

  const todayMissions = todayData?.missions ?? [];
  const completedCount = todayMissions.filter((m) => completedIds.has(m.id)).length;
  const todayXP = [...completedIds].reduce((sum, id) => {
    const m = todayMissions.find((m) => m.id === id);
    return sum + (m?.xpReward ?? 0);
  }, 0);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: spacing[5], paddingTop: spacing[14], paddingBottom: spacing[10] }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={{ marginBottom: spacing[6] }}>
        <Text style={{ ...typography.textVariants.caption, color: colors.textSecondary, marginBottom: spacing[1] }}>
          {getTodayLabel().toUpperCase()}
        </Text>
        <Text style={{ ...typography.textVariants.heading, color: colors.textPrimary }}>
          {getGreeting()}{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋
        </Text>
      </View>

      {/* Stats Row */}
      <View style={{ flexDirection: 'row', gap: spacing[3], marginBottom: spacing[4] }}>
        {/* Streak */}
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
          <Text style={{ ...typography.textVariants.label, color: colors.textSecondary }}>STREAK</Text>
          <Text style={{ ...typography.textVariants.displayMedium, color: colors.accent }}>
            🔥 {user?.currentStreak ?? 0}
          </Text>
          <Text style={{ ...typography.textVariants.caption, color: colors.textTertiary }}>days</Text>
        </View>

        {/* Total XP */}
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
          <Text style={{ ...typography.textVariants.label, color: colors.textSecondary }}>TOTAL XP</Text>
          <Text style={{ ...typography.textVariants.displayMedium, color: colors.primary }}>
            ⚡ {user?.totalXP ?? 0}
          </Text>
          <Text style={{ ...typography.textVariants.caption, color: colors.textTertiary }}>points</Text>
        </View>
      </View>

      {/* Today XP + Progress */}
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          padding: spacing[5],
          borderWidth: 1,
          borderColor: colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing[5],
          marginBottom: spacing[6],
        }}
      >
        <SimpleProgressRing total={todayMissions.length} completed={completedCount} />
        <View style={{ flex: 1 }}>
          <Text style={{ ...typography.textVariants.label, color: colors.textSecondary }}>TODAY'S PROGRESS</Text>
          <Text style={{ ...typography.textVariants.title, color: colors.textPrimary, marginTop: spacing[1] }}>
            {completedCount === 0
              ? "Let's get started!"
              : completedCount === todayMissions.length && todayMissions.length > 0
              ? '🎉 All done!'
              : `${completedCount} of ${todayMissions.length} complete`}
          </Text>
          {todayXP > 0 && (
            <Text style={{ ...typography.textVariants.caption, color: colors.success, marginTop: spacing[1] }}>
              +{todayXP} XP earned today
            </Text>
          )}
        </View>
      </View>

      {/* Today's Missions */}
      <View>
        <Text style={{ ...typography.textVariants.title, color: colors.textPrimary, marginBottom: spacing[3] }}>
          Today's Missions
        </Text>

        {isLoading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: spacing[8] }} />
        ) : todayMissions.length === 0 ? (
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: spacing[8],
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 48, marginBottom: spacing[3] }}>📋</Text>
            <Text style={{ ...typography.textVariants.title, color: colors.textPrimary, marginBottom: spacing[2] }}>
              No missions today
            </Text>
            <Text
              style={{
                ...typography.textVariants.body,
                color: colors.textSecondary,
                textAlign: 'center',
              }}
            >
              {todayData?.sets && todayData.sets.length > 0
                ? 'Your active sets have no missions yet. Add some!'
                : 'No mission set is active today. Create one for today!'}
            </Text>
          </View>
        ) : (
          <View style={{ gap: spacing[2] }}>
            {todayMissions.map((mission) => (
              <MissionCheckRow
                key={mission.id}
                mission={mission}
                isCompleted={completedIds.has(mission.id)}
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
