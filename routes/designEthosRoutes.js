// routes/designEthosRoutes.js
import express from "express";
import { getDesignEthos, createDesignEthos } from "../controllers/designEthosController.js";
import uploadMiddleware from "../middleware/upload.js";
const router = express.Router();

router.get("/", getDesignEthos);
router.post("/", uploadMiddleware("imageUrl"), createDesignEthos); // useful for seeding from client (or use seed script)

export default router;
