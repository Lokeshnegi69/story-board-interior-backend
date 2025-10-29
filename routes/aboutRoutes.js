import express from "express";
import { getAboutSection, createAboutSection } from "../controllers/aboutController.js";

const router = express.Router();

router.get("/", getAboutSection);
router.post("/", createAboutSection); // optional: admin use

export default router;
