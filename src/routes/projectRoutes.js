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
router.delete('/images/:id', authenticate, authorize('admin'), deleteProjectImage);

module.exports = router;
