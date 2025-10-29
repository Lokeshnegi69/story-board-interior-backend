// middleware/uploadMiddleware.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "testimonials",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

/**
 * Wrapper middleware for single/multiple uploads
 * @param {string|string[]} fieldNames - string for single field, array for multiple fields
 */
const uploadMiddleware = (fieldNames) => {
  if (Array.isArray(fieldNames)) {
    // multiple different fields
    const fields = fieldNames.map((name) => ({ name, maxCount: 1 }));
    return (req, res, next) => {
      upload.fields(fields)(req, res, (err) => {
        if (err) return res.status(400).json({ message: err.message });
        next();
      });
    };
  } else {
    // single field
    return (req, res, next) => {
      upload.single(fieldNames)(req, res, (err) => {
        if (err) return res.status(400).json({ message: err.message });
        next();
      });
    };
  }
};
export default uploadMiddleware;