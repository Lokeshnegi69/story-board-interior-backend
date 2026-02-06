import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceDetail extends Document {
    title: string;
    description_1: string;
    description_2?: string; // Optional quote/secondary desc
    image: string;
    type: 'section' | 'gallery'; // section = large text+img, gallery = just img
    display_order: number;
    image_position: 'left' | 'right'; // Added
}

const ServiceDetailSchema = new Schema<IServiceDetail>(
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

export default mongoose.model<IServiceDetail>('ServiceDetail', ServiceDetailSchema);
