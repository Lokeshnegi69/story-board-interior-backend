import express from "express";
import { getTeamMembers, createTeamMember } from "../controllers/teamController.js";
import uploadMiddleware from "../middleware/upload.js";
const router = express.Router();

router.get("/", getTeamMembers);
router.post("/", uploadMiddleware("imageUrl"), createTeamMember);

export default router;
