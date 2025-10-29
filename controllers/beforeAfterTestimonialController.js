import BeforeAfterTestimonial from "../models/beforeAfterTestimonialModel.js";

// Get all Before/After testimonials
export const getBeforeAfterTestimonials = async (req, res) => {
  try {
    const testimonials = await BeforeAfterTestimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD BeforeAfter Testimonial
export const addBeforeAfterTestimonial = async (req, res) => {
  try {
    // req.files will contain multiple files if sent as array
    const beforeImageUrl = req.files?.beforeImage ? req.files.beforeImage[0].path : undefined;
    const afterImageUrl = req.files?.afterImage ? req.files.afterImage[0].path : undefined;

    if (!beforeImageUrl || !afterImageUrl) {
      return res.status(400).json({ error: "Both before and after images are required" });
    }

    const testimonial = new BeforeAfterTestimonial({
      beforeImage: beforeImageUrl,
      afterImage: afterImageUrl,
      quote: req.body.quote,
    });

    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};