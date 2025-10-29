import mongoose from "mongoose";

const AboutStudioSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("AboutStudio", AboutStudioSchema);
