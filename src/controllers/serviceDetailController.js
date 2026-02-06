const { Response  } = require('express');
const { AuthRequest  } = require('../middleware/auth');
const { asyncHandler  } = require('../utils/errorHandler');
const ServiceDetail = require('../models/ServiceDetail');

const getServiceDetails = asyncHandler(async (req, res) => {
    const items = await ServiceDetail.find().sort({ display_order: 1 });
    res.json({ success: true, data: items });
});

const createServiceDetail = asyncHandler(async (req, res) => {
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

const deleteServiceDetail = asyncHandler(async (req, res) => {
    await ServiceDetail.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
});

const updateServiceDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description_1, description_2, type, display_order, image_position } = req.body;

    const updateData = {
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


module.exports = {
  getServiceDetails,
  createServiceDetail,
  deleteServiceDetail,
  updateServiceDetail,
};