import express from 'express';
import { getUseCases, createUseCase, updateUseCase, deleteUseCase } from '../controllers/useCaseController';
import upload from '../middleware/upload';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getUseCases);
router.post('/', authenticate, authorize('admin'), upload.single('image'), createUseCase);
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), updateUseCase);
router.delete('/:id', authenticate, authorize('admin'), deleteUseCase);

export default router;
