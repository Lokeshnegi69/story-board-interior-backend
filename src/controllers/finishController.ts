import { Response } from 'express';
import { asyncHandler } from '../utils/errorHandler';
import Finish from '../models/Finish';
import { AuthRequest } from '../middleware/auth';

export const getFinishes = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const items = await Finish.find().sort({ display_order: 1 });
    res.json({ success: true, data: items });
});

export const createFinish = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { title, description, display_order } = req.body;
    const image = req.file?.path;

    if (!image) {
        res.status(400);
        throw new Error('Image is required');
    }

    const item = await Finish.create({
        title,
        description,
        image,
        display_order: Number(display_order) || 0,
    });

    res.status(201).json({ success: true, data: item });
});

export const updateFinish = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { title, description, display_order } = req.body;

    const updateData: any = {
        title,
        description,
        display_order: Number(display_order),
    };

    if (req.file) {
        updateData.image = req.file.path;
    }

    const item = await Finish.findByIdAndUpdate(id, updateData, { new: true });

    if (!item) {
        res.status(404);
        throw new Error('Finish not found');
    }

    res.json({ success: true, data: item });
});

export const deleteFinish = asyncHandler(async (req: AuthRequest, res: Response) => {
    await Finish.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
});
