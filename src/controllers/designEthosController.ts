import { Response } from 'express';
import { AppError, asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../middleware/auth';
import DesignEthos from '../models/designEthosModel';

export const getAllDesignEthos = asyncHandler(async (req: AuthRequest, res: Response) => {
    const designEthos = await DesignEthos.find().sort({ order: 1 });
    res.json({
        success: true,
        data: designEthos,
    });
});

export const createDesignEthos = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { title, desc, order, status } = req.body;
    const imgUrl = req.file?.path;

    if (!imgUrl) {
        throw new AppError('Image is required', 400);
    }

    const designEthos = await DesignEthos.create({
        title,
        desc,
        img: imgUrl,
        order: order || 0,
        status: status || 'published'
    });

    res.status(201).json({
        success: true,
        data: designEthos,
    });
});

export const updateDesignEthos = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
        updateData.img = req.file.path;
    }

    const designEthos = await DesignEthos.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });

    if (!designEthos) {
        throw new AppError('Design Ethos not found', 404);
    }

    res.json({
        success: true,
        data: designEthos,
    });
});

export const deleteDesignEthos = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const designEthos = await DesignEthos.findByIdAndDelete(id);

    if (!designEthos) {
        throw new AppError('Design Ethos not found', 404);
    }

    res.json({
        success: true,
        message: 'Design Ethos deleted successfully',
    });
});
