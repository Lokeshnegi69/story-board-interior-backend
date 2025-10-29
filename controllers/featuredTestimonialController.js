import FeaturedTestimonial from "../models/featuredTestimonialModel.js";

// Get Featured Testimonial
export const getFeaturedTestimonial = async (req, res) => {
  try {
    const testimonial = await FeaturedTestimonial.findOne();
    if (!testimonial) return res.status(404).json({ message: "No featured testimonial found" });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const addFeaturedTestimonial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Testimonial image is required" });
    } 
    console.log("req.body:", req.body);

    const imageUrl = req.file.path; // Cloudinary URL
    const { quote, description, author, designation } = req.body;

    const newTestimonial = await FeaturedTestimonial.create({
      quote,
      description,
      author,
      designation,
      imageUrl,
    });

    res.status(201).json(newTestimonial);
  } catch (err) {
    console.error("addFeaturedTestimonial error:", err);
    res.status(400).json({ error: err.message });
  }
};

// UPDATE Featured Testimonial
export const updateFeaturedTestimonial = async (req, res) => {
  const { id } = req.params; // get id from URL
  try {
    const imageUrl = req.file ? req.file.path : undefined;

    const updateData = { ...req.body };
    if (imageUrl) updateData.imageUrl = imageUrl; // update image only if uploaded

    const updated = await FeaturedTestimonial.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: "Testimonial not found" });

    res.json(updated);
  } catch (err) {
    console.error("updateFeaturedTestimonial error:", err);
    res.status(400).json({ error: err.message });
  }
};

export const deleteFeaturedTestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await FeaturedTestimonial.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Testimonial not found" });
    res.json({ message: "Testimonial deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
