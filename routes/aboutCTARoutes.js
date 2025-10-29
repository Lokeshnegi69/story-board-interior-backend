import express from "express";
import { getAboutCTA, createOrUpdateCTA } from "../controllers/aboutCTAController.js";
import uploadMiddleware from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAboutCTA);
router.post("/",  uploadMiddleware("backgroundImage") , createOrUpdateCTA);

export default router;
