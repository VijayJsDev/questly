import mongoose, { Schema, Document } from 'mongoose';

export interface IMissionSet extends Document {
  name: string;
  activeDays: number[];
  createdAt: Date;
}

const MissionSetSchema = new Schema<IMissionSet>(
  {
    name: {
      type: String,
      required: [true, 'Set name is required'],
      trim: true,
      maxlength: 50,
    },
    activeDays: {
      type: [Number],
      required: [true, 'Active days are required'],
      validate: {
        validator: (arr: number[]) => arr.length > 0 && arr.every((d) => d >= 0 && d <= 6),
        message: 'Must specify at least one valid day (0-6)',
      },
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

export const MissionSet = mongoose.model<IMissionSet>('MissionSet', MissionSetSchema);
