import mongoose from "mongoose";

const instagramPostSchema = new mongoose.Schema(
  {
    image: { type: String, required: true }, // Image URL
    overlayIcon: { type: String }, // Optional: overlay icon on top of image
  },
  { timestamps: true }
);

const InstagramPost = mongoose.model("InstagramPost", instagramPostSchema);

export default InstagramPost;
