import mongoose, { Schema, Document } from 'mongoose';

export interface IUseCase extends Document {
    title: string;
    image: string;
    display_order: number;
}

const UseCaseSchema = new Schema<IUseCase>(
    {
        title: { type: String, required: true },
        image: { type: String, required: true },
        display_order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<IUseCase>('UseCase', UseCaseSchema);
