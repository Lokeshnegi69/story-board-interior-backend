import mongoose from "mongoose";

const aboutSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },        // e.g. "About Shalini Misra"
    paragraphs: [{ type: String, required: true }],  // array of paragraphs
    imageUrl: { type: String, required: true },      // main image
    buttonText: { type: String },                    // e.g. "Meet the Team"
    buttonIcon: { type: String },                    // icon image URL
    buttonLink: { type: String },                    // optional: link for button
  },
  { timestamps: true }
);

export default mongoose.model("AboutSection", aboutSectionSchema);
