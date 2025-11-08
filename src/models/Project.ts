import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProjectImage {
  image_url: string;
  cloudinary_id?: string;
  caption?: string;
  display_order: number;
  is_primary: boolean;
}

export interface IProject extends Document {
  title: string;
  slug: string;
  description?: string;
  client_name?: string;
  location?: string; 
  area_sqft?: number;
  completion_date?: Date;
  category_id?: Types.ObjectId;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  thumbnail_url?: string;
  images: IProjectImage[];
  display_order: number;
  created_by?: Types.ObjectId;
}

const ProjectImageSchema = new Schema<IProjectImage>(
  {
    image_url: {
      type: String,
      required: true,
    },
    cloudinary_id: {
      type: String,
    },
    caption: {
      type: String,
      trim: true,
    },
    display_order: {
      type: Number,
      default: 0,
    },
    is_primary: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
    timestamps: true,
  }
);

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    client_name: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    area_sqft: {
      type: Number,
    },
    completion_date: {
      type: Date,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    thumbnail_url: {
      type: String,
    },
    images: [ProjectImageSchema],
    display_order: {
      type: Number,
      default: 0,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ category_id: 1 });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ featured: 1 });

export default mongoose.model<IProject>('Project', ProjectSchema);
