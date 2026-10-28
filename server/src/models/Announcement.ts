import mongoose, { Document, Schema } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  type: 'general' | 'urgent' | 'event';
  village?: string;
  district?: string;
  postedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const announcementSchema = new Schema<IAnnouncement>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['general', 'urgent', 'event'], default: 'general' },
  village: { type: String },
  district: { type: String },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Announcement = mongoose.model<IAnnouncement>('Announcement', announcementSchema);
