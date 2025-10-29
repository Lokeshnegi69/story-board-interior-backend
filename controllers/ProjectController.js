import Project from "../models/ProjectModel.js";

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ visible: true }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new project
export const addProject = async (req, res) => {
  try {
    const { title, category, description, tags, status, featured, visible } =
      req.body;

    
    if (!title || !category) {
      return res
        .status(400)
        .json({ message: "Title and category are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Project image is required" });
    }

    
    const imageUrl = req.file?.path;

    const project = await Project.create({
      title,
      category,
      description,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      status,
      featured: featured === "true",
      visible: visible === "true",
      imageUrl,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("addProject error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Update a project by ID
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const imageUrl = req.file ? req.file.path : undefined;

    const updateData = { ...req.body };
    if (imageUrl) updateData.imageUrl = imageUrl; // update image only if uploaded

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProject) return res.status(404).json({ message: "Project not found" });

    res.json(updatedProject);
  } catch (error) {
    console.error("updateProject error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a project by ID
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle visibility (optional)
export const toggleVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    project.visible = !project.visible;
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProjectsAdmin = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};