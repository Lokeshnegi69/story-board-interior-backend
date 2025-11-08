import { Router } from 'express';
import {
  getDashboardStats,
  getProjectsByCategory,
  getInquiriesByStatus,
} from '../controllers/dashboardController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/stats', authenticate, authorize('admin'), getDashboardStats);
router.get('/projects-by-category', authenticate, authorize('admin'), getProjectsByCategory);
router.get('/inquiries-by-status', authenticate, authorize('admin'), getInquiriesByStatus);

export default router;
