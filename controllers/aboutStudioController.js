import AboutStudio from "../models/AboutStudio.js";

// GET about section
export const getAboutStudio = async (_req, res) => {
  try {
    const about = await AboutStudio.findOne();
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD about section
export const addAboutStudio = async (req, res) => {
  try {
    const about = await AboutStudio.create(req.body);
    res.status(201).json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE about section
export const updateAboutStudio = async (req, res) => {
  try {
    const about = await AboutStudio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
