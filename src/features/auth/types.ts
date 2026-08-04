// src/features/auth/types.ts

import type { ID, ISODateString } from '@/types';

export interface User {
  id: ID;
  name: string;
  avatar?: string;
  createdAt: ISODateString;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
