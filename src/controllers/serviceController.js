const { Response  } = require('express');
const { AppError, asyncHandler  } = require('../utils/errorHandler');
const { AuthRequest  } = require('../middleware/auth');
const Service = require('../models/serviceModel');

const getAllServices = asyncHandler(async (_req, res) => {
    const services = await Service.find().sort({ order: 1 });
    res.json({
        success: true,
        data: services,
    });
});

const createService = asyncHandler(async (req, res) => {
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

const updateService = asyncHandler(async (req, res) => {
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

const deleteService = asyncHandler(async (req, res) => {
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


module.exports = {
  getAllServices,
  createService,
  updateService,
  deleteService,
};