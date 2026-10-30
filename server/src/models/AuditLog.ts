import mongoose, { Document, Schema } from 'mongoose';

export interface IAuditLog extends Document {
  actor: mongoose.Types.ObjectId;
  actorEmail: string;
  action: string;
  targetType: string;
  targetId?: string;
  context?: Record<string, unknown>;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>({
  actor: { type: Schema.Types.ObjectId, ref: 'Administrator', required: true },
  actorEmail: { type: String, required: true },
  action: { type: String, required: true },
  targetType: { type: String, required: true },
  targetId: String,
  context: Schema.Types.Mixed
}, { timestamps: { createdAt: true, updatedAt: false } });

auditLogSchema.index({ createdAt: -1 });
export const AuditLog = mongoose.model<IAuditLog>('AuditLog', auditLogSchema);
