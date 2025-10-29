import TeamMember from "../models/TeamMember.js";

// Get all team members
export const getTeamMembers = async (req, res) => {
  try {
    const team = await TeamMember.find();
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team members", error });
  }
};

// Add a new team member
export const createTeamMember = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Team member image is required" });
    }

    const imageUrl = req.file.path; // Cloudinary URL
    const { name, role } = req.body;

    const newMember = new TeamMember({
      name,
      role,
      imageUrl,
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    console.error("createTeamMember error:", err);
    res.status(500).json({ message: "Failed to add team member", error: err.message });
  }
};

// Optional: Update a team member
export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const imageUrl = req.file ? req.file.path : undefined;

    const updateData = { ...req.body };
    if (imageUrl) updateData.imageUrl = imageUrl;

    const updatedMember = await TeamMember.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedMember) return res.status(404).json({ message: "Team member not found" });

    res.status(200).json(updatedMember);
  } catch (err) {
    console.error("updateTeamMember error:", err);
    res.status(500).json({ message: "Failed to update team member", error: err.message });
  }
};
