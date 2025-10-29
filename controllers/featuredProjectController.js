import Project from "../models/FeaturedProject.js";
// ADD Project
export const addProject = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Project image is required" });
    }

    const imageUrl = req.file.path; // Cloudinary URL
    const { title, description, category } = req.body;

    const project = await FeaturedProject.create({
      title,
      description,
      category,
      imageUrl,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("addProject error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all FeaturedProjects
export const getFeaturedProjects = async (_req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
