import ServicePage from "../models/ServicePage.js";

// Get service page
export const getServicePage = async (req, res) => {
  try {
    const page = await ServicePage.findOne();
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const seedServicePage = async (req, res) => {
  try {
    await ServicePage.deleteMany(); // reset collection

    const files = req.files || {};

    const heroImage = files.heroImage ? files.heroImage[0].path : undefined;
    const ctaImage = files.ctaImage ? files.ctaImage[0].path : undefined;

    const servicesImages = files.servicesImages || []; 
    const services = req.body.services?.map((service, index) => ({
      ...service,
      image: servicesImages[index] ? servicesImages[index].path : service.image
    })) || [];

    const newPage = new ServicePage({
      ...req.body,
      hero: { ...req.body.hero, backgroundImage: heroImage },
      cta: { ...req.body.cta, backgroundImage: ctaImage },
      services,
    });

    await newPage.save();
    res.status(201).json(newPage);
  } catch (err) {
    console.error("seedServicePage error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update service page dynamically
export const updateServicePage = async (req, res) => {
  try {
    const files = req.files || {};

    const heroImage = files.heroImage ? files.heroImage[0].path : undefined;
    const ctaImage = files.ctaImage ? files.ctaImage[0].path : undefined;

    const servicesImages = files.servicesImages || []; 
    const services = req.body.services?.map((service, index) => ({
      ...service,
      image: servicesImages[index] ? servicesImages[index].path : service.image
    })) || req.body.services;

    const updateData = {
      ...req.body,
      hero: { ...req.body.hero, ...(heroImage && { backgroundImage: heroImage }) },
      cta: { ...req.body.cta, ...(ctaImage && { backgroundImage: ctaImage }) },
      services,
    };

    const page = await ServicePage.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true,
    });

    res.status(200).json(page);
  } catch (err) {
    console.error("updateServicePage error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
