const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    icon: { type: String, required: true },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
