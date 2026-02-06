const { Response  } = require('express');
const { AppError, asyncHandler  } = require('../utils/errorHandler');
const { AuthRequest  } = require('../middleware/auth');
const DesignEthos = require('../models/designEthosModel');

const getAllDesignEthos = asyncHandler(async (req, res) => {
    const designEthos = await DesignEthos.find().sort({ order: 1 });
    res.json({
        success: true,
        data: designEthos,
    });
});

const createDesignEthos = asyncHandler(async (req, res) => {
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

const updateDesignEthos = asyncHandler(async (req, res) => {
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

const deleteDesignEthos = asyncHandler(async (req, res) => {
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


module.exports = {
  getAllDesignEthos,
  createDesignEthos,
  updateDesignEthos,
  deleteDesignEthos,
};