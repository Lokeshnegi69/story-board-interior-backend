import express from "express";
import { getHero, createOrUpdateHero } from "../controllers/contactHeroController.js";
import uploadMiddleware from "../middleware/upload.js";
const router = express.Router();

router.get("/", getHero);              // Get hero data
router.post("/", uploadMiddleware("imageUrl"), createOrUpdateHero);  // Add or update hero data

export default router;
