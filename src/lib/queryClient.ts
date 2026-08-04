// src/lib/queryClient.ts
//
// TanStack Query client configuration.
//
// Key decisions:
// - staleTime: 5 minutes — for local AsyncStorage data that doesn't change
//   server-side, there's no reason to refetch every second. This prevents
//   unnecessary storage reads and reduces UI flickering.
// - retry: 2 — if a storage read fails (device under load), retry twice before
//   showing an error. More than 2 retries degrades UX.
// - refetchOnWindowFocus: false — on mobile, "window focus" means app foregrounding.
//   We don't want missions to re-fetch every time the user checks their notifications.
//   We'll invalidate queries manually on meaningful events instead.
// - gcTime: 10 minutes — how long inactive query data stays in the cache.

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,       // 5 minutes
      gcTime: 1000 * 60 * 10,         // 10 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,       // Local data — no network dependency
    },
    mutations: {
      retry: 1,
    },
  },
});
