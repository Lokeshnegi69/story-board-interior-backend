const mongoose = require('mongoose');
const { Schema } = mongoose;

const TestimonialSchema = new Schema(
  {
    client_name: {
      type: String,
      required: true,
      trim: true,
    },
    client_position: {
      type: String,
      trim: true,
    },
    client_company: {
      type: String,
      trim: true,
    },
    client_avatar: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    testimonial_text: {
      type: String,
      required: true,
      trim: true,
    },
    project_id: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
    display_order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

TestimonialSchema.index({ is_published: 1 });
TestimonialSchema.index({ is_featured: 1 });
TestimonialSchema.index({ display_order: 1 });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
