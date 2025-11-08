import mongoose, { Schema, Document } from 'mongoose';

export interface IHeroSection extends Document {
  page: string;
  background_image?: string;
  is_active: boolean;
}

const HeroSectionSchema = new Schema<IHeroSection>(
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

export default mongoose.model<IHeroSection>('HeroSection', HeroSectionSchema);
