import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String }, // URL or uploads folder path
    tags: [{ type: String }],
    status: { type: String, enum: ["Draft", "Published"], default: "Published" },
    featured: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
