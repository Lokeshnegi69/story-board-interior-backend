const { Router } = require('express');
const {
    getAllCategories,
    getCategoryById,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { categorySchema } = require('../utils/validators');

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.get('/slug/:slug', getCategoryBySlug);
router.post('/', authenticate, authorize('admin'), validate(categorySchema), createCategory);
router.put('/:id', authenticate, authorize('admin'), validate(categorySchema), updateCategory);
router.delete('/:id', authenticate, authorize('admin'), deleteCategory);

module.exports = router;
