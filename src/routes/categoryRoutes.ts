import { Router } from 'express';
import {
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { categorySchema } from '../utils/validators';

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.get('/slug/:slug', getCategoryBySlug);
router.post('/', authenticate, authorize('admin'), validate(categorySchema), createCategory);
router.put('/:id', authenticate, authorize('admin'), validate(categorySchema), updateCategory);
router.delete('/:id', authenticate, authorize('admin'), deleteCategory);

export default router;
