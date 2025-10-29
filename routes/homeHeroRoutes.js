import express from "express";
import {
  getHomeHero,
  createHomeHero,
  updateHomeHero,
  setActiveHomeHero,
  getAllHomeHeroes,
} from "../controllers/homeHeroController.js";

import {upload} from "../middleware/upload.js";

const router = express.Router();

// Get active hero (for frontend)
router.get("/", getHomeHero);

// Get all heroes (for admin list)
router.get("/all", getAllHomeHeroes);

// Create new hero
router.post("/",  upload.fields([
  { name: "imageUrl", maxCount: 1 },
  { name: "scrollIcon", maxCount: 1 },
]), createHomeHero);

// Update existing hero
router.put("/:id", upload.fields([
  { name: "imageUrl", maxCount: 1 },
  { name: "scrollIcon", maxCount: 1 },
]), updateHomeHero);

// Set hero active
router.patch("/:id/active", setActiveHomeHero);

export default router;


