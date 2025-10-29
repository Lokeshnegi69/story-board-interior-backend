import express from "express";
import { getHero, createHero, updateHero } from "../controllers/heroController.js";
import { upload }  from "../middleware/upload.js";

const router = express.Router();

// GET /api/hero
router.get("/", getHero);

// POST /api/hero (add new hero section)
router.post("/",  upload.fields([
  { name: "imageUrl", maxCount: 1 },
  { name: "scrollIcon", maxCount: 1 },
]),  createHero);

// PUT /api/hero (update hero section)
router.put("/", upload.fields([
  { name: "imageUrl", maxCount: 1 },
  { name: "scrollIcon", maxCount: 1 },
]),  updateHero);

export default router;
