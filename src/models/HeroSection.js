const mongoose = require('mongoose');
const { Schema } = mongoose;

const HeroSectionSchema = new Schema(
  {
    page: {
      type: String,
      required: true,
      trim: true,
    },
    background_image: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

HeroSectionSchema.index({ is_active: 1 });

module.exports = mongoose.model('HeroSection', HeroSectionSchema);
