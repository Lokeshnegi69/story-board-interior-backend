import TestimonialHero from "../models/TestimonialHero.js";

// Add new Hero Section
export const addTestimonialHero = async (req, res) => {
  try {

    
    if (!req.file) {
      return res.status(400).json({ message: "Background image is required" });
    }

    
    const { title, subtitle } = req.body;
    if (!title || !subtitle) {
  return res.status(400).json({ message: "Title and subtitle are required" });
}

    const hero = new TestimonialHero({
      title: title.toString(), 
      subtitle: subtitle.toString(),
      backgroundImage: req.file.path, 
    });

    await hero.save();
    res.status(201).json({ message: "Hero created successfully", hero });
    
  } catch (error) {
    console.error("addTestimonialHero error:", JSON.stringify(error, null, 2));
    res.status(500).json({ message: error.message , error: error?.message || error,});
  }
};

// Get Hero Section (only one expected)
export const getTestimonialHero = async (_req, res) => {
  try {
    const hero = await TestimonialHero.findOne();
    res.status(200).json(hero);
  } catch (error) {
    console.error("getTestimonialHero error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update Hero Section
export const updateTestimonialHero = async (req, res) => {
  try {
    const backgroundImage = req.file ? req.file.path : undefined;

    const updateData = { ...req.body };
    if (backgroundImage) updateData.backgroundImage = backgroundImage;

    const hero = await TestimonialHero.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true,
    });

    res.status(200).json(hero);
  } catch (error) {
    console.error("updateTestimonialHero error:", error);
    res.status(500).json({ message: error.message });
  }
};
