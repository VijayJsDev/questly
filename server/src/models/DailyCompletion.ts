import mongoose, { Schema, Document } from 'mongoose';

export interface IDailyCompletion extends Document {
  missionId: string;
  completedDate: string;
  xpEarned: number;
}

const DailyCompletionSchema = new Schema<IDailyCompletion>(
  {
    missionId: {
      type: String,
      required: [true, 'missionId is required'],
      index: true,
    },
    completedDate: {
      type: String,
      required: [true, 'completedDate is required'],
      match: /^\d{4}-\d{2}-\d{2}$/,
      index: true,
    },
    xpEarned: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: false,
    toJSON: {
      transform: (_, ret: Record<string, any>) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Compound unique index for idempotency
DailyCompletionSchema.index({ missionId: 1, completedDate: 1 }, { unique: true });

export const DailyCompletion = mongoose.model<IDailyCompletion>(
  'DailyCompletion',
  DailyCompletionSchema
);
