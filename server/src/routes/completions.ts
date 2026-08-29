import { Router, Request, Response } from 'express';
import { DailyCompletion } from '../models/DailyCompletion.js';

export const completionsRouter = Router();

const getTodayString = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// GET /api/completions/today — get completions for a specific date (defaults to today)
completionsRouter.get('/today', async (req: Request, res: Response) => {
  try {
    const date = (req.query.date as string) || getTodayString();
    const completions = await DailyCompletion.find({ completedDate: date });
    res.json(completions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch completions' });
  }
});

// POST /api/completions — record a completion (idempotent upsert)
completionsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { missionId, xpEarned, completedDate } = req.body;
    if (!missionId || xpEarned === undefined) {
      res.status(400).json({ error: 'missionId and xpEarned are required' });
      return;
    }

    const date = completedDate || getTodayString();

    const completion = await DailyCompletion.findOneAndUpdate(
      { missionId, completedDate: date },
      { $setOnInsert: { missionId, completedDate: date, xpEarned } },
      { upsert: true, new: true }
    );

    res.status(201).json(completion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to record completion' });
  }
});

// DELETE /api/completions/:missionId — remove a completion for date
completionsRouter.delete('/:missionId', async (req: Request, res: Response) => {
  try {
    const { missionId } = req.params;
    const date = (req.query.date as string) || getTodayString();

    const deleted = await DailyCompletion.findOneAndDelete({
      missionId,
      completedDate: date,
    });

    res.json({
      message: 'Completion removed',
      missionId,
      xpEarned: deleted?.xpEarned ?? 0,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove completion' });
  }
});
