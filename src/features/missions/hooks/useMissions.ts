// src/features/missions/hooks/useMissions.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import { getMissions, createMission, deleteMission } from '../services/missionService';
import type { MissionFormData } from '../types';

// ─── Read — all missions ───────────────────────────────────────────────────────
export const useMissions = () =>
  useQuery({
    queryKey: QUERY_KEYS.missions,
    queryFn: () => getMissions(),
  });

// ─── Read — missions for a specific set ───────────────────────────────────────
export const useMissionsBySet = (setId: string) =>
  useQuery({
    queryKey: QUERY_KEYS.missionsBySet(setId),
    queryFn: () => getMissions(setId),
    enabled: !!setId,
  });

// ─── Mutate — create ───────────────────────────────────────────────────────────
export const useCreateMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MissionFormData) =>
      createMission({
        title: data.title,
        ...(data.description ? { description: data.description } : {}),
        priority: data.priority,
        setId: data.setId,
      }),

    onSuccess: (newMission) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.missions });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.missionsBySet(newMission.setId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todaysMissions });
    },
  });
};

// ─── Mutate — delete ───────────────────────────────────────────────────────────
export const useDeleteMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.missions });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todaysMissions });
    },
  });
};
