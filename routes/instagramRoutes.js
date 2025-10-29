import express from "express";
import { getInstagramPosts, createInstagramPost } from "../controllers/instagramController.js";
import {upload} from "../middleware/upload.js";
const router = express.Router();

router.get("/", getInstagramPosts);
router.post("/",upload.fields([
  { name: "image", maxCount: 1 },
  { name: "overlayIcon", maxCount: 1 },
]), createInstagramPost); // optional, admin use

export default router;
