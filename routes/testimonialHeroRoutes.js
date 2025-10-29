import express from "express";
import {
  addTestimonialHero,
  getTestimonialHero,
  updateTestimonialHero,
} from "../controllers/testimonialHeroController.js";
import uploadMiddleware from "../middleware/upload.js";

const router = express.Router();

router.get("/", getTestimonialHero);   // GET /api/testimonial-hero
router.post("/", uploadMiddleware("backgroundImage"), addTestimonialHero); // POST /api/testimonial-hero

router.put("/", uploadMiddleware("backgroundImage"),  updateTestimonialHero); // PUT /api/testimonial-hero

export default router;
