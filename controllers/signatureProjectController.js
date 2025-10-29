import SignatureProject from "../models/SignatureProject.js";

// GET all signature projects
export const getSignatureProjects = async (req, res) => {
  try {
    const projects = await SignatureProject.find();
    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST new signature project (admin use)
export const createSignatureProject = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Project image is required" });
    }

    const imageUrl = req.file.path; // Cloudinary URL
    const { title, description, link } = req.body;

    const newProject = new SignatureProject({
      title,
      description,
      image: imageUrl,
      link,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error("createSignatureProject error:", err);
    res.status(500).json({ message: "Failed to create project", error: err.message });
  }
};

// Optional: Update project with new image
export const updateSignatureProject = async (req, res) => {
  try {
    const { id } = req.params;
    const imageUrl = req.file ? req.file.path : undefined;

    const updateData = { ...req.body };
    if (imageUrl) updateData.image = imageUrl;

    const updatedProject = await SignatureProject.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProject) return res.status(404).json({ message: "Project not found" });

    res.status(200).json(updatedProject);
  } catch (err) {
    console.error("updateSignatureProject error:", err);
    res.status(500).json({ message: "Failed to update project", error: err.message });
  }
};

