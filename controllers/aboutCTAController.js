import AboutCTA from "../models/AboutCTA.js";

// Get CTA
export const getAboutCTA = async (req, res) => {
  try {
    const cta = await AboutCTA.findOne();
    res.status(200).json(cta);
  } catch (error) {
    res.status(500).json({ message: "Error fetching CTA", error });
  }
};

// Create/Update CTA
export const createOrUpdateCTA = async (req, res) => {
   try {
    let cta = await AboutCTA.findOne();

    // Get Cloudinary URL if file is uploaded
    const imageUrl = req.file ? req.file.path : undefined;

    if (cta) {
      cta.heading = req.body.heading || cta.heading;
      cta.buttonText = req.body.buttonText || cta.buttonText;
      cta.buttonLink = req.body.buttonLink || cta.buttonLink;
      if (imageUrl) cta.backgroundImage = imageUrl; 
      await cta.save();
    } else {
      cta = new AboutCTA({
        heading: req.body.heading,
        buttonText: req.body.buttonText,
        buttonLink: req.body.buttonLink,
        backgroundImage: imageUrl,
      });
      await cta.save();
    }

    res.status(201).json(cta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving CTA", error });
  }
};
