import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  full_name: Joi.string().min(2).max(100),
  phone: Joi.string().pattern(/^[0-9+\-() ]+$/),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userUpdateSchema = Joi.object({
  full_name: Joi.string().min(2).max(100),
  phone: Joi.string().pattern(/^[0-9+\-() ]+$/),
  avatar_url: Joi.string().uri(),
  is_active: Joi.boolean(),
  role: Joi.string().valid('admin', 'client'),
});

export const categorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  slug: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(500),
  image_url: Joi.string().uri(),
  display_order: Joi.number().integer().min(0),
  is_active: Joi.boolean(),
});

export const projectSchema = Joi.object({
  title: Joi.string().min(2).max(200),
  slug: Joi.string().min(2).max(200),
  description: Joi.string().max(5000),
  client_name: Joi.string().max(100),
  location: Joi.string().max(200),
  area_sqft: Joi.number().positive(),
  completion_date: Joi.date(),
  category_id: Joi.string().uuid(),
  status: Joi.string().valid('draft', 'published', 'archived'),
  featured: Joi.boolean(),
  thumbnail_url: Joi.string().uri(),
  display_order: Joi.number().integer().min(0),
});

export const projectImageSchema = Joi.object({
  project_id: Joi.string().uuid().required(),
  image_url: Joi.string().uri().required(),
  cloudinary_id: Joi.string(),
  caption: Joi.string().max(500),
  display_order: Joi.number().integer().min(0),
  is_primary: Joi.boolean(),
});

export const inquirySchema = Joi.object({
  full_name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9+\-() ]+$/),
  subject: Joi.string().max(200),
  message: Joi.string().min(10).max(2000).required(),
  project_interest: Joi.string().max(200),
  budget_range: Joi.string().max(100),
  status: Joi.string().valid('new', 'in_progress', 'resolved', 'closed'),
  assigned_to: Joi.string().uuid(),
  notes: Joi.string().max(2000),
});

export const testimonialSchema = Joi.object({
  client_name: Joi.string().min(2).max(100).required(),
  client_position: Joi.string().max(100),
  client_company: Joi.string().max(100),
  client_avatar: Joi.string().uri(),
  rating: Joi.number().integer().min(1).max(5),
  testimonial_text: Joi.string().min(10).max(1000).required(),
  project_id: Joi.string().uuid(),
  is_featured: Joi.boolean(),
  is_published: Joi.boolean(),
  display_order: Joi.number().integer().min(0),
});

export const heroSectionSchema = Joi.object({
  page: Joi.string().min(2).max(200).required(),
  // subtitle: Joi.string().max(300),
  // description: Joi.string().max(1000),
  background_image: Joi.string().uri(),
  // cta_text: Joi.string().max(50),
  // cta_link: Joi.string().max(500),
  is_active: Joi.boolean(),
  // display_order: Joi.number().integer().min(0),
});

export const siteSettingSchema = Joi.object({
  key: Joi.string().min(2).max(100).required(),
  value: Joi.any().required(),
  description: Joi.string().max(500),
});

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string(),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
});
