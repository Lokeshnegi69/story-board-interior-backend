const mongoose = require('mongoose');
const { Schema } = mongoose;

const InquirySchema = new Schema(
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

module.exports = mongoose.model('Inquiry', InquirySchema);
