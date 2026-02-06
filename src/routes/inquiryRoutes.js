const { Router } = require('express');
const {
    getAllInquiries,
    getInquiryById,
    createInquiry,
    updateInquiry,
    deleteInquiry,
    getInquiryStats,
} = require('../controllers/inquiryController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { inquirySchema } = require('../utils/validators');

const router = Router();

router.get('/', authenticate, authorize('admin'), getAllInquiries);
router.get('/stats', authenticate, authorize('admin'), getInquiryStats);
router.get('/:id', authenticate, authorize('admin'), getInquiryById);
router.post('/', validate(inquirySchema), createInquiry);
router.put('/:id', authenticate, authorize('admin'), validate(inquirySchema), updateInquiry);
router.delete('/:id', authenticate, authorize('admin'), deleteInquiry);

module.exports = router;
