
import DesignEthos from "../models/DesignEthos.js";

export const getDesignEthos = async (req, res) => {
  try {
    // return all items ordered by `order` asc
    const items = await DesignEthos.find().sort({ order: 1 });
    res.status(200).json(items);
    
  } catch (err) {
    console.error("getDesignEthos:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE Design Ethos
export const createDesignEthos = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = req.file.path; // Cloudinary URL
    const { title, subtitle, description, order } = req.body;

    const newItem = await DesignEthos.create({
      title,
      subtitle,
      description,
      order,
      imageUrl,
    });

    res.status(201).json(newItem);
  } catch (err) {
    console.error("createDesignEthos error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};