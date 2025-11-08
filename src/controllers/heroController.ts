import { Response } from 'express';
import { AppError, asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../middleware/auth';
import HeroSection from '../models/HeroSection';

export const getAllHeroSections = asyncHandler(async (req: AuthRequest, res: Response) => {
  const query: any = {};

  if (!req.user || req.user.role !== 'admin') {
    query.is_active = true;
  }

  const heroSections = await HeroSection.find(query);
  res.json({
    success: true,
    data: heroSections,
  });
});

export const getHeroSectionById = asyncHandler(async (req: AuthRequest, res: Response) => {
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

export const createHeroSection = asyncHandler(async (req: AuthRequest, res: Response) => {
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

export const updateHeroSection = asyncHandler(async (req: AuthRequest, res: Response) => {
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

export const deleteHeroSection = asyncHandler(async (req: AuthRequest, res: Response) => {
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
