const { Router } = require('express');
const upload = require('../middleware/upload');
const { getTransformations, createTransformation, updateTransformation, deleteTransformation } = require('../controllers/transformationController');
const { authenticate, authorize } = require('../middleware/auth');

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

module.exports = router;
