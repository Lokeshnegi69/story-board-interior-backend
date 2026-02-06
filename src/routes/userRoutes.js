const { Router } = require('express');
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserStats,
} = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { userUpdateSchema } = require('../utils/validators');

const router = Router();

router.get('/', authenticate, authorize('admin'), getAllUsers);
router.get('/stats', authenticate, authorize('admin'), getUserStats);
router.get('/:id', authenticate, authorize('admin'), getUserById);
router.put('/:id', authenticate, authorize('admin'), validate(userUpdateSchema), updateUser);
router.delete('/:id', authenticate, authorize('admin'), deleteUser);

module.exports = router;
