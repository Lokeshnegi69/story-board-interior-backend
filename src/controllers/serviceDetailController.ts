import { Request, Response } from 'express';
import { asyncHandler } from '../utils/errorHandler';
import ServiceDetail from '../models/ServiceDetail';

export const getServiceDetails = asyncHandler(async (req: Request, res: Response) => {
    const items = await ServiceDetail.find().sort({ display_order: 1 });
    res.json({ success: true, data: items });
});

export const createServiceDetail = asyncHandler(async (req: Request, res: Response) => {
    const { title, description_1, description_2, type, display_order, image_position } = req.body;
    const image = req.file?.path;

    if (!image) {
        res.status(400);
        throw new Error('Image is required');
    }

    const item = await ServiceDetail.create({
        title,
        description_1,
        description_2,
        image,
        type: type || 'section',
        display_order: Number(display_order) || 0,
        image_position: image_position || 'left',
    });

    res.status(201).json({ success: true, data: item });
});

export const deleteServiceDetail = asyncHandler(async (req: Request, res: Response) => {
    await ServiceDetail.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
});

export const updateServiceDetail = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description_1, description_2, type, display_order, image_position } = req.body;

    const updateData: any = {
        title,
        description_1,
        description_2,
        type,
        display_order: Number(display_order),
        image_position,
    };

    if (req.file) {
        updateData.image = req.file.path;
    }

    const item = await ServiceDetail.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ success: true, data: item });
});
