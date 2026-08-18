// src/features/missions/hooks/useMissionSets.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import {
  getSets,
  getMissions,
  createSet,
  deleteSet,
  seedDefaultSetsIfEmpty,
} from '../services/missionService';
import type { MissionSetFormData } from '../types';

// ─── Read — all mission sets ───────────────────────────────────────────────────
export const useMissionSets = () =>
  useQuery({
    queryKey: QUERY_KEYS.missionSets,
    queryFn: async () => {
      await seedDefaultSetsIfEmpty(); // no-op after first run
      return getSets();
    },
  });

// ─── Read — today's active sets + their missions ───────────────────────────────
export const useTodaysMissions = () =>
  useQuery({
    queryKey: QUERY_KEYS.todaysMissions,
    queryFn: async () => {
      await seedDefaultSetsIfEmpty();
      const todayDow = new Date().getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;
      const [sets, missions] = await Promise.all([getSets(), getMissions()]);
      const todaySets = sets.filter((s) => s.activeDays.includes(todayDow));
      const todaySetIds = new Set(todaySets.map((s) => s.id));
      return {
        sets: todaySets,
        missions: missions.filter((m) => todaySetIds.has(m.setId)),
      };
    },
  });

// ─── Mutate — create ───────────────────────────────────────────────────────────
export const useCreateMissionSet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MissionSetFormData) => createSet(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.missionSets });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todaysMissions });
    },
  });
};

// ─── Mutate — delete ───────────────────────────────────────────────────────────
export const useDeleteMissionSet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.missionSets });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.missions });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todaysMissions });
    },
  });
};
