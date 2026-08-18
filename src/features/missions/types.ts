// src/features/missions/types.ts

import { z } from 'zod';
import type { ID, ISODateString } from '@/types';
import { MISSION_LIMITS } from '@/lib/constants';

// ─── Day of Week ──────────────────────────────────────────────────────────────
// 0 = Sunday, 1 = Monday, ..., 6 = Saturday (matches JS Date.getDay())
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const DAY_LABELS: Record<DayOfWeek, string> = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

export const DAY_FULL_LABELS: Record<DayOfWeek, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

// ─── Mission Set ──────────────────────────────────────────────────────────────
// A MissionSet is a named group of missions that are active on specific days.
// e.g. "Weekday Grind" active on [1,2,3,4,5], "Weekend Chill" on [0,6]
export interface MissionSet {
  id: ID;
  name: string;
  activeDays: DayOfWeek[];   // days this set is active
  createdAt: ISODateString;
}

// ─── Mission ──────────────────────────────────────────────────────────────────
// A Mission is a repeatable task template belonging to a MissionSet.
// Completion state is tracked separately in DailyCompletion (not on the mission itself)
// so the same mission can be completed/uncompleted each active day independently.
export type MissionPriority = 'low' | 'medium' | 'high';

export interface Mission {
  id: ID;
  setId: ID;                  // which MissionSet this mission belongs to
  title: string;
  description?: string;
  priority: MissionPriority;
  xpReward: number;           // pre-computed from priority at creation time
  createdAt: ISODateString;
}

// ─── Daily Completion ─────────────────────────────────────────────────────────
// Records that a mission was completed on a specific calendar date.
// Keyed by (missionId + completedDate) — one record per mission per day.
export interface DailyCompletion {
  missionId: ID;
  completedDate: string;      // 'YYYY-MM-DD' local date
  xpEarned: number;
}

// ─── Zod Schemas ──────────────────────────────────────────────────────────────
export const missionSetSchema = z.object({
  name: z
    .string()
    .min(1, 'Set name is required')
    .max(50, 'Set name must be 50 characters or less'),
  activeDays: z
    .array(z.union([
      z.literal(0), z.literal(1), z.literal(2), z.literal(3),
      z.literal(4), z.literal(5), z.literal(6),
    ]))
    .min(1, 'Select at least one day'),
});

export const missionSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(MISSION_LIMITS.MAX_TITLE_LENGTH, `Title must be ${MISSION_LIMITS.MAX_TITLE_LENGTH} chars or less`),
  description: z
    .string()
    .max(MISSION_LIMITS.MAX_DESCRIPTION_LENGTH)
    .optional(),
  priority: z.enum(['low', 'medium', 'high']),
  setId: z.string().min(1, 'Please select a mission set'),
});

export type MissionSetFormData = z.infer<typeof missionSetSchema>;
export type MissionFormData = z.infer<typeof missionSchema>;
