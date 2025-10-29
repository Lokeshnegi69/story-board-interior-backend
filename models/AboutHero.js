import mongoose from "mongoose";

const AboutHeroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    backgroundImage: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("AboutHero", AboutHeroSchema);
