const mongoose = require('mongoose');
const { Schema } = mongoose;

const FinishSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        display_order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Finish', FinishSchema);
