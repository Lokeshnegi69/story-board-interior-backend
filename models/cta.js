// models/Cta.js
import mongoose from "mongoose";

const ctaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  buttonText: { type: String, required: true },
  backgroundImage: { type: String, required: true }
});

export default mongoose.model("Cta", ctaSchema);
