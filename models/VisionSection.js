import mongoose from "mongoose";

const VisionSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    paragraphs: [{ type: String, required: true }],
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("VisionSection", VisionSectionSchema);
