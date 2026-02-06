const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceDetailSchema = new Schema(
    {
        title: { type: String, required: false }, // Optional for gallery
        description_1: { type: String, required: false },
        description_2: { type: String, required: false },
        image: { type: String, required: true },
        type: { type: String, enum: ['section', 'gallery'], default: 'section' },
        display_order: { type: Number, default: 0 },
        image_position: { type: String, enum: ['left', 'right'], default: 'left' }, // Added
    },
    { timestamps: true }
);

module.exports = mongoose.model('ServiceDetail', ServiceDetailSchema);
