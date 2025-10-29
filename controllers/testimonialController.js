import Testimonial from "../models/Testimonial.js";

// GET all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json(testimonials);
  } catch (err) {
    console.error("getTestimonials error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST a new testimonial (admin use)
export const createTestimonial = async (req, res) => {
   try {
    const { text, client, project } = req.body;
    const image = req.file ? req.file.path : ""; 

    const newTestimonial = await Testimonial.create({
      text,
      client,
      project,
      image,
    });

    res.status(201).json(newTestimonial);
  } catch (err) {
    console.error("createTestimonial error:", err);
    res.status(500).json({ message: "Failed to create testimonial" });
  }
};

export const deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Testimonial not found" });
    res.json({ message: "Testimonial deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    const updateData = { ...req.body };

    // If an image file is uploaded, add its Cloudinary URL
    if (req.file?.path) {
      updateData.image = req.file.path;
    }

    const updated = await Testimonial.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: "Testimonial not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};