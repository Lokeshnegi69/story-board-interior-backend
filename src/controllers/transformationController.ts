import { Response } from 'express';
import { asyncHandler } from '../utils/errorHandler';
import Transformation from '../models/Transformation';
import { AuthRequest } from '../middleware/auth';

export const getTransformations = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const items = await Transformation.find().sort({ display_order: 1 });
    res.json({ success: true, data: items });
});

export const createTransformation = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { title, description, display_order, is_published } = req.body;

    // Handle multiple file uploads
    // req.files is likely: { image_before: [file], image_after: [file] }
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const image_before = files?.['image_before']?.[0]?.path;
    const image_after = files?.['image_after']?.[0]?.path;

    if (!image_before || !image_after) {
        res.status(400);
        throw new Error('Both Before and After images are required');
    }

    const item = await Transformation.create({
        title,
        description,
        image_before,
        image_after,
        display_order: display_order || 0,
        is_published: is_published === 'true' || is_published === true,
    });

    res.status(201).json({ success: true, data: item });
});

export const updateTransformation = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { title, description, display_order, is_published } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const updateData: any = {
        title,
        description,
        display_order,
        is_published: is_published === 'true' || is_published === true,
    };

    if (files?.['image_before']?.[0]) {
        updateData.image_before = files['image_before'][0].path;
    }
    if (files?.['image_after']?.[0]) {
        updateData.image_after = files['image_after'][0].path;
    }

    const item = await Transformation.findByIdAndUpdate(id, updateData, { new: true });
    if (!item) throw new Error('Transformation not found');

    res.json({ success: true, data: item });
});

export const deleteTransformation = asyncHandler(async (req: AuthRequest, res: Response) => {
    await Transformation.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
});
