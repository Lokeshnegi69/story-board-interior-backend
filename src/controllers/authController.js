const { Response  } = require('express');
const { AppError, asyncHandler  } = require('../utils/errorHandler');
const { generateTokenPair, verifyRefreshToken  } = require('../utils/jwt');
const { AuthRequest  } = require('../middleware/auth');
const User = require('../models/User');

const register = asyncHandler(async (req, res) => {
  const { email, password, full_name, phone } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User with this email already exists', 400);
  }

  const user = await User.create({
    email,
    password,
    full_name,
    phone,
    role: 'client',
    is_active: true,
  });

  const tokens = generateTokenPair({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: user._id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
      ...tokens,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid credentials', 401);
  }

  if (!user.is_active) {
    throw new AppError('Account is inactive', 403);
  }

  const tokens = generateTokenPair({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        avatar_url: user.avatar_url,
      },
      ...tokens,
    },
  });
});

const logout = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful',
  });
});

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError('Refresh token is required', 400);
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const tokens = generateTokenPair({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    res.json({
      success: true,
      data: tokens,
    });
  } catch (error) {
    throw new AppError('Invalid refresh token', 401);
  }
});

const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.userId;

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    data: user,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.userId;
  const { full_name, phone, avatar_url } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { full_name, phone, avatar_url },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: user,
  });
});


module.exports = {
  register,
  login,
  logout,
  refreshToken,
  getProfile,
  updateProfile,
};