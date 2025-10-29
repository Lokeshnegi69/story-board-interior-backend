import HomeHero from "../models/HomeHero.js";

export const getHomeHero = async (req, res) => {
  try {
     const activeHero = await HomeHero.findOne({ isActive: true });
    if (!activeHero) {
      return res.status(404).json({ message: "No active home hero found" });
    }
    res.json(activeHero);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};




// Get all heroes (for admin)
export const getAllHomeHeroes = async (req, res) => {
  try {
    const heroes = await HomeHero.find();
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// POST - Create hero section
export const createHomeHero = async (req, res) => {
  try {
    // Get the uploaded files
    const imageFile = req.files?.imageUrl?.[0]; // required hero image
    const scrollIconFile = req.files?.scrollIcon?.[0]; // optional scroll icon

    if (!imageFile) {
      return res.status(400).json({ message: "Hero image is required" });
    }

    // Extract fields from form-data
    const { title, subtitle, description, ctaText, overlayOpacity } = req.body;

    if (!title || !subtitle) {
      return res.status(400).json({ message: "Title and subtitle are required" });
    }

    // Convert overlayOpacity to a number
    const overlayOpacityNum =
      overlayOpacity && !isNaN(parseFloat(overlayOpacity))
        ? parseFloat(overlayOpacity)
        : undefined; // will use default in schema if undefined


    const newHero = new HomeHero({
      title,
      subtitle,
      description,
      ctaText,
      overlayOpacity: overlayOpacityNum,
      imageUrl: imageFile.path,
      scrollIconUrl: scrollIconFile?.path,
    });

    await newHero.save();
    res.status(201).json(newHero);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error while creating hero section",
      error: err.message,
    });}
  
};

// UPDATE hero
export const updateHomeHero = async (req, res) => {


  try {
    const imageUrl = req.files?.imageUrl ? req.files.imageUrl[0].path : undefined;
    const scrollIconUrl = req.files?.scrollIcon ? req.files.scrollIcon[0].path : undefined;

    const updateData = { ...req.body };
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (scrollIconUrl) updateData.scrollIcon = scrollIconUrl;

    const hero = await HomeHero.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(hero);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// SET active
export const setActiveHomeHero = async (req, res) => {
  try {
    await HomeHero.updateMany({}, { isActive: false });
    const hero = await HomeHero.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );
    res.json(hero);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};