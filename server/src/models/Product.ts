import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  images: string[];
  seller: mongoose.Types.ObjectId;
  village: string;
  district: string;
  availability: 'available' | 'sold' | 'unavailable';
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['vegetables', 'grains', 'dairy', 'groceries', 'crafts', 'other']
  },
  price: { type: Number, required: true, min: 0 },
  unit: { type: String, default: 'प्रति इकाई' },
  images: [{ type: String }],
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  village: { type: String, required: true },
  district: { type: String, required: true },
  availability: { type: String, enum: ['available', 'sold', 'unavailable'], default: 'available' },
  isApproved: { type: Boolean, default: true }
}, { timestamps: true });

export const Product = mongoose.model<IProduct>('Product', productSchema);
