// src/types/index.ts
//
// Global shared TypeScript types used across multiple features.
// Feature-specific types live in their respective feature/types.ts files.

// ─── Common ───────────────────────────────────────────────────────────────────
export type ID = string;
export type ISODateString = string; // e.g. "2026-08-04T00:00:00.000Z"

// ─── Result Type ──────────────────────────────────────────────────────────────
// A discriminated union for operations that can succeed or fail.
// Avoids throwing errors in service functions; instead return a Result.
export type Result<T, E = string> =
  | { success: true; data: T }
  | { success: false; error: E };

// ─── Pagination ───────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ─── App Settings ─────────────────────────────────────────────────────────────
export interface AppSettings {
  themePreference: 'dark' | 'light' | 'system';
  notificationsEnabled: boolean;
  dailyReminderTime: string | null; // "HH:MM" format
  hapticFeedbackEnabled: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  themePreference: 'dark',
  notificationsEnabled: false,
  dailyReminderTime: null,
  hapticFeedbackEnabled: true,
};
