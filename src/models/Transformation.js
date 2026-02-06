const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransformationSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        image_before: {
            type: String,
            required: true,
        },
        image_after: {
            type: String,
            required: true,
        },
        is_published: {
            type: Boolean,
            default: true,
        },
        display_order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Transformation', TransformationSchema);
