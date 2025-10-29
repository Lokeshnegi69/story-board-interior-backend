import AboutHero from "../models/AboutHero.js";

// GET hero section
export const getAboutHero = async (_req, res) => {
  try {
    const hero = await AboutHero.findOne();
    res.status(200).json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD hero section
export const addAboutHero = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : undefined;

    const hero = await AboutHero.create({
      ...req.body,
      backgroundImage: imageUrl, // store Cloudinary URL
    });

    res.status(201).json(hero);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding hero", error: err.message });
  }
};

// UPDATE hero section
export const updateAboutHero = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : undefined;

    const heroData = {
      ...req.body,
    };

    if (imageUrl) {
      heroData.backgroundImage = imageUrl; // update image only if uploaded
    }

    const hero = await AboutHero.findByIdAndUpdate(req.params.id, heroData, { new: true });

    res.status(200).json(hero);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating hero", error: err.message });
  }
};
