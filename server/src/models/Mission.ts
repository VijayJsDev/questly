import mongoose, { Schema, Document } from 'mongoose';

export interface IMission extends Document {
  setId: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  xpReward: number;
  createdAt: Date;
}

const MissionSchema = new Schema<IMission>(
  {
    setId: {
      type: String,
      required: [true, 'setId is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 80,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
      default: 'medium',
    },
    xpReward: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      transform: (_, ret: Record<string, any>) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Mission = mongoose.model<IMission>('Mission', MissionSchema);
