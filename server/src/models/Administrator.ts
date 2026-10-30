import mongoose, { Document, Schema } from 'mongoose';

export interface IAdministrator extends Document {
  name: string;
  email: string;
  password: string;
  role: 'super_admin' | 'admin';
  permissions: string[];
  isActive: boolean;
  createdAt: Date;
}

const administratorSchema = new Schema<IAdministrator>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['super_admin', 'admin'], required: true },
  permissions: { type: [String], default: [] },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Administrator = mongoose.model<IAdministrator>('Administrator', administratorSchema);
