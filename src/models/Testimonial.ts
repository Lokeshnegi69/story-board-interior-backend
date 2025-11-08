import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITestimonial extends Document {
  client_name: string;
  client_position?: string;
  client_company?: string;
  client_avatar?: string;
  rating: number;
  testimonial_text: string;
  project_id?: Types.ObjectId;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
}

const TestimonialSchema = new Schema<ITestimonial>(
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

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
