import ClientReflection from "../models/clientReflection.js";

// GET all reflections
export const getReflections = async (req, res) => {
  try {
    const reflections = await ClientReflection.find();
    res.json(reflections);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reflections", error });
  }
};

export const addReflection = async (req, res) => {
  try {
    // Get Cloudinary URLs if files are uploaded
    const mainImageUrl = req.files?.image ? req.files.image[0].path : undefined;
    const quoteIconUrl = req.files?.quoteIcon ? req.files.quoteIcon[0].path : undefined;

    if (!mainImageUrl || !quoteIconUrl) {
      return res.status(400).json({ message: "Both main image and quote icon are required" });
    }

    const newReflection = new ClientReflection({
      ...req.body,
      image: mainImageUrl,
      quoteIcon: quoteIconUrl,
    });

    await newReflection.save();
    res.status(201).json(newReflection);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error adding reflection", error: error.message });
  }
};
