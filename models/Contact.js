// models/Contact.js
import mongoose from "mongoose";

const studioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  location: { type: String, required: true },
});

export const Studio = mongoose.model('Studio', studioSchema);

const contactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    projectLocation: { type: String },
    projectType: {
      type: String,
      enum: ["residential", "commercial", "hospitality", "retail", ""],
    },
    message: { type: String },
    fileUrl: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
