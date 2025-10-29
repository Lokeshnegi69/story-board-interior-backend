// controllers/CtaController.js
import Cta from "../models/cta.js";

// GET CTA
export const getCta = async (req, res) => {
  try {
    const cta = await Cta.findOne(); // assuming one CTA section
    res.json(cta);
  } catch (error) {
    res.status(500).json({ message: "Error fetching CTA", error });
  }
};

// ADD CTA
export const addCta = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Background image is required" });
    }

    const imageUrl = req.file.path; // Cloudinary URL

    const cta = await Cta.create({
      ...req.body,
      backgroundImage: imageUrl,
    });

    res.status(201).json(cta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding CTA", error: error.message });
  }
};

// UPDATE CTA
export const updateCta = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : undefined;

    const updateData = {
      ...req.body,
    };
    if (imageUrl) updateData.backgroundImage = imageUrl;

    // Update the first CTA or create if not exists
    const updated = await Cta.findOneAndUpdate({}, updateData, { new: true, upsert: true });

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating CTA", error: error.message });
  }
};