const { Response } = require('express');
const { AppError, asyncHandler } = require('../utils/errorHandler');
const { AuthRequest } = require('../middleware/auth');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinaryHelper');
const Project = require('../models/Project');

const getAllProjects = asyncHandler(async (req, res) => {
  const { page = 1, limit = 50, status, category_id, featured } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  const query = {};

  if (status) {
    query.status = status;
  } else if (!req.user || req.user.role !== 'admin') {
    query.status = 'published';
  }

  if (category_id) {
    query.category_id = category_id;
  }

  if (featured === 'true') {
    query.featured = true;
  }

  const [projects, total] = await Promise.all([
    Project.find(query)
      .populate('category_id', 'name slug')
      .sort({ display_order: 1 })
      .skip(offset)
      .limit(Number(limit)),
    Project.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: projects,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id).populate('category_id', 'name slug');

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  if (project.status !== 'published' && (!req.user || req.user.role !== 'admin')) {
    throw new AppError('Project not found', 404);
  }

  res.json({
    success: true,
    data: project,
  });
});

const getProjectBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const project = await Project.findOne({ slug }).populate('category_id', 'name slug');

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  if (project.status !== 'published' && (!req.user || req.user.role !== 'admin')) {
    throw new AppError('Project not found', 404);
  }

  res.json({
    success: true,
    data: project,
  });
});

const createProject = asyncHandler(async (req, res) => {
  const projectData = req.body;
  const uploadedFile = req.file;

  // Generate slug from title
  const slug = projectData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // Handle image upload if file exists
  let images = [];

  if (uploadedFile) {
    // Assuming you're using Cloudinary
    const result = uploadedFile.path;

    images = [{
      image_url: result,
      cloudinary_id: result,
      caption: projectData.image_caption || '',
      display_order: 0,
      is_primary: true,
    }];
  }

  const project = await Project.create({
    ...projectData,
    slug,
    images
  });

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project,
  });
});

const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let project = await Project.findById(id);

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  // Handle image upload
  if (req.file) {
    console.log(req.file);
    const newImage = {
      image_url: req.file.path,
      cloudinary_id: req.file.filename,
      caption: req.body.image_caption || '',
      display_order: 0,
      is_primary: true,
    };
    const oldImage = project.images[0];
    if (oldImage.cloudinary_id) {
      try {
        await deleteFromCloudinary(oldImage.cloudinary_id);
      } catch (error) {
        console.error('Error deleting old image from Cloudinary:', error);
      }
    }
    // Replace the old image
    project.images[0] = newImage;
  }

  // Update other fields
  const fieldsToUpdate = [
    'title',
    'description',
    'client_name',
    'location',
    'area_sqft',
    'completion_date',
    'category_id',
    'status',
    'featured',
    'display_order',
    'thumbnail_url',
  ];

  fieldsToUpdate.forEach((field) => {
    if (req.body[field] !== undefined) {
      project[field] = req.body[field];
    }
  });

  // Update slug if title changed
  if (req.body.title) {
    project.slug = req.body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  await project.save();

  res.json({
    success: true,
    message: 'Project updated successfully',
    data: project,
  });
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  if (project.images && project.images.length > 0) {
    await Promise.all(
      project.images.map((img) => img.cloudinary_id && deleteFromCloudinary(img.cloudinary_id))
    );
  }

  await Project.findByIdAndDelete(id);

  res.json({
    success: true,
    message: 'Project deleted successfully',
  });
});

const uploadProjectImage = asyncHandler(async (req, res) => {
  const { project_id, caption, display_order, is_primary } = req.body;
  const file = req.file;

  if (!file) {
    throw new AppError('No image file provided', 400);
  }

  const result = await uploadToCloudinary(
    `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
    'projects'
  );

  const project = await Project.findById(project_id);

  if (!project) {
    await deleteFromCloudinary(result.public_id);
    throw new AppError('Project not found', 404);
  }

  project.images.push({
    image_url: result.secure_url,
    cloudinary_id: result.public_id,
    caption,
    display_order: display_order || 0,
    is_primary: is_primary || false,
  });

  await project.save();

  res.status(201).json({
    success: true,
    message: 'Image uploaded successfully',
    data: project.images[project.images.length - 1],
  });
});

const deleteProjectImage = asyncHandler(async (req, res) => {
  const { projectId, imageId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  const imageIndex = project.images.findIndex((img) => img._id.toString() === imageId);

  if (imageIndex === -1) {
    throw new AppError('Image not found', 404);
  }

  const image = project.images[imageIndex];

  if (image.cloudinary_id) {
    await deleteFromCloudinary(image.cloudinary_id);
  }

  project.images.splice(imageIndex, 1);
  await project.save();

  res.json({
    success: true,
    message: 'Image deleted successfully',
  });
});


module.exports = {
  getAllProjects,
  getProjectById,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
  deleteProjectImage,
};