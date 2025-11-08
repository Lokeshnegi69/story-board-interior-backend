import { Router } from 'express';
import upload from '../middleware/upload';
import {
  getAllHeroSections,
  getHeroSectionById,
  createHeroSection,
  updateHeroSection,
  deleteHeroSection,
} from '../controllers/heroController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { heroSectionSchema } from '../utils/validators';

const router = Router();

router.get('/', getAllHeroSections);
router.get('/:id', getHeroSectionById);
router.post('/', authenticate, authorize('admin'), upload.single('image'), validate(heroSectionSchema), createHeroSection);
router.put('/:id', authenticate, authorize('admin'), validate(heroSectionSchema), updateHeroSection);
router.delete('/:id', authenticate, authorize('admin'), deleteHeroSection);

export default router;
