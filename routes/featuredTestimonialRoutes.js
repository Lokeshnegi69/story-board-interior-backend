import express from "express";
import { getFeaturedTestimonial, addFeaturedTestimonial, updateFeaturedTestimonial , deleteFeaturedTestimonial } 
from "../controllers/featuredTestimonialController.js";
import uploadMiddleware from "../middleware/upload.js";
const router = express.Router();

router.get("/", getFeaturedTestimonial);
router.post("/", uploadMiddleware("imageUrl"),addFeaturedTestimonial);
router.put("/:id",uploadMiddleware("imageUrl"), updateFeaturedTestimonial);
router.delete("/:id", deleteFeaturedTestimonial);

export default router;
