import express from "express";
import { getClientSubmissions, addClientSubmission } from "../controllers/clientCommunityController.js";

const router = express.Router();

router.get("/", getClientSubmissions); // GET /api/client-community
router.post("/", addClientSubmission); // POST /api/client-community

export default router;
