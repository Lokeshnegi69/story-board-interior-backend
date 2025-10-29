import Hero from "../models/Hero.js";
import cloudinary from "../config/cloudinary.js";

// GET hero section
export const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne(); // only one hero section
    if (!hero) return res.status(404).json({ message: "Hero section not found" });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST hero section (Admin only - create new)
export const createHero = async (req, res) => {
  
   try {
    const imageFile = req.files?.imageUrl?.[0];
    if (!imageFile) {
      return res.status(400).json({ message: "Hero image is required" });
    }

    const scrollIconFile = req.files?.scrollIcon?.[0];

    const hero = new Hero({
      ...req.body,
      imageUrl: imageFile.path,
      scrollIconUrl: scrollIconFile?.path, // optional
    });

    const savedHero = await hero.save();
    res.status(201).json(savedHero);
  } catch (err) {
    console.error("createHero error:", err);
    res.status(400).json({ message: err.message });
  }
};

// UPDATE Hero
export const updateHero = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : undefined;
    const scrollIconUrl = req.files?.scrollIcon ? req.files.scrollIcon[0].path : undefined;

    const updateData = { ...req.body };
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (scrollIconUrl) updateData.scrollIconUrl = scrollIconUrl;

    const updatedHero = await Hero.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true, // create if not exists
    });

    res.status(200).json(updatedHero);
  } catch (err) {
    console.error("updateHero error:", err);
    res.status(400).json({ message: err.message });
  }
};