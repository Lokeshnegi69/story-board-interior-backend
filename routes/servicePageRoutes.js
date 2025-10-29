import express from "express";
import { getServicePage, seedServicePage, updateServicePage } from "../controllers/servicePageController.js";
import {upload} from "../middleware/upload.js";
const router = express.Router();

router.get("/", getServicePage);
router.post("/seed",upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "ctaImage", maxCount: 1 },
    { name: "servicesImages", maxCount: 10 },
  ]), seedServicePage);  // send full JSON body

router.put("/",upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "ctaImage", maxCount: 1 },
    { name: "servicesImages", maxCount: 10 },
  ]), updateServicePage);

export default router;
