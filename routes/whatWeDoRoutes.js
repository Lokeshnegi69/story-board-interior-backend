import express from "express";
import { getWhatWeDoSection, addWhatWeDoSection, updateWhatWeDoSection } from "../controllers/whatWeDoController.js";

const router = express.Router();

router.get("/", getWhatWeDoSection);           // GET /api/what-we-do
router.post("/", addWhatWeDoSection);          // POST /api/what-we-do
router.put("/:id", updateWhatWeDoSection);     // PUT /api/what-we-do/:id

export default router;
