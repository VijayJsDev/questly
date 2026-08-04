// src/providers/QueryProvider.tsx
//
// Wraps the entire app in TanStack Query's QueryClientProvider.
// The queryClient instance is imported from lib/queryClient.ts so it's a singleton —
// same client is used everywhere, meaning the cache is shared across all features.

import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { queryClient } from '@/lib/queryClient';

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
