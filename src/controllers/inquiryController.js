const { Response  } = require('express');
const { AppError, asyncHandler  } = require('../utils/errorHandler');
const { AuthRequest  } = require('../middleware/auth');
const Inquiry = require('../models/Inquiry');

const getAllInquiries = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  const query = {};

  if (status) {
    query.status = status;
  }

  const [inquiries, total] = await Promise.all([
    Inquiry.find(query)
      .populate('assigned_to', 'full_name email')
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(Number(limit)),
    Inquiry.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: inquiries,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

const getInquiryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const inquiry = await Inquiry.findById(id).populate('assigned_to', 'full_name email');

  if (!inquiry) {
    throw new AppError('Inquiry not found', 404);
  }

  res.json({
    success: true,
    data: inquiry,
  });
});

const createInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Inquiry submitted successfully',
    data: inquiry,
  });
});

const updateInquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const inquiry = await Inquiry.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!inquiry) {
    throw new AppError('Inquiry not found', 404);
  }

  res.json({
    success: true,
    message: 'Inquiry updated successfully',
    data: inquiry,
  });
});

const deleteInquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const inquiry = await Inquiry.findByIdAndDelete(id);

  if (!inquiry) {
    throw new AppError('Inquiry not found', 404);
  }

  res.json({
    success: true,
    message: 'Inquiry deleted successfully',
  });
});

const getInquiryStats = asyncHandler(async (req, res) => {
  const [total, newCount, inProgress, resolved] = await Promise.all([
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ status: 'new' }),
    Inquiry.countDocuments({ status: 'in_progress' }),
    Inquiry.countDocuments({ status: 'resolved' }),
  ]);

  res.json({
    success: true,
    data: {
      total,
      new: newCount,
      in_progress: inProgress,
      resolved,
    },
  });
});


module.exports = {
  getAllInquiries,
  getInquiryById,
  createInquiry,
  updateInquiry,
  deleteInquiry,
  getInquiryStats,
};