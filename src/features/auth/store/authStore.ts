// src/features/auth/store/authStore.ts
//
// Zustand store for authentication state.
//
// login() is a DEVELOPMENT STUB that creates a local user immediately.
// Full implementation (SecureStore persistence, onboarding form) comes
// in the auth feature phase. For now this lets us navigate the entire app.

import { create } from 'zustand';

import type { User } from '../types';

interface AuthStoreState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (name: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (name: string) => {
    set({ isLoading: true });

    // Dev stub: create a local user immediately without any network/storage call.
    // TODO (auth phase): replace with real onboarding + SecureStore persistence.
    const user: User = {
      id: `local-${Date.now()}`,
      name: name || 'Adventurer',
      createdAt: new Date().toISOString(),
      totalXP: 0,
      currentStreak: 0,
      longestStreak: 0,
    };

    set({ user, isAuthenticated: true, isLoading: false });
  },

  logout: async () => {
    // TODO (auth phase): clear SecureStore + AsyncStorage
    set({ user: null, isAuthenticated: false });
  },

  restoreSession: async () => {
    // TODO (auth phase): read token from SecureStore on app launch
    // For now, every cold launch starts unauthenticated (no persistence yet)
    set({ isLoading: false });
  },
}));
