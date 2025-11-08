import { Response } from 'express';
import { AppError, asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../middleware/auth';
import Inquiry from '../models/Inquiry';

export const getAllInquiries = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 10, status } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  const query: any = {};

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

export const getInquiryById = asyncHandler(async (req: AuthRequest, res: Response) => {
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

export const createInquiry = asyncHandler(async (req: AuthRequest, res: Response) => {
  const inquiry = await Inquiry.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Inquiry submitted successfully',
    data: inquiry,
  });
});

export const updateInquiry = asyncHandler(async (req: AuthRequest, res: Response) => {
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

export const deleteInquiry = asyncHandler(async (req: AuthRequest, res: Response) => {
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

export const getInquiryStats = asyncHandler(async (req: AuthRequest, res: Response) => {
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
