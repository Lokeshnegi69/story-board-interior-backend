import { Router } from 'express';
import {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { testimonialSchema } from '../utils/validators';
import upload from '../middleware/upload';

const router = Router();

router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);
router.post('/', authenticate, authorize('admin'), upload.single('image'), validate(testimonialSchema), createTestimonial);
router.put('/:id', authenticate, authorize('admin'), validate(testimonialSchema), updateTestimonial);
router.delete('/:id', authenticate, authorize('admin'), deleteTestimonial);

export default router;
