import express from "express";
import { getServices, createService } from "../controllers/serviceController.js";
import uploadMiddleware from "../middleware/upload.js";
const router = express.Router();

router.get("/", getServices);
router.post("/",uploadMiddleware("icon"), createService); // optional, admin use

export default router;
