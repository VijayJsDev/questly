import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { connectDB } from './config/db.js';
import { setsRouter } from './routes/sets.js';
import { missionsRouter } from './routes/missions.js';
import { completionsRouter } from './routes/completions.js';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: '🚀 Questly API is live and running!' });
});

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: dbStatus,
  });
});

// API Routes
app.use('/api/sets', setsRouter);
app.use('/api/missions', missionsRouter);
app.use('/api/completions', completionsRouter);

// Start listening
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Questly Server running on http://0.0.0.0:${PORT}`);
});
