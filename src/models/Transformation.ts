import mongoose, { Schema, Document } from 'mongoose';

export interface ITransformation extends Document {
    title: string;
    description: string;
    image_before: string;
    image_after: string;
    is_published: boolean;
    display_order: number;
}

const TransformationSchema = new Schema<ITransformation>(
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

export default mongoose.model<ITransformation>('Transformation', TransformationSchema);
