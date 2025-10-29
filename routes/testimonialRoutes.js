import express from "express";
import { getTestimonials, createTestimonial , deleteTestimonial , updateTestimonial} from "../controllers/testimonialController.js";
import uploadMiddleware from "../middleware/upload.js";
const router = express.Router();

router.get("/", getTestimonials);
router.post("/", uploadMiddleware("image"), createTestimonial);

router.put("/:id", uploadMiddleware("image"), updateTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;
