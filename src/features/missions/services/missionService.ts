// src/features/missions/services/missionService.ts
//
// API client for missions, mission sets, and daily completions.
// Connects to the Questly Express backend (which persists to MongoDB Atlas).
// TanStack Query hooks call these functions — they never make raw fetch calls directly.

import type { Mission, MissionSet, DailyCompletion } from '../types';
import { API_BASE_URL, XP_VALUES } from '@/lib/constants';

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

async function handleResponse<T>(res: Response, errorMessage: string): Promise<T> {
  if (!res.ok) {
    let errBody = '';
    try {
      errBody = await res.text();
    } catch {
      // ignore
    }
    throw new Error(`${errorMessage} (${res.status}): ${errBody || res.statusText}`);
  }
  return (await res.json()) as T;
}

// ─── Mission Sets ─────────────────────────────────────────────────────────────
export const getSets = async (): Promise<MissionSet[]> => {
  const res = await fetch(`${API_BASE_URL}/api/sets`);
  return handleResponse<MissionSet[]>(res, 'Failed to fetch mission sets');
};

export const createSet = async (
  data: Pick<MissionSet, 'name' | 'activeDays'>
): Promise<MissionSet> => {
  const res = await fetch(`${API_BASE_URL}/api/sets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<MissionSet>(res, 'Failed to create mission set');
};

export const deleteSet = async (id: string): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/api/sets/${id}`, {
    method: 'DELETE',
  });
  await handleResponse(res, 'Failed to delete mission set');
};

export const seedDefaultSetsIfEmpty = async (): Promise<void> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/sets/seed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      console.warn('Seed default sets response not ok:', res.status);
    }
  } catch (err) {
    console.warn('Failed to seed default sets (server might still be starting):', err);
  }
};

// ─── Missions ─────────────────────────────────────────────────────────────────
export const getMissions = async (setId?: string): Promise<Mission[]> => {
  const url = setId
    ? `${API_BASE_URL}/api/missions?setId=${encodeURIComponent(setId)}`
    : `${API_BASE_URL}/api/missions`;
  const res = await fetch(url);
  return handleResponse<Mission[]>(res, 'Failed to fetch missions');
};

export const createMission = async (
  data: Pick<Mission, 'title' | 'description' | 'priority' | 'setId'>
): Promise<Mission> => {
  const res = await fetch(`${API_BASE_URL}/api/missions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Mission>(res, 'Failed to create mission');
};

export const deleteMission = async (id: string): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/api/missions/${id}`, {
    method: 'DELETE',
  });
  await handleResponse(res, 'Failed to delete mission');
};

// ─── Daily Completions ────────────────────────────────────────────────────────
export const getTodayCompletions = async (): Promise<DailyCompletion[]> => {
  const today = todayDateString();
  const res = await fetch(`${API_BASE_URL}/api/completions/today?date=${today}`);
  return handleResponse<DailyCompletion[]>(res, "Failed to fetch today's completions");
};

export const getCompletions = async (): Promise<DailyCompletion[]> => {
  return getTodayCompletions();
};

export const addCompletion = async (
  missionId: string,
  xpEarned: number
): Promise<DailyCompletion> => {
  const today = todayDateString();
  const res = await fetch(`${API_BASE_URL}/api/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      missionId,
      xpEarned,
      completedDate: today,
    }),
  });
  return handleResponse<DailyCompletion>(res, 'Failed to record completion');
};

export const removeCompletion = async (missionId: string): Promise<void> => {
  const today = todayDateString();
  const res = await fetch(
    `${API_BASE_URL}/api/completions/${encodeURIComponent(missionId)}?date=${today}`,
    {
      method: 'DELETE',
    }
  );
  await handleResponse(res, 'Failed to remove completion');
};
