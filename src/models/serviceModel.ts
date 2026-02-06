import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
    title: string;
    desc: string;
    icon: string; // URL from Cloudinary or similar
    order: number;
    status: 'draft' | 'published';
}

const ServiceSchema: Schema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    icon: { type: String, required: true },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
}, { timestamps: true });

export default mongoose.model<IService>('Service', ServiceSchema);
