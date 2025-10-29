import mongoose from "mongoose";

const TestimonialHeroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    backgroundImage: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("TestimonialHero", TestimonialHeroSchema);
