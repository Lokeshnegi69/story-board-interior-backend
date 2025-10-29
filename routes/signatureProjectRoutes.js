import express from "express";
import { getSignatureProjects, createSignatureProject } from "../controllers/signatureProjectController.js";
import uploadMiddleware from "../middleware/upload.js";
const router = express.Router();

router.get("/", getSignatureProjects);
router.post("/", uploadMiddleware("image"), createSignatureProject); 

export default router;
