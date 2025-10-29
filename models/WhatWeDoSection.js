import mongoose from "mongoose";

const WhatWeDoSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    buttonText: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("WhatWeDoSection", WhatWeDoSectionSchema);
