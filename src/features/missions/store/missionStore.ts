// src/features/missions/store/missionStore.ts
//
// Zustand store for UI-level mission state (selection, filters, sheet visibility).
// Data fetching/mutation lives in TanStack Query hooks (to be added next phase).
// This store handles ONLY ephemeral UI state that doesn't need to be persisted.

import { create } from 'zustand';

import type { Mission, MissionPriority, MissionStatus } from '../types';

export type MissionFilter = 'all' | MissionStatus;
export type MissionSort = 'priority' | 'createdAt' | 'status';

interface MissionStoreState {
  // UI state
  selectedMissionId: string | null;
  activeFilter: MissionFilter;
  activeSort: MissionSort;
  isCreateSheetOpen: boolean;

  // Actions
  selectMission: (id: string | null) => void;
  setFilter: (filter: MissionFilter) => void;
  setSort: (sort: MissionSort) => void;
  openCreateSheet: () => void;
  closeCreateSheet: () => void;
}

export const useMissionStore = create<MissionStoreState>((set) => ({
  selectedMissionId: null,
  activeFilter: 'all',
  activeSort: 'priority',
  isCreateSheetOpen: false,

  selectMission: (id) => set({ selectedMissionId: id }),
  setFilter: (filter) => set({ activeFilter: filter }),
  setSort: (sort) => set({ activeSort: sort }),
  openCreateSheet: () => set({ isCreateSheetOpen: true }),
  closeCreateSheet: () => set({ isCreateSheetOpen: false }),
}));

// ─── Selector helpers (memoized outside the store for performance) ─────────────
// Usage: const pending = useMissionStore(selectPendingMissions(missions))
export const filterMissions = (missions: Mission[], filter: MissionFilter): Mission[] => {
  if (filter === 'all') return missions;
  return missions.filter((m) => m.status === filter);
};

export const sortMissions = (missions: Mission[], sort: MissionSort): Mission[] => {
  return [...missions].sort((a, b) => {
    switch (sort) {
      case 'priority': {
        const order: Record<MissionPriority, number> = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
      }
      case 'createdAt':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'status': {
        const statusOrder: Record<MissionStatus, number> = { pending: 0, completed: 1, skipped: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
    }
  });
};
