import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import projectRoutes from "./routes/ProjectRoute.js";
import heroRoutes from "./routes/heroRoutes.js";
import ctaRoutes from "./routes/ctaRoutes.js";
import homeHeroRoutes from "./routes/homeHeroRoutes.js";
import designEthosRoutes from "./routes/designEthosRoutes.js";
import signatureProjectRoutes from "./routes/signatureProjectRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import instagramRoutes from "./routes/instagramRoutes.js";
import brandLogoRoutes from "./routes/brandLogoRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import featuredProjectRoutes from "./routes/FeaturedProjectRoutes.js";
import testimonialHeroRoutes from "./routes/testimonialHeroRoutes.js";
import featuredTestimonialRoutes from "./routes/featuredTestimonialRoutes.js";
import beforeAfterTestimonialRoutes from "./routes/beforeAfterTestimonialRoutes.js";
import clientReflectionRoutes from "./routes/clientReflectionRoutes.js";
import clientStoryRoutes from "./routes/clientStoryRoutes.js";
import clientCommunityRoutes from "./routes/clientCommunityRoutes.js";
import aboutHeroRoutes from "./routes/aboutHeroRoutes.js";
import aboutStudioRoutes from "./routes/aboutStudioRoutes.js";
import visionRoutes from "./routes/visionRoutes.js";
import whatWeDoRoutes from "./routes/whatWeDoRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import aboutCTARoutes from "./routes/aboutCTARoutes.js";
import servicePageRoutes from "./routes/servicePageRoutes.js"
import contactRoutes from "./routes/contactRoutes.js";
import contactHeroRoutes from "./routes/contactHeroRoutes.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      process.env.ADMIN_URL || 'http://localhost:3001',
      'http://localhost:5173', // Vite default
      'http://127.0.0.1:5174'
    ];
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};


app.use(cors());
app.use(express.json());

// API routes

app.use("/api/projects", projectRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/cta", ctaRoutes);
app.use("/api/home-hero", homeHeroRoutes);
app.use("/api/design-ethos", designEthosRoutes);
app.use("/api/signature-projects", signatureProjectRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/instagram", instagramRoutes);
app.use("/api/brands", brandLogoRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/featuredprojects", featuredProjectRoutes);
app.use("/api/testimonial-hero", testimonialHeroRoutes);
app.use("/api/featured-testimonial", featuredTestimonialRoutes);
app.use("/api/before-after-testimonials", beforeAfterTestimonialRoutes);
app.use("/api/client-reflections", clientReflectionRoutes);
app.use("/api/client-stories", clientStoryRoutes);
app.use("/api/client-community", clientCommunityRoutes);
app.use("/api/about-hero", aboutHeroRoutes);
app.use("/api/about-studio", aboutStudioRoutes);
app.use("/api/vision", visionRoutes);
app.use("/api/what-we-do", whatWeDoRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/about-cta", aboutCTARoutes);
app.use("/api/servicepage" , servicePageRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/contact-hero", contactHeroRoutes);
// MongoDB connection

mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)))
  .catch(err => console.log(err));


