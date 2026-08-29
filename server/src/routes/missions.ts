import { Router, Request, Response } from 'express';
import { Mission } from '../models/Mission.js';
import { DailyCompletion } from '../models/DailyCompletion.js';

export const missionsRouter = Router();

const XP_MAP: Record<'low' | 'medium' | 'high', number> = {
  low: 10,
  medium: 25,
  high: 50,
};

// GET /api/missions — fetch all missions (or filtered by ?setId=...)
missionsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { setId } = req.query;
    const filter = setId ? { setId: String(setId) } : {};
    const missions = await Mission.find(filter).sort({ createdAt: 1 });
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch missions' });
  }
});

// POST /api/missions — create mission
missionsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, priority, setId } = req.body;
    if (!title || !setId) {
      res.status(400).json({ error: 'Title and setId are required' });
      return;
    }

    const missionPriority: 'low' | 'medium' | 'high' =
      ['low', 'medium', 'high'].includes(priority) ? priority : 'medium';

    const xpReward = XP_MAP[missionPriority];

    const mission = new Mission({
      title,
      description,
      priority: missionPriority,
      setId,
      xpReward,
    });

    await mission.save();
    res.status(201).json(mission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create mission' });
  }
});

// DELETE /api/missions/:id — delete mission
missionsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Mission.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ error: 'Mission not found' });
      return;
    }

    // Also clean up any completion records for this mission
    await DailyCompletion.deleteMany({ missionId: id });

    res.json({ message: 'Mission deleted', id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete mission' });
  }
});
