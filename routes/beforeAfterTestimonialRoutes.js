import express from "express";
import { getBeforeAfterTestimonials, addBeforeAfterTestimonial } from "../controllers/beforeAfterTestimonialController.js";
import uploadMiddleware from "../middleware/beforeAfterMiddleware.js";

const router = express.Router();

router.get("/", getBeforeAfterTestimonials);
router.post("/",  uploadMiddleware(["beforeImage", "afterImage"]), addBeforeAfterTestimonial);

export default router;
