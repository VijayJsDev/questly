// src/features/auth/store/authStore.ts
//
// Zustand store for authentication state.
//
// This is a STUB — business logic will be added in a later phase.
// The store shape and action signatures are defined now so other parts
// of the app can type-safely reference auth state even before it's wired up.

import { create } from 'zustand';

import type { User } from '../types';

interface AuthStoreState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // Actions (stubs — implementation comes in business logic phase)
  login: (name: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (_name: string) => {
    // TODO: Implement in auth feature phase
    // Will create a User, persist to SecureStore + AsyncStorage, set isAuthenticated
    set({ isLoading: true });
    set({ isLoading: false });
  },

  logout: async () => {
    // TODO: Clear SecureStore, AsyncStorage user data, reset state
    set({ user: null, isAuthenticated: false });
  },

  restoreSession: async () => {
    // TODO: Read from SecureStore on app launch to restore session
    set({ isLoading: true });
    set({ isLoading: false });
  },
}));
