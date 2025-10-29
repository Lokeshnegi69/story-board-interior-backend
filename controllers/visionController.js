import VisionSection from "../models/VisionSection.js";

// GET Vision Section
export const getVisionSection = async (_req, res) => {
  try {
    const section = await VisionSection.findOne();
    res.status(200).json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// POST Vision Section
export const addVisionSection = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = req.file.path; // Cloudinary URL
    const { heading, paragraphs } = req.body;

    const section = new VisionSection({
      heading,
      paragraphs,
      imageUrl,
    });

    await section.save();
    res.status(201).json(section);
  } catch (err) {
    console.error("addVisionSection error:", err);
    res.status(500).json({ message: "Failed to add vision section", error: err.message });
  }
};

// PUT Vision Section
export const updateVisionSection = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : undefined;

    const updateData = { ...req.body };
    if (imageUrl) updateData.imageUrl = imageUrl;

    const section = await VisionSection.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!section) return res.status(404).json({ message: "Vision section not found" });

    res.status(200).json(section);
  } catch (err) {
    console.error("updateVisionSection error:", err);
    res.status(500).json({ message: "Failed to update vision section", error: err.message });
  }
};