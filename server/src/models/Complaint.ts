import mongoose, { Document, Schema } from 'mongoose';

export interface IComplaint extends Document {
  referenceNumber: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  reportedBy: mongoose.Types.ObjectId;
  village: string;
  district: string;
  status: 'pending' | 'in-progress' | 'resolved';
  responses: Array<{
    message: string;
    respondedBy: mongoose.Types.ObjectId;
    respondedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const complaintSchema = new Schema<IComplaint>({
  referenceNumber: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['roads', 'water', 'sanitation', 'streetlights', 'electricity', 'other']
  },
  images: [{ type: String }],
  reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  village: { type: String, required: true },
  district: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' },
  responses: [{
    message: String,
    respondedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    respondedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export const Complaint = mongoose.model<IComplaint>('Complaint', complaintSchema);
