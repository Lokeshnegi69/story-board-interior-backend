

import express from "express";

import { addProject, getFeaturedProjects, getProjectById } from "../controllers/featuredProjectController.js";
import uploadMiddleware from "../middleware/upload.js";


const router = express.Router();

router.post("/", uploadMiddleware("imageUrl"), addProject);        // Add new project
router.get("/", getFeaturedProjects);        // Get all projects
router.get("/:id", getProjectById);  // Get single project by ID

export default router;
