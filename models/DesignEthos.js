// models/DesignEthos.js
import mongoose from "mongoose";

const designEthosSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },        // small tagline (optional)
    description: { type: String },     // main paragraph shown in card
    imageUrl: { type: String, required: true },
    order: { type: Number, default: 0 } // for ordering cards
  },
  { timestamps: true }
);

export default mongoose.model("DesignEthos", designEthosSchema);
