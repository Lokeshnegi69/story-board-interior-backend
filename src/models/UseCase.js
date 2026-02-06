const mongoose = require('mongoose');
const { Schema } = mongoose;

const UseCaseSchema = new Schema(
    {
        title: { type: String, required: true },
        image: { type: String, required: true },
        display_order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('UseCase', UseCaseSchema);
