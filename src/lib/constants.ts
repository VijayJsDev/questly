// src/lib/constants.ts
//
// App-wide constants. These are values that are fixed at build time and shared
// across multiple features. Environment-variable values (that differ between dev
// and prod) live in app.config.ts, not here.

export const APP_NAME = 'Questly';
export const APP_VERSION = '1.0.0';

// ─── API Configuration ────────────────────────────────────────────────────────
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:5000';

// ─── Gamification ─────────────────────────────────────────────────────────────
export const XP_VALUES = {
  MISSION_COMPLETE_LOW: 10,
  MISSION_COMPLETE_MEDIUM: 25,
  MISSION_COMPLETE_HIGH: 50,
  STREAK_BONUS_PER_DAY: 5,    // Bonus XP added per streak day
  MAX_STREAK_BONUS: 50,       // Cap on streak bonus
} as const;

export const STREAK = {
  RESET_HOUR: 0,              // Reset at midnight (local time)
  GRACE_PERIOD_HOURS: 2,      // 2hr grace period past midnight
} as const;

// ─── Mission Limits ────────────────────────────────────────────────────────────
export const MISSION_LIMITS = {
  MAX_TITLE_LENGTH: 80,
  MAX_DESCRIPTION_LENGTH: 300,
  MAX_DAILY_MISSIONS: 20,
} as const;

// ─── Animation Durations (ms) ─────────────────────────────────────────────────
export const ANIMATION = {
  FAST: 150,
  DEFAULT: 250,
  SLOW: 400,
  SPRING_DAMPING: 15,
  SPRING_STIFFNESS: 120,
} as const;

// ─── Query Keys ───────────────────────────────────────────────────────────────
// Centralized TanStack Query keys — prevents cache key collisions.
export const QUERY_KEYS = {
  missions: ['missions'] as const,
  missionById: (id: string) => ['missions', id] as const,
  missionsBySet: (setId: string) => ['missions', 'set', setId] as const,
  missionSets: ['mission-sets'] as const,
  missionSetById: (id: string) => ['mission-sets', id] as const,
  todaysMissions: ['missions', 'today'] as const,
  todayCompletions: ['completions', 'today'] as const,
  completions: ['completions'] as const,
  stats: ['stats'] as const,
  statsDaily: (date: string) => ['stats', 'daily', date] as const,
  statsWeekly: (weekStart: string) => ['stats', 'weekly', weekStart] as const,
  streak: ['streak'] as const,
} as const;

