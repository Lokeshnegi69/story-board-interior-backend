import express from "express";
import { getAboutHero, addAboutHero, updateAboutHero } from "../controllers/aboutHeroController.js";
import uploadMiddleware from "../middleware/upload.js";
const router = express.Router();

router.get("/", getAboutHero); // GET /api/about-hero
router.post("/",  uploadMiddleware("backgroundImage") , addAboutHero); // POST /api/about-hero
router.put("/:id",  uploadMiddleware("backgroundImage") ,  updateAboutHero); // PUT /api/about-hero/:id

export default router;