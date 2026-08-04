// src/lib/storage.ts
//
// Typed AsyncStorage wrapper.
//
// WHY A WRAPPER?
// AsyncStorage only stores strings. Raw JSON.stringify/parse calls scattered
// across the codebase are fragile and lose TypeScript types.
// This wrapper provides a generic typed API so calling code never deals with
// serialization. It also centralizes error handling — if we swap AsyncStorage
// for expo-sqlite later, only this file changes.

import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Storage Keys ─────────────────────────────────────────────────────────────
// Centralized to prevent typos. Always use these constants, never raw strings.
export const STORAGE_KEYS = {
  MISSIONS: '@questly/missions',
  STATS: '@questly/stats',
  SETTINGS: '@questly/settings',
  STREAK: '@questly/streak',
  LAST_RESET_DATE: '@questly/lastResetDate',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

// ─── Generic Read ──────────────────────────────────────────────────────────────
export async function storageGet<T>(key: StorageKey): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`[Storage] Failed to read key "${key}":`, error);
    return null;
  }
}

// ─── Generic Write ─────────────────────────────────────────────────────────────
export async function storageSet<T>(key: StorageKey, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[Storage] Failed to write key "${key}":`, error);
    throw error; // Re-throw so TanStack Query mutations can handle it
  }
}

// ─── Delete ────────────────────────────────────────────────────────────────────
export async function storageRemove(key: StorageKey): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`[Storage] Failed to remove key "${key}":`, error);
    throw error;
  }
}

// ─── Clear All App Data ────────────────────────────────────────────────────────
export async function storageClearAll(): Promise<void> {
  try {
    const keys = Object.values(STORAGE_KEYS);
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('[Storage] Failed to clear all data:', error);
    throw error;
  }
}
