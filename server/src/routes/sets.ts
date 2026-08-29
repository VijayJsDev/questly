import { Router, Request, Response } from 'express';
import { MissionSet } from '../models/MissionSet.js';
import { Mission } from '../models/Mission.js';

export const setsRouter = Router();

// GET /api/sets — fetch all sets
setsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const sets = await MissionSet.find().sort({ createdAt: 1 });
    res.json(sets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mission sets' });
  }
});

// POST /api/sets — create set
setsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { name, activeDays } = req.body;
    if (!name || !activeDays || !Array.isArray(activeDays) || activeDays.length === 0) {
      res.status(400).json({ error: 'Name and activeDays (array) are required' });
      return;
    }

    const set = new MissionSet({ name, activeDays });
    await set.save();
    res.status(201).json(set);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create mission set' });
  }
});

// DELETE /api/sets/:id — delete set + cascade delete missions
setsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await MissionSet.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ error: 'Mission set not found' });
      return;
    }

    // Cascade delete missions belonging to this set
    await Mission.deleteMany({ setId: id });

    res.json({ message: 'Set and associated missions deleted', id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete mission set' });
  }
});

// POST /api/sets/seed — seed default Weekday and Weekend sets if empty
setsRouter.post('/seed', async (_req: Request, res: Response) => {
  try {
    const count = await MissionSet.countDocuments();
    if (count > 0) {
      res.json({ message: 'Mission sets already exist, skipping seed' });
      return;
    }

    const weekdaySet = await MissionSet.create({
      name: 'Weekday Missions',
      activeDays: [1, 2, 3, 4, 5],
    });

    const weekendSet = await MissionSet.create({
      name: 'Weekend Missions',
      activeDays: [0, 6],
    });

    res.status(201).json({
      message: 'Default sets seeded successfully',
      sets: [weekdaySet, weekendSet],
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to seed default sets' });
  }
});
