import mongoose from "mongoose";

const aboutCTASchema = new mongoose.Schema({
  heading: { type: String, required: true },
  buttonText: { type: String, required: true },
  buttonLink: { type: String, required: true },
  backgroundImage: { type: String, required: true }
});

export default mongoose.model("AboutCTA", aboutCTASchema);
