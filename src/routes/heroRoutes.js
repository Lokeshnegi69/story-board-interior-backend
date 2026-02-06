const { Router } = require('express');
const upload = require('../middleware/upload');
const {
    getAllHeroSections,
    getHeroSectionById,
    createHeroSection,
    updateHeroSection,
    deleteHeroSection,
} = require('../controllers/heroController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { heroSectionSchema } = require('../utils/validators');

const router = Router();

router.get('/', getAllHeroSections);
router.get('/:id', getHeroSectionById);
router.post('/', authenticate, authorize('admin'), upload.single('image'), validate(heroSectionSchema), createHeroSection);
router.put('/:id', authenticate, authorize('admin'), validate(heroSectionSchema), updateHeroSection);
router.delete('/:id', authenticate, authorize('admin'), deleteHeroSection);

module.exports = router;
