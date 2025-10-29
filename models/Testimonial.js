import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    client: { type: String, required: true },
    image: { type: String }, 
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
