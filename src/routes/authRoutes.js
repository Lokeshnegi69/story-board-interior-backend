const { Router } = require('express');
const {
    register,
    login,
    logout,
    refreshToken,
    getProfile,
    updateProfile,
} = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { registerSchema, loginSchema, userUpdateSchema } = require('../utils/validators');

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', authenticate, logout);
router.post('/refresh', refreshToken);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validate(userUpdateSchema), updateProfile);

module.exports = router;
