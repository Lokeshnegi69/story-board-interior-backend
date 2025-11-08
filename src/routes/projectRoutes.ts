import { Router } from 'express';
import {
  getAllProjects,
  getProjectById,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
  deleteProjectImage,
} from '../controllers/projectController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { projectSchema } from '../utils/validators';
import upload from '../middleware/upload';

const router = Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.get('/slug/:slug', getProjectBySlug);
router.post('/', authenticate, authorize('admin'), upload.single('image'), validate(projectSchema), createProject);
router.put('/:id', authenticate, authorize('admin'), upload.single('image'), validate(projectSchema), updateProject);
router.delete('/:id', authenticate, authorize('admin'), deleteProject);
router.post('/images', authenticate, authorize('admin'), upload.single('image'), uploadProjectImage);
router.delete('/images/:id', authenticate, authorize('admin'), deleteProjectImage);

export default router;
