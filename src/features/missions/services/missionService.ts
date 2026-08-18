// src/features/missions/services/missionService.ts
//
// All AsyncStorage read/write for missions, mission sets, and daily completions.
// This is the single source of truth for persistence.
// TanStack Query hooks call these functions — they never touch AsyncStorage directly.

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Mission, MissionSet, DailyCompletion } from '../types';
import { XP_VALUES } from '@/lib/constants';

// ─── Storage Keys ─────────────────────────────────────────────────────────────
const KEYS = {
  SETS: 'questly:mission_sets',
  MISSIONS: 'questly:missions',
  COMPLETIONS: 'questly:completions',
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const todayDateString = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const xpForPriority = (priority: Mission['priority']): number => {
  switch (priority) {
    case 'high':   return XP_VALUES.MISSION_COMPLETE_HIGH;
    case 'medium': return XP_VALUES.MISSION_COMPLETE_MEDIUM;
    case 'low':    return XP_VALUES.MISSION_COMPLETE_LOW;
  }
};

// ─── Mission Sets ─────────────────────────────────────────────────────────────
export const getSets = async (): Promise<MissionSet[]> => {
  const raw = await AsyncStorage.getItem(KEYS.SETS);
  return raw ? (JSON.parse(raw) as MissionSet[]) : [];
};

const saveSets = async (sets: MissionSet[]): Promise<void> => {
  await AsyncStorage.setItem(KEYS.SETS, JSON.stringify(sets));
};

export const createSet = async (
  data: Pick<MissionSet, 'name' | 'activeDays'>
): Promise<MissionSet> => {
  const sets = await getSets();
  const newSet: MissionSet = {
    id: generateId(),
    name: data.name,
    activeDays: data.activeDays,
    createdAt: new Date().toISOString(),
  };
  await saveSets([...sets, newSet]);
  return newSet;
};

export const deleteSet = async (id: string): Promise<void> => {
  const [sets, missions] = await Promise.all([getSets(), getMissions()]);
  // Cascade: remove missions belonging to this set
  const updatedMissions = missions.filter((m) => m.setId !== id);
  const updatedSets = sets.filter((s) => s.id !== id);
  await Promise.all([saveSets(updatedSets), saveMissions(updatedMissions)]);
};

// ─── Missions ─────────────────────────────────────────────────────────────────
export const getMissions = async (): Promise<Mission[]> => {
  const raw = await AsyncStorage.getItem(KEYS.MISSIONS);
  return raw ? (JSON.parse(raw) as Mission[]) : [];
};

const saveMissions = async (missions: Mission[]): Promise<void> => {
  await AsyncStorage.setItem(KEYS.MISSIONS, JSON.stringify(missions));
};

export const createMission = async (
  data: Pick<Mission, 'title' | 'description' | 'priority' | 'setId'>
): Promise<Mission> => {
  const missions = await getMissions();
  const newMission: Mission = {
    id: generateId(),
    setId: data.setId,
    title: data.title,
    ...(data.description ? { description: data.description } : {}),
    priority: data.priority,
    xpReward: xpForPriority(data.priority),
    createdAt: new Date().toISOString(),
  };
  await saveMissions([...missions, newMission]);
  return newMission;
};

export const deleteMission = async (id: string): Promise<void> => {
  const missions = await getMissions();
  await saveMissions(missions.filter((m) => m.id !== id));
};

// ─── Daily Completions ────────────────────────────────────────────────────────
export const getCompletions = async (): Promise<DailyCompletion[]> => {
  const raw = await AsyncStorage.getItem(KEYS.COMPLETIONS);
  return raw ? (JSON.parse(raw) as DailyCompletion[]) : [];
};

const saveCompletions = async (completions: DailyCompletion[]): Promise<void> => {
  await AsyncStorage.setItem(KEYS.COMPLETIONS, JSON.stringify(completions));
};

export const getTodayCompletions = async (): Promise<DailyCompletion[]> => {
  const all = await getCompletions();
  const today = todayDateString();
  return all.filter((c) => c.completedDate === today);
};

export const addCompletion = async (
  missionId: string,
  xpEarned: number
): Promise<DailyCompletion> => {
  const completions = await getCompletions();
  const today = todayDateString();
  // Idempotent — no double-completion for the same mission on the same day
  const existing = completions.find(
    (c) => c.missionId === missionId && c.completedDate === today
  );
  if (existing) return existing;

  const newCompletion: DailyCompletion = { missionId, completedDate: today, xpEarned };
  await saveCompletions([...completions, newCompletion]);
  return newCompletion;
};

export const removeCompletion = async (missionId: string): Promise<void> => {
  const completions = await getCompletions();
  const today = todayDateString();
  await saveCompletions(
    completions.filter((c) => !(c.missionId === missionId && c.completedDate === today))
  );
};

// ─── Seeding ──────────────────────────────────────────────────────────────────
// Seeds default Weekday + Weekend mission sets on first app launch.
// Only runs if no sets exist yet.
export const seedDefaultSetsIfEmpty = async (): Promise<void> => {
  const existing = await getSets();
  if (existing.length > 0) return;

  const weekdaySet: MissionSet = {
    id: generateId(),
    name: 'Weekday Missions',
    activeDays: [1, 2, 3, 4, 5], // Mon–Fri
    createdAt: new Date().toISOString(),
  };
  const weekendSet: MissionSet = {
    id: generateId(),
    name: 'Weekend Missions',
    activeDays: [0, 6], // Sun, Sat
    createdAt: new Date().toISOString(),
  };
  await saveSets([weekdaySet, weekendSet]);
};
