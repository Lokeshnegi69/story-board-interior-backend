import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  title: String,
  description: String,
  backgroundImage: String,
});

const introSchema = new mongoose.Schema({
  description: String,
});

const serviceSchema = new mongoose.Schema({
  title: String,
  description1: String,
  description2: String,
  image: String,
  background: { type: String, default: "white" }, // optional
  order: Number,
});

const gallerySchema = new mongoose.Schema({
  images: [String],
});

const ctaSchema = new mongoose.Schema({
  text: String,
  buttonText: String,
  backgroundImage: String,
});

const servicePageSchema = new mongoose.Schema({
  hero: heroSchema,
  intro: introSchema,
  services: [serviceSchema],
  gallery: gallerySchema,
  cta: ctaSchema,
});

export default mongoose.model("ServicePage", servicePageSchema);
