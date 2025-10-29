// routes/contactRoutes.js
import express from "express";
import { createContact, getContacts , getStudios , addStudio} from "../controllers/contactController.js";
import  uploadMiddleware from "../middleware/upload.js";


import queryMiddleware from "../middleware/queryMiddleware";

const router = express.Router();

router.get('/studios', getStudios);
router.post('/studios',express.json() ,  addStudio);



router.post("/", uploadMiddleware("file"), createContact);
router.get("/", getContacts);    // admin fetch enquiries

export default router;
