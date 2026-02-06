import { Router } from 'express';
import upload from '../middleware/upload';
import { getServiceDetails, createServiceDetail, deleteServiceDetail, updateServiceDetail } from '../controllers/serviceDetailController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getServiceDetails);
router.post('/', authenticate, authorize('admin'), upload.single('image'), createServiceDetail);
router.delete('/:id', authenticate, authorize('admin'), deleteServiceDetail);
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), updateServiceDetail);

export default router;
