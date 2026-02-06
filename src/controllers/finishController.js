const { Response  } = require('express');
const { asyncHandler  } = require('../utils/errorHandler');
const Finish = require('../models/Finish');
const { AuthRequest  } = require('../middleware/auth');

const getFinishes = asyncHandler(async (_req, res) => {
    const items = await Finish.find().sort({ display_order: 1 });
    res.json({ success: true, data: items });
});

const createFinish = asyncHandler(async (req, res) => {
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

const updateFinish = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, display_order } = req.body;

    const updateData = {
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

const deleteFinish = asyncHandler(async (req, res) => {
    await Finish.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
});


module.exports = {
  getFinishes,
  createFinish,
  updateFinish,
  deleteFinish,
};