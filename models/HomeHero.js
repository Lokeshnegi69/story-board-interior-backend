import mongoose from "mongoose";

const homeHeroSchema = new mongoose.Schema(
 {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    ctaText: { type: String },
    overlayOpacity: { type: Number, default: 40 },
    isActive: { type: Boolean, default: false }   
  },
  { timestamps: true }
);

export default mongoose.model("HomeHero", homeHeroSchema);