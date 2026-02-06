const { Response  } = require('express');
const { AppError, asyncHandler  } = require('../utils/errorHandler');
const { AuthRequest  } = require('../middleware/auth');
const Category = require('../models/Category');

const getAllCategories = asyncHandler(async (req, res) => {
  const query = {};

  if (!req.user || req.user.role !== 'admin') {
    query.is_active = true;
  }

  const categories = await Category.find(query).sort({ display_order: 1 });

  res.json({
    success: true,
    data: categories,
  });
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  res.json({
    success: true,
    data: category,
  });
});

const getCategoryBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const category = await Category.findOne({ slug });

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  res.json({
    success: true,
    data: category,
  });
});

const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: category,
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  res.json({
    success: true,
    message: 'Category updated successfully',
    data: category,
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  res.json({
    success: true,
    message: 'Category deleted successfully',
  });
});


module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
};