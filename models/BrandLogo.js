import mongoose from "mongoose";

const brandLogoSchema = new mongoose.Schema(
  {
    image: { type: String, required: true }, // Logo image URL
    name: { type: String }, // Optional: brand name
    link: { type: String }, // Optional: brand website link
  },
  { timestamps: true }
);

const BrandLogo = mongoose.model("BrandLogo", brandLogoSchema);

export default BrandLogo;

