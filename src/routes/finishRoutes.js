const express = require('express');
const { getFinishes, createFinish, updateFinish, deleteFinish } = require('../controllers/finishController');
const upload = require('../middleware/upload');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getFinishes);
router.post('/', authenticate, authorize('admin'), upload.single('image'), createFinish);
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), updateFinish);
router.delete('/:id', authenticate, authorize('admin'), deleteFinish);

module.exports = router;
