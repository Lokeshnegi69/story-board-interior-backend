const { Router } = require('express');
const upload = require('../middleware/upload');
const { getServiceDetails, createServiceDetail, deleteServiceDetail, updateServiceDetail } = require('../controllers/serviceDetailController');
const { authenticate, authorize } = require('../middleware/auth');

const router = Router();

router.get('/', getServiceDetails);
router.post('/', authenticate, authorize('admin'), upload.single('image'), createServiceDetail);
router.delete('/:id', authenticate, authorize('admin'), deleteServiceDetail);
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), updateServiceDetail);

module.exports = router;
