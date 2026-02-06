const { Router } = require('express');
const upload = require('../middleware/upload');
const {
    getAllServices,
    createService,
    updateService,
    deleteService,
} = require('../controllers/serviceController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { serviceSchema } = require('../utils/validators');

const router = Router();

router.get('/', getAllServices);
router.post('/', authenticate, authorize('admin'), upload.single('image'), validate(serviceSchema), createService); // Using 'image' as field name for multer consistency
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), validate(serviceSchema), updateService);
router.delete('/:id', authenticate, authorize('admin'), deleteService);

module.exports = router;
