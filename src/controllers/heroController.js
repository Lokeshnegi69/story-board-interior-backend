const { Response  } = require('express');
const { AppError, asyncHandler  } = require('../utils/errorHandler');
const { AuthRequest  } = require('../middleware/auth');
const HeroSection = require('../models/HeroSection');

const getAllHeroSections = asyncHandler(async (req, res) => {
  const query = {};

  if (!req.user || req.user.role !== 'admin') {
    query.is_active = true;
  }

  const heroSections = await HeroSection.find(query);
  res.json({
    success: true,
    data: heroSections,
  });
});

const getHeroSectionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const heroSection = await HeroSection.findById(id);

  if (!heroSection) {
    throw new AppError('Hero section not found', 404);
  }

  res.json({
    success: true,
    data: heroSection,
  });
});

const createHeroSection = asyncHandler(async (req, res) => {
  const { page } = req.body;
  const imageUrl = req.file;
  
  const heroSection = new HeroSection({
    page: page, 
    background_image: imageUrl?.path || ''
  });

  // Save to database
  await heroSection.save();

  res.status(201).json({
    success: true,
    message: 'Hero section created successfully',
    data: heroSection,
  });
});

const updateHeroSection = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const heroSection = await HeroSection.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!heroSection) {
    throw new AppError('Hero section not found', 404);
  }

  res.json({
    success: true,
    message: 'Hero section updated successfully',
    data: heroSection,
  });
});

const deleteHeroSection = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const heroSection = await HeroSection.findByIdAndDelete(id);

  if (!heroSection) {
    throw new AppError('Hero section not found', 404);
  }

  res.json({
    success: true,
    message: 'Hero section deleted successfully',
  });
});


module.exports = {
  getAllHeroSections,
  getHeroSectionById,
  createHeroSection,
  updateHeroSection,
  deleteHeroSection,
};