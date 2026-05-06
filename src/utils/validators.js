const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    full_name: Joi.string().min(2).max(100),
    phone: Joi.string().pattern(/^[0-9+\-() ]+$/),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const userUpdateSchema = Joi.object({
    full_name: Joi.string().min(2).max(100),
    phone: Joi.string().pattern(/^[0-9+\-() ]+$/),
    avatar_url: Joi.string().uri(),
    is_active: Joi.boolean(),
    role: Joi.string().valid('admin', 'client'),
});

const categorySchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    slug: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(500),
    image_url: Joi.string().uri(),
    display_order: Joi.number().integer().min(0),
    is_active: Joi.boolean(),
});

const projectSchema = Joi.object({
    title: Joi.string().min(2).max(200),
    slug: Joi.string().min(2).max(200),
    description: Joi.string().max(5000).allow('', null),
    section_heading: Joi.string().allow('', null),
    section_description: Joi.string().allow('', null),
    client_name: Joi.string().max(100).allow('', null),
    location: Joi.string().max(200).allow('', null),
    area_sqft: Joi.number().positive().allow(null),
    completion_date: Joi.date().allow(null),
    category_id: Joi.string().allow('', null),
    category: Joi.string().allow('', null),
    status: Joi.string().valid('draft', 'published', 'archived'),
    featured: Joi.any(),
    visible: Joi.any(),
    tags: Joi.any(),
    thumbnail_url: Joi.string().uri().allow('', null),
    display_order: Joi.number().integer().min(0),
    image_caption: Joi.string().max(500).allow('', null),
}).unknown(true);

const projectImageSchema = Joi.object({
    project_id: Joi.string().uuid().required(),
    image_url: Joi.string().uri().required(),
    cloudinary_id: Joi.string(),
    caption: Joi.string().max(500),
    display_order: Joi.number().integer().min(0),
    is_primary: Joi.boolean(),
});

const inquirySchema = Joi.object({
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

const testimonialSchema = Joi.object({
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

const heroSectionSchema = Joi.object({
    page: Joi.string().min(2).max(200).required(),
    background_image: Joi.string().uri(),
    is_active: Joi.boolean(),
});

const siteSettingSchema = Joi.object({
    key: Joi.string().min(2).max(100).required(),
    value: Joi.any().required(),
    description: Joi.string().max(500),
});

const paginationSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string(),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
});

const designEthosSchema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    img: Joi.string().uri(),
    order: Joi.number().integer().min(0),
    status: Joi.string().valid('draft', 'published'),
});

const serviceSchema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    icon: Joi.string().allow('', null),
    image: Joi.string().allow('', null),
    order: Joi.number().integer().min(0),
    status: Joi.string().valid('draft', 'published'),
});

module.exports = {
    registerSchema,
    loginSchema,
    userUpdateSchema,
    categorySchema,
    projectSchema,
    projectImageSchema,
    inquirySchema,
    testimonialSchema,
    heroSectionSchema,
    siteSettingSchema,
    paginationSchema,
    designEthosSchema,
    serviceSchema,
};
