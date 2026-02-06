const express = require('express');
const { getUseCases, createUseCase, updateUseCase, deleteUseCase } = require('../controllers/useCaseController');
const upload = require('../middleware/upload');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getUseCases);
router.post('/', authenticate, authorize('admin'), upload.single('image'), createUseCase);
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), updateUseCase);
router.delete('/:id', authenticate, authorize('admin'), deleteUseCase);

module.exports = router;
