import mongoose, { Schema, Document } from 'mongoose';

export interface IFinish extends Document {
    title: string;
    description: string;
    image: string;
    display_order: number;
}

const FinishSchema = new Schema<IFinish>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        display_order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<IFinish>('Finish', FinishSchema);
