import { Response } from 'express';
import { AppError, asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../middleware/auth';
import Service from '../models/serviceModel';

export const getAllServices = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const services = await Service.find().sort({ order: 1 });
    res.json({
        success: true,
        data: services,
    });
});

export const createService = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { title, desc, order, status } = req.body;
    const iconUrl = req.file?.path || req.body.icon;

    if (!iconUrl) {
        throw new AppError('Icon image or name is required', 400);
    }

    const service = await Service.create({
        title,
        desc,
        icon: iconUrl,
        order: order || 0,
        status: status || 'published'
    });

    res.status(201).json({
        success: true,
        data: service,
    });
});

export const updateService = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
        updateData.icon = req.file.path;
    } else if (req.body.icon) {
        // Allow updating icon via string (e.g., Lucide icon name)
        updateData.icon = req.body.icon;
    }

    const service = await Service.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });

    if (!service) {
        throw new AppError('Service not found', 404);
    }

    res.json({
        success: true,
        data: service,
    });
});

export const deleteService = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
        throw new AppError('Service not found', 404);
    }

    res.json({
        success: true,
        message: 'Service deleted successfully',
    });
});
