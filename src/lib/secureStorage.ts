// src/lib/secureStorage.ts
//
// Expo Secure Store wrapper for sensitive data (auth tokens, user credentials).
//
// Expo Secure Store uses:
// - iOS: Keychain Services
// - Android: Android Keystore
// Both are hardware-backed encrypted storage — far more secure than AsyncStorage
// which stores plain text in the app's data directory.
//
// Limitation: Secure Store values must be strings < 2KB.
// Don't store large data here — only tokens, PINs, secrets.

import * as SecureStore from 'expo-secure-store';

export const SECURE_KEYS = {
  AUTH_TOKEN: 'questly_auth_token',
  USER_ID: 'questly_user_id',
} as const;

export type SecureKey = (typeof SECURE_KEYS)[keyof typeof SECURE_KEYS];

export async function secureGet(key: SecureKey): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(`[SecureStore] Failed to read key "${key}":`, error);
    return null;
  }
}

export async function secureSet(key: SecureKey, value: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`[SecureStore] Failed to write key "${key}":`, error);
    throw error;
  }
}

export async function secureDelete(key: SecureKey): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`[SecureStore] Failed to delete key "${key}":`, error);
    throw error;
  }
}
