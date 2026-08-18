// app/(tabs)/missions.tsx — Missions Screen

import { View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { useTheme } from '@/hooks/useTheme';
import { useMissionSets } from '@/features/missions/hooks/useMissionSets';
import { useMissions, useDeleteMission } from '@/features/missions/hooks/useMissions';
import { DAY_LABELS, type Mission, type MissionSet } from '@/features/missions/types';

// ─── Mission Row ──────────────────────────────────────────────────────────────
function MissionRow({ mission, onDelete }: { mission: Mission; onDelete: (id: string) => void }) {
  const { colors, typography, spacing } = useTheme();

  const priorityColor = {
    low: '#4ECDC4',
    medium: '#FFE66D',
    high: '#FF6B6B',
  }[mission.priority];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing[4],
        borderWidth: 1,
        borderColor: colors.border,
        gap: spacing[3],
      }}
    >
      {/* Priority dot */}
      <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: priorityColor }} />

      {/* Content */}
      <View style={{ flex: 1 }}>
        <Text style={{ ...typography.textVariants.body, color: colors.textPrimary }}>
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

      {/* XP badge */}
      <View
        style={{
          backgroundColor: colors.primary + '20',
          borderRadius: 8,
          paddingHorizontal: spacing[2],
          paddingVertical: spacing[1],
        }}
      >
        <Text style={{ ...typography.textVariants.caption, color: colors.primary }}>
          +{mission.xpReward} XP
        </Text>
      </View>

      {/* Delete */}
      <Pressable
        onPress={() => onDelete(mission.id)}
        hitSlop={8}
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      >
        <Text style={{ color: colors.textTertiary, fontSize: 18 }}>×</Text>
      </Pressable>
    </View>
  );
}

// ─── Set Section ──────────────────────────────────────────────────────────────
function SetSection({ set, allMissions }: { set: MissionSet; allMissions: Mission[] }) {
  const { colors, typography, spacing } = useTheme();
  const { mutate: deleteMission } = useDeleteMission();
  const missions = allMissions.filter((m) => m.setId === set.id);

  const dayLabel = set.activeDays
    .map((d) => DAY_LABELS[d])
    .join(' · ');

  return (
    <View style={{ marginBottom: spacing[6] }}>
      {/* Set header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: spacing[3],
        }}
      >
        <View>
          <Text style={{ ...typography.textVariants.title, color: colors.textPrimary }}>
            {set.name}
          </Text>
          <Text style={{ ...typography.textVariants.caption, color: colors.textTertiary }}>
            {dayLabel} · {missions.length} mission{missions.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {/* Mission list */}
      {missions.length === 0 ? (
        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.border,
            borderRadius: 12,
            padding: spacing[5],
            alignItems: 'center',
          }}
        >
          <Text style={{ ...typography.textVariants.caption, color: colors.textTertiary }}>
            No missions yet — tap + to add one
          </Text>
        </View>
      ) : (
        <View style={{ gap: spacing[2] }}>
          {missions.map((m) => (
            <MissionRow key={m.id} mission={m} onDelete={(id) => deleteMission(id)} />
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function MissionsScreen() {
  const { colors, typography, spacing } = useTheme();
  const { data: sets = [], isLoading: setsLoading } = useMissionSets();
  const { data: missions = [], isLoading: missionsLoading } = useMissions();

  const isLoading = setsLoading || missionsLoading;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: spacing[5],
          paddingTop: spacing[14],
          paddingBottom: spacing[4],
        }}
      >
        <Text style={{ ...typography.textVariants.heading, color: colors.textPrimary }}>
          Missions
        </Text>
        <View style={{ flexDirection: 'row', gap: spacing[2] }}>
          {/* New Set button */}
          <Pressable
            onPress={() => router.push('/mission/create-set')}
            style={({ pressed }) => ({
              backgroundColor: pressed ? colors.surface : colors.border,
              paddingHorizontal: spacing[3],
              paddingVertical: spacing[2],
              borderRadius: 10,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={{ ...typography.textVariants.caption, color: colors.textSecondary }}>
              New Set
            </Text>
          </Pressable>

          {/* FAB — Add Mission */}
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
            <Text style={{ color: '#FFFFFF', fontSize: 24, lineHeight: 28 }}>+</Text>
          </Pressable>
        </View>
      </View>

      {/* Content */}
      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : sets.length === 0 ? (
        /* Empty state — no sets yet */
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing[8] }}>
          <Text style={{ fontSize: 64, marginBottom: spacing[4] }}>📋</Text>
          <Text style={{ ...typography.textVariants.title, color: colors.textPrimary, marginBottom: spacing[2] }}>
            No mission sets yet
          </Text>
          <Text
            style={{
              ...typography.textVariants.body,
              color: colors.textSecondary,
              textAlign: 'center',
              marginBottom: spacing[6],
            }}
          >
            Create a set first (e.g. "Weekday Grind"), then add missions to it.
          </Text>
          <Pressable
            onPress={() => router.push('/mission/create-set')}
            style={({ pressed }) => ({
              backgroundColor: colors.primary,
              paddingHorizontal: spacing[6],
              paddingVertical: spacing[3],
              borderRadius: 12,
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text style={{ ...typography.textVariants.label, color: '#FFFFFF' }}>Create a Set</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ padding: spacing[5] }}
          showsVerticalScrollIndicator={false}
        >
          {sets.map((set) => (
            <SetSection key={set.id} set={set} allMissions={missions} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
