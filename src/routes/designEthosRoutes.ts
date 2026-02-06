import { Router } from 'express';
import upload from '../middleware/upload';
import {
    getAllDesignEthos,
    createDesignEthos,
    updateDesignEthos,
    deleteDesignEthos,
} from '../controllers/designEthosController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { designEthosSchema } from '../utils/validators';

const router = Router();

router.get('/', getAllDesignEthos);
router.post('/', authenticate, authorize('admin'), upload.single('image'), validate(designEthosSchema), createDesignEthos);
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), validate(designEthosSchema), updateDesignEthos);
router.delete('/:id', authenticate, authorize('admin'), deleteDesignEthos);

export default router;
