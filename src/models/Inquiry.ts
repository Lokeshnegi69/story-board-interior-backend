import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IInquiry extends Document {
  full_name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  project_interest?: string;
  budget_range?: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  assigned_to?: Types.ObjectId;
  notes?: string;
}

const InquirySchema = new Schema<IInquiry>(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    project_interest: {
      type: String,
      trim: true,
    },
    budget_range: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'resolved', 'closed'],
      default: 'new',
    },
    assigned_to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

InquirySchema.index({ status: 1 });
InquirySchema.index({ email: 1 });
InquirySchema.index({ createdAt: -1 });

export default mongoose.model<IInquiry>('Inquiry', InquirySchema);
