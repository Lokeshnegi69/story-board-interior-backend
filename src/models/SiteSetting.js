const mongoose = require('mongoose');
const { Schema } = mongoose;

const SiteSettingSchema = new Schema(
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

module.exports = mongoose.model('SiteSetting', SiteSettingSchema);
