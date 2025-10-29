import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "enquiries",  
    allowed_formats: ["jpg", "png", "jpeg", "pdf"], 
  },
});

// Multer instance
export const upload = multer({ storage });

// Wrapper to catch errors and send JSON instead of HTML
const uploadMiddleware = (fieldName) => (req, res, next) => {
  upload.single(fieldName)(req, res, (err) => {
    if (err) {
      console.error("Multer/Cloudinary error:", err);
      return res.status(400).json({
        message: "File upload failed",
        error: err.message || err,
      });
    }
    next();
  });
};

export default uploadMiddleware; 





