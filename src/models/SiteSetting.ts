import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISiteSetting extends Document {
  key: string;
  value: any;
  description?: string;
  updated_by?: Types.ObjectId;
}

const SiteSettingSchema = new Schema<ISiteSetting>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    value: {
      type: Schema.Types.Mixed,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    updated_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

SiteSettingSchema.index({ key: 1 });

export default mongoose.model<ISiteSetting>('SiteSetting', SiteSettingSchema);
