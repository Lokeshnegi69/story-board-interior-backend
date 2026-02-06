import { Router } from 'express';
import upload from '../middleware/upload';
import { getTransformations, createTransformation, updateTransformation, deleteTransformation } from '../controllers/transformationController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public route
router.get('/', getTransformations);

// Admin routes
router.post('/', authenticate, authorize('admin'),
    upload.fields([{ name: 'image_before', maxCount: 1 }, { name: 'image_after', maxCount: 1 }]),
    createTransformation
);

router.put('/:id', authenticate, authorize('admin'),
    upload.fields([{ name: 'image_before', maxCount: 1 }, { name: 'image_after', maxCount: 1 }]),
    updateTransformation
);

router.delete('/:id', authenticate, authorize('admin'), deleteTransformation);

export default router;
