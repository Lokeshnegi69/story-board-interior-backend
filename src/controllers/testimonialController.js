const { Response  } = require('express');
const { AppError, asyncHandler  } = require('../utils/errorHandler');
const { AuthRequest  } = require('../middleware/auth');
const Testimonial = require('../models/Testimonial');

const getAllTestimonials = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, is_featured, is_published } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  const query = {};

  if (!req.user || req.user.role !== 'admin') {
    query.is_published = true;
  } else if (is_published !== undefined) {
    query.is_published = is_published === 'true';
  }

  if (is_featured === 'true') {
    query.is_featured = true;
  }

  const [testimonials, total] = await Promise.all([
    Testimonial.find(query)
      .populate('project_id', 'title slug')
      .sort({ display_order: 1 })
      .skip(offset)
      .limit(Number(limit)),
    Testimonial.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: testimonials,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

const getTestimonialById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findById(id).populate('project_id', 'title slug');

  if (!testimonial) {
    throw new AppError('Testimonial not found', 404);
  }

  if (!testimonial.is_published && (!req.user || req.user.role !== 'admin')) {
    throw new AppError('Testimonial not found', 404);
  }

  res.json({
    success: true,
    data: testimonial,
  });
});

const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Testimonial created successfully',
    data: testimonial,
  });
});

const updateTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!testimonial) {
    throw new AppError('Testimonial not found', 404);
  }

  res.json({
    success: true,
    message: 'Testimonial updated successfully',
    data: testimonial,
  });
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findByIdAndDelete(id);

  if (!testimonial) {
    throw new AppError('Testimonial not found', 404);
  }

  res.json({
    success: true,
    message: 'Testimonial deleted successfully',
  });
});


module.exports = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};