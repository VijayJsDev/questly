// src/features/missions/types.ts

import type { ID, ISODateString } from '@/types';

// Priority affects XP reward and visual urgency styling
export type MissionPriority = 'low' | 'medium' | 'high';

// Status lifecycle: pending → completed or skipped
export type MissionStatus = 'pending' | 'completed' | 'skipped';

export interface Mission {
  id: ID;
  title: string;
  description?: string;
  priority: MissionPriority;
  status: MissionStatus;
  xpReward: number;           // Points earned on completion
  resetDaily: boolean;        // If true, resets to 'pending' each day at midnight
  createdAt: ISODateString;
  completedAt?: ISODateString;
  // Future: category, tags, due date, recurrence rules
}

// ─── Zod Schema (validation) ──────────────────────────────────────────────────
// Defined here so it's co-located with the type. Used in Create/Edit mission forms.
import { z } from 'zod';
import { MISSION_LIMITS } from '@/lib/constants';

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
  resetDaily: z.boolean(),
});

export type MissionFormData = z.infer<typeof missionSchema>;
