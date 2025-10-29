import express from "express";
import { getBrandLogos, createBrandLogo } from "../controllers/brandLogoController.js";
import uploadMiddleware from "../middleware/upload.js";
const router = express.Router();

router.get("/", getBrandLogos);
router.post("/", uploadMiddleware("image"),createBrandLogo); 

export default router;
