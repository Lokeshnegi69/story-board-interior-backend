import { Router } from 'express';
import upload from '../middleware/upload';
import {
    getAllServices,
    createService,
    updateService,
    deleteService,
} from '../controllers/serviceController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { serviceSchema } from '../utils/validators';

const router = Router();

router.get('/', getAllServices);
router.post('/', authenticate, authorize('admin'), upload.single('image'), validate(serviceSchema), createService); // Using 'image' as field name for multer consistency
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), validate(serviceSchema), updateService);
router.delete('/:id', authenticate, authorize('admin'), deleteService);

export default router;
