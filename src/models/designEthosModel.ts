import mongoose, { Schema, Document } from 'mongoose';

export interface IDesignEthos extends Document {
    title: string;
    desc: string;
    img: string; // URL from Cloudinary or similar
    order: number;
    status: 'draft' | 'published';
}

const DesignEthosSchema: Schema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
}, { timestamps: true });

export default mongoose.model<IDesignEthos>('DesignEthos', DesignEthosSchema);
