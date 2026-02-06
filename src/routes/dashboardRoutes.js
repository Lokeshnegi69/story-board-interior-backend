const { Router } = require('express');
const {
    getDashboardStats,
    getProjectsByCategory,
    getInquiriesByStatus,
} = require('../controllers/dashboardController');
const { authenticate, authorize } = require('../middleware/auth');

const router = Router();

router.get('/stats', authenticate, authorize('admin'), getDashboardStats);
router.get('/projects-by-category', authenticate, authorize('admin'), getProjectsByCategory);
router.get('/inquiries-by-status', authenticate, authorize('admin'), getInquiriesByStatus);

module.exports = router;
