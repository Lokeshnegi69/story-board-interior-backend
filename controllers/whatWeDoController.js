import WhatWeDoSection from "../models/WhatWeDoSection.js";

// GET What We Do Section
export const getWhatWeDoSection = async (_req, res) => {
  try {
    const section = await WhatWeDoSection.findOne();
    res.status(200).json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST What We Do Section
export const addWhatWeDoSection = async (req, res) => {
  try {
    const section = await WhatWeDoSection.create(req.body);
    res.status(201).json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT What We Do Section
export const updateWhatWeDoSection = async (req, res) => {
  try {
    const section = await WhatWeDoSection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
