const { Router } = require('express');
const upload = require('../middleware/upload');
const {
    getAllDesignEthos,
    createDesignEthos,
    updateDesignEthos,
    deleteDesignEthos,
} = require('../controllers/designEthosController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { designEthosSchema } = require('../utils/validators');

const router = Router();

router.get('/', getAllDesignEthos);
router.post('/', authenticate, authorize('admin'), upload.single('image'), validate(designEthosSchema), createDesignEthos);
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), validate(designEthosSchema), updateDesignEthos);
router.delete('/:id', authenticate, authorize('admin'), deleteDesignEthos);

module.exports = router;
