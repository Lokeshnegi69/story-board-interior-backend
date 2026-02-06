const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @typedef {Object} ProjectImage
 * @property {string} image_url - URL of the image
 * @property {string} [cloudinary_id] - Cloudinary ID for the image
 * @property {string} [caption] - Image caption
 * @property {number} display_order - Display order of the image
 * @property {boolean} is_primary - Whether this is the primary image
 */

/**
 * @typedef {Object} Project
 * @property {string} title - Project title
 * @property {string} slug - URL-friendly slug
 * @property {string} [description] - Project description
 * @property {string} [client_name] - Client name
 * @property {string} [location] - Project location
 * @property {number} [area_sqft] - Area in square feet
 * @property {Date} [completion_date] - Project completion date
 * @property {mongoose.Types.ObjectId} [category_id] - Category reference
 * @property {'draft'|'published'|'archived'} status - Project status
 * @property {boolean} featured - Whether project is featured
 * @property {string} [thumbnail_url] - Thumbnail URL
 * @property {ProjectImage[]} images - Project images
 * @property {number} display_order - Display order
 * @property {mongoose.Types.ObjectId} [created_by] - User who created the project
 */

const ProjectImageSchema = new Schema(
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

const ProjectSchema = new Schema(
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

module.exports = mongoose.model('Project', ProjectSchema);
