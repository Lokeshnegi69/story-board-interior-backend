import { Request, Response } from 'express';
import { asyncHandler } from '../utils/errorHandler';
import UseCase from '../models/UseCase';

export const getUseCases = asyncHandler(async (_req: Request, res: Response) => {
    const items = await UseCase.find().sort({ display_order: 1 });
    res.json({ success: true, data: items });
});

export const createUseCase = asyncHandler(async (req: Request, res: Response) => {
    const { title, display_order } = req.body;
    const image = req.file?.path;

    if (!image) {
        res.status(400);
        throw new Error('Image is required');
    }

    const item = await UseCase.create({
        title,
        image,
        display_order: Number(display_order) || 0,
    });

    res.status(201).json({ success: true, data: item });
});

export const updateUseCase = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, display_order } = req.body;

    const updateData: any = {
        title,
        display_order: Number(display_order),
    };

    if (req.file) {
        updateData.image = req.file.path;
    }

    const item = await UseCase.findByIdAndUpdate(id, updateData, { new: true });

    if (!item) {
        res.status(404);
        throw new Error('Use case not found');
    }

    res.json({ success: true, data: item });
});

export const deleteUseCase = asyncHandler(async (req: Request, res: Response) => {
    await UseCase.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
});
