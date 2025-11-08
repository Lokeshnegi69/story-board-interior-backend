import { Router } from 'express';
import {
  getAllInquiries,
  getInquiryById,
  createInquiry,
  updateInquiry,
  deleteInquiry,
  getInquiryStats,
} from '../controllers/inquiryController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { inquirySchema } from '../utils/validators';

const router = Router();

router.get('/', authenticate, authorize('admin'), getAllInquiries);
router.get('/stats', authenticate, authorize('admin'), getInquiryStats);
router.get('/:id', authenticate, authorize('admin'), getInquiryById);
router.post('/', validate(inquirySchema), createInquiry);
router.put('/:id', authenticate, authorize('admin'), validate(inquirySchema), updateInquiry);
router.delete('/:id', authenticate, authorize('admin'), deleteInquiry);

export default router;
