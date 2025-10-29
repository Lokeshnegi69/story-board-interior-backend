import express from "express";
import { getClientStories, addClientStory } from "../controllers/clientStoryController.js";

const router = express.Router();

router.get("/", getClientStories); // GET /api/client-stories
router.post("/", addClientStory);  // POST /api/client-stories

export default router;
