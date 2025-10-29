import express from "express";
import { getVisionSection, addVisionSection, updateVisionSection } from "../controllers/visionController.js";
import uploadMiddleware from "../middleware/upload.js";
const router = express.Router();

router.get("/", getVisionSection);           // GET /api/vision
router.post("/",uploadMiddleware("imageUrl"), addVisionSection);          // POST /api/vision
router.put("/:id",uploadMiddleware("imageUrl"), updateVisionSection);     // PUT /api/vision/:id

export default router;
