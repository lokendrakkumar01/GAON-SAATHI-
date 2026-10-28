import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  category: string;
  wage: string;
  location: string;
  village: string;
  district: string;
  postedBy: mongoose.Types.ObjectId;
  contactPhone: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  wage: { type: String, required: true },
  location: { type: String, required: true },
  village: { type: String, required: true },
  district: { type: String, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contactPhone: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Job = mongoose.model<IJob>('Job', jobSchema);
