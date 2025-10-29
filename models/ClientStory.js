import mongoose from "mongoose";

const ClientStorySchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    quote: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ClientStory", ClientStorySchema);
