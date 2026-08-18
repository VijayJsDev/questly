// src/features/missions/hooks/useCompleteMission.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS, XP_VALUES } from '@/lib/constants';
import { getTodayCompletions, addCompletion, removeCompletion } from '../services/missionService';
import { useAuthStore } from '@/features/auth/store/authStore';

// ─── Read — today's completions ────────────────────────────────────────────────
export const useTodayCompletions = () =>
  useQuery({
    queryKey: QUERY_KEYS.todayCompletions,
    queryFn: getTodayCompletions,
  });

// ─── Computed — set of completed missionIds for today ─────────────────────────
export const useTodayCompletedIds = (): Set<string> => {
  const { data } = useTodayCompletions();
  return new Set((data ?? []).map((c) => c.missionId));
};

// ─── Mutate — complete a mission ───────────────────────────────────────────────
export const useCompleteMission = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);


  return useMutation({
    mutationFn: async ({ missionId, xpReward }: { missionId: string; xpReward: number }) => {
      const streakBonus = Math.min(
        (user?.currentStreak ?? 0) * XP_VALUES.STREAK_BONUS_PER_DAY,
        XP_VALUES.MAX_STREAK_BONUS
      );
      const totalXp = xpReward + streakBonus;
      const completion = await addCompletion(missionId, totalXp);
      return { completion, totalXp };
    },
    onSuccess: ({ totalXp }) => {
      // Update auth store XP immediately (optimistic feel)
      if (user) {
        useAuthStore.setState((s) => ({
          user: s.user ? { ...s.user, totalXP: s.user.totalXP + totalXp } : null,
        }));
      }
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todayCompletions });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todaysMissions });
    },
  });
};

// ─── Mutate — undo a completion ────────────────────────────────────────────────
export const useUncompleteMission = () => {
  const queryClient = useQueryClient();
  const completions = useTodayCompletions();

  return useMutation({
    mutationFn: async (missionId: string) => {
      const completion = (completions.data ?? []).find((c) => c.missionId === missionId);
      await removeCompletion(missionId);
      return completion?.xpEarned ?? 0;
    },
    onSuccess: (xpEarned) => {
      // Deduct XP from auth store
      useAuthStore.setState((s) => ({
        user: s.user ? { ...s.user, totalXP: Math.max(0, s.user.totalXP - xpEarned) } : null,
      }));
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todayCompletions });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todaysMissions });
    },
  });
};
