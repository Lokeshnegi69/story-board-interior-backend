import Hero from "../models/ContactHero.js";

// Get hero data
export const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne().sort({ createdAt: -1 });
    res.json(hero);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createOrUpdateHero = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const imageUrl = req.file ? req.file.path : undefined; // Cloudinary URL

    // Check if hero already exists
    let hero = await Hero.findOne();

    if (hero) {
      hero.title = title || hero.title;
      hero.subtitle = subtitle || hero.subtitle;
      if (imageUrl) hero.imageUrl = imageUrl; 
    } else {
      hero = new Hero({
        title,
        subtitle,
        imageUrl,
      });
    }

    await hero.save();
    res.status(201).json({ success: true, message: "Hero data saved", hero });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving hero data", error: error.message });
  }
};