import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    imageUrl: { type: String, required: true }, 
    scrollText: { type: String, default: "Scroll to Explore" },
    scrollIconUrl: { type: String },            
  },
  { timestamps: true }
);

export default mongoose.model("Hero", HeroSchema);