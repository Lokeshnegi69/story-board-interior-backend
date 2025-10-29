import mongoose from "mongoose";

const featuredTestimonialSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  designation: { type: String, required: true }, 
  imageUrl: { type: String, required: true }, // testimonial image
});

const FeaturedTestimonial = mongoose.model("FeaturedTestimonial", featuredTestimonialSchema);
export default FeaturedTestimonial;
