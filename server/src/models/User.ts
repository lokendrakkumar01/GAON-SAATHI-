import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phone: string;
  email?: string;
  password: string;
  village?: string;
  district: string;
  state: string;
  roles: string[];
  preferredLanguage: 'hi' | 'en';
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: [true, 'नाम आवश्यक है'], trim: true },
  phone: { type: String, required: [true, 'मोबाइल नंबर आवश्यक है'], unique: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  password: { type: String, required: [true, 'पासवर्ड आवश्यक है'], minlength: 6, select: false },
  village: { type: String, trim: true },
  district: { type: String, required: [true, 'जिला आवश्यक है'], trim: true },
  state: { type: String, default: 'उत्तर प्रदेश', trim: true },
  roles: { 
    type: [String], 
    enum: ['Villager', 'Farmer', 'Seller', 'Student', 'Service Provider', 'Administrator'],
    default: ['Villager']
  },
  preferredLanguage: { type: String, enum: ['hi', 'en'], default: 'hi' },
  avatar: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
