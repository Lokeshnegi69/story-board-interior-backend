import mongoose from "mongoose";

const beforeAfterTestimonialSchema = new mongoose.Schema({
  beforeImage: { type: String, required: true },
  afterImage: { type: String, required: true },
  quote: { type: String, required: true }
});

const BeforeAfterTestimonial = mongoose.model("BeforeAfterTestimonial", beforeAfterTestimonialSchema);
export default BeforeAfterTestimonial;
