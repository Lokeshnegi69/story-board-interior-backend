import express from "express";
import { getReflections, addReflection } from "../controllers/clientReflectionController.js";
import {upload} from "../middleware/upload.js";
const router = express.Router();

router.get("/", getReflections);   // GET /api/client-reflections
router.post("/",  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "quoteIcon", maxCount: 1 },
  ]), addReflection);   // POST /api/client-reflections

export default router;
