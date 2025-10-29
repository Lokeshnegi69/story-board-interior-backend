// routes/ctaRoutes.js
import express from "express";
import { getCta, updateCta , addCta } from "../controllers/ctaController.js";
import uploadMiddleware from "../middleware/upload.js";
const router = express.Router();

router.get("/", getCta);         // GET /api/cta
router.put("/",  uploadMiddleware("backgroundImage"),updateCta);     // PUT /api/cta
router.post("/",  uploadMiddleware("backgroundImage"),addCta);

export default router;
