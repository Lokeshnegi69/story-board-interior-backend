import AboutSection from "../models/AboutSection.js";

// GET the about section (latest)
export const getAboutSection = async (req, res) => {
  try {
    const about = await AboutSection.findOne().sort({ createdAt: -1 }); // latest
    if (!about) return res.status(404).json({ message: "About section not found" });
    res.status(200).json(about);
  } catch (err) {
    console.error("getAboutSection:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST new about section (optional, for admin use)
export const createAboutSection = async (req, res) => {
  try {
    const { heading, paragraphs, imageUrl, buttonText, buttonIcon, buttonLink } = req.body;
    const about = await AboutSection.create({ heading, paragraphs, imageUrl, buttonText, buttonIcon, buttonLink });
    res.status(201).json(about);
  } catch (err) {
    console.error("createAboutSection:", err);
    res.status(500).json({ message: "Failed to create about section" });
  }
};
