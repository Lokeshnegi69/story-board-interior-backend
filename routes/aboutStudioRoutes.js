import express from "express";
import { getAboutStudio, addAboutStudio, updateAboutStudio } from "../controllers/aboutStudioController.js";

const router = express.Router();

router.get("/", getAboutStudio);         // GET /api/about-studio
router.post("/", addAboutStudio);        // POST /api/about-studio
router.put("/:id", updateAboutStudio);   // PUT /api/about-studio/:id

export default router;
