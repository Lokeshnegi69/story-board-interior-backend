const { Router } = require('express');
const {
    getAllTestimonials,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
} = require('../controllers/testimonialController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { testimonialSchema } = require('../utils/validators');
const upload = require('../middleware/upload');

const router = Router();

router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);
router.post('/', authenticate, authorize('admin'), upload.single('image'), validate(testimonialSchema), createTestimonial);
router.put('/:id', authenticate, authorize('admin'), validate(testimonialSchema), updateTestimonial);
router.delete('/:id', authenticate, authorize('admin'), deleteTestimonial);

module.exports = router;
