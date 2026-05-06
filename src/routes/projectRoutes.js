const { Router } = require('express');
const {
    getAllProjects,
    getProjectById,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject,
    uploadProjectImage,
    deleteProjectImage,
    uploadSectionImage,
    deleteSectionImage,
    uploadCarouselImage,
    deleteCarouselImage,
} = require('../controllers/projectController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { projectSchema } = require('../utils/validators');
const upload = require('../middleware/upload');

const router = Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.get('/slug/:slug', getProjectBySlug);
router.post('/', authenticate, authorize('admin'), upload.single('image'), validate(projectSchema), createProject);
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), validate(projectSchema), updateProject);
router.delete('/:id', authenticate, authorize('admin'), deleteProject);
router.post('/images', authenticate, authorize('admin'), upload.single('image'), uploadProjectImage);
router.delete('/:id/images/:imageId', authenticate, authorize('admin'), deleteProjectImage);

// Section images (5-image mosaic grid)
router.post('/:id/section-images', authenticate, authorize('admin'), upload.single('image'), uploadSectionImage);
router.delete('/:id/section-images/:imageId', authenticate, authorize('admin'), deleteSectionImage);

// Carousel images
router.post('/:id/carousel-images', authenticate, authorize('admin'), upload.single('image'), uploadCarouselImage);
router.delete('/:id/carousel-images/:imageId', authenticate, authorize('admin'), deleteCarouselImage);

module.exports = router;
