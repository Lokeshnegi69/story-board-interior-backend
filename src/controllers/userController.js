const { Response  } = require('express');
const { AppError, asyncHandler  } = require('../utils/errorHandler');
const { AuthRequest  } = require('../middleware/auth');
const User = require('../models/User');

const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, role, is_active } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  const query = {};

  if (role) {
    query.role = role;
  }

  if (is_active !== undefined) {
    query.is_active = is_active === 'true';
  }

  const [users, total] = await Promise.all([
    User.find(query).sort({ createdAt: -1 }).skip(offset).limit(Number(limit)),
    User.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    data: user,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    message: 'User updated successfully',
    data: user,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (id === req.user?.userId) {
    throw new AppError('You cannot delete your own account', 400);
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    message: 'User deleted successfully',
  });
});

const getUserStats = asyncHandler(async (req, res) => {
  const [total, admins, clients, active] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'admin' }),
    User.countDocuments({ role: 'client' }),
    User.countDocuments({ is_active: true }),
  ]);

  res.json({
    success: true,
    data: {
      total,
      admins,
      clients,
      active,
    },
  });
});


module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
};