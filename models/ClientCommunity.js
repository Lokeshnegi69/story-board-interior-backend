import mongoose from "mongoose";

const ClientCommunitySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    testimonial: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ClientCommunity", ClientCommunitySchema);
