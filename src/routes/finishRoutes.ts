import express from 'express';
import { getFinishes, createFinish, updateFinish, deleteFinish } from '../controllers/finishController';
import upload from '../middleware/upload';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', getFinishes);
router.post('/', authenticate, authorize('admin'), upload.single('image'), createFinish);
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), updateFinish);
router.delete('/:id', authenticate, authorize('admin'), deleteFinish);

export default router;
