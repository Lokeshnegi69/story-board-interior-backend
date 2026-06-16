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

  if (!projectData.title) {
    throw new AppError('Title is required', 400);
  }

  // Generate slug from title
  const slug = projectData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // Handle image upload if file exists
  let images = [];

  if (uploadedFile) {
    images = [{
      image_url: uploadedFile.path,
      cloudinary_id: uploadedFile.filename,
      caption: projectData.image_caption || '',
      display_order: 0,
      is_primary: true,
    }];
  }

  // Handle boolean conversion from FormData
  if (projectData.featured === 'true') projectData.featured = true;
  if (projectData.featured === 'false') projectData.featured = false;
  if (projectData.visible === 'true') projectData.visible = true;
  if (projectData.visible === 'false') projectData.visible = false;


  // Handle empty category_id
  if (projectData.category_id === "") {
    projectData.category_id = null;
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
  console.log('Updating project:', id, req.body);

  let project = await Project.findById(id);

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  // Handle main project image upload
  if (req.file) {
    const newImage = {
      image_url: req.file.path,
      cloudinary_id: req.file.filename,
      caption: req.body.image_caption || '',
      display_order: 0,
      is_primary: true,
    };

    // Ensure project.images is an array
    if (!project.images) {
      project.images = [];
    }

    const oldImage = project.images.length > 0 ? project.images[0] : null;
    if (oldImage && oldImage.cloudinary_id) {
      try {
        await deleteFromCloudinary(oldImage.cloudinary_id);
      } catch (error) {
        console.error('Error deleting old image from Cloudinary:', error);
      }
    }

    // Replace or add the first image
    if (project.images.length > 0) {
      const restImages = project.images.slice(1);
      project.images = [newImage, ...restImages];
    } else {
      project.images = [newImage];
    }
  }

  // Fields to update
  const fieldsToUpdate = [
    'title',
    'description',
    'section_heading',
    'section_description',
    'client_name',
    'location',
    'area_sqft',
    'completion_date',
    'category_id',
    'status',
    'featured',
    'visible',
    'tags',
    'display_order',
    'thumbnail_url',
  ];

  fieldsToUpdate.forEach((field) => {
    if (req.body[field] !== undefined) {
      let value = req.body[field];

      // Handle string to boolean conversion from FormData
      if (value === 'true') value = true;
      if (value === 'false') value = false;

      // Handle tags string to array
      if (field === 'tags' && typeof value === 'string') {
        value = value.split(',').map(tag => tag.trim()).filter(Boolean);
      }

      // Handle empty category_id and completion_date
      if ((field === 'category_id' || field === 'completion_date') && value === "") {
        value = null;
      }

      // Handle numeric conversion
      if (field === 'area_sqft' || field === 'display_order') {
        value = value === "" || value === null ? null : Number(value);
      }

      project[field] = value;
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

  // Clean up ALL images from Cloudinary (main, section, carousel)
  const allImages = [
    ...(project.images || []),
    ...(project.section_images || []),
    ...(project.carousel_images || []),
  ];

  if (allImages.length > 0) {
    await Promise.all(
      allImages.map((img) => {
        if (img.cloudinary_id) {
          return deleteFromCloudinary(img.cloudinary_id).catch((err) =>
            console.error('Error deleting image from Cloudinary:', err)
          );
        }
      })
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

  const project = await Project.findById(project_id);

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  const newImage = {
    image_url: file.path,
    cloudinary_id: file.filename,
    caption,
    display_order: display_order || 0,
    is_primary: is_primary === 'true' || is_primary === true,
  };

  const updatedProject = await Project.findByIdAndUpdate(
    project_id,
    { $push: { images: newImage } },
    { new: true, runValidators: false }
  );

  if (!updatedProject) {
    throw new AppError('Project not found', 404);
  }

  res.status(201).json({
    success: true,
    message: 'Image uploaded successfully',
    data: updatedProject.images[updatedProject.images.length - 1],
  });
});

const deleteProjectImage = asyncHandler(async (req, res) => {
  const { id, imageId } = req.params;

  const project = await Project.findById(id);

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  if (!project.images || project.images.length === 0) {
    throw new AppError('No images found for this project', 404);
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


const uploadSectionImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  if (!file) {
    throw new AppError('No image file provided', 400);
  }

  const project = await Project.findById(id);
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  const nextIndex = project.section_images ? project.section_images.length : 0;

  if (nextIndex >= 5) {
    throw new AppError('Maximum 5 section images allowed', 400);
  }

  const newSectionImage = {
    image_url: file.path,
    cloudinary_id: file.filename,
    display_order: nextIndex,
  };

  const updatedProject = await Project.findByIdAndUpdate(
    id,
    { $push: { section_images: newSectionImage } },
    { new: true, runValidators: false }
  );

  res.status(201).json({
    success: true,
    message: 'Section image uploaded successfully',
    data: updatedProject.section_images,
  });
});

const uploadCarouselImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  if (!file) {
    throw new AppError('No image file provided', 400);
  }

  const project = await Project.findById(id);
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  const nextIndex = project.carousel_images ? project.carousel_images.length : 0;
  
  const newCarouselImage = {
    image_url: file.path,
    cloudinary_id: file.filename,
    display_order: nextIndex,
  };

  const updatedProject = await Project.findByIdAndUpdate(
    id,
    { $push: { carousel_images: newCarouselImage } },
    { new: true, runValidators: false }
  );

  res.status(201).json({
    success: true,
    message: 'Carousel image uploaded successfully',
    data: updatedProject.carousel_images,
  });
});

const deleteCarouselImage = asyncHandler(async (req, res) => {
  const { id, imageId } = req.params;

  const project = await Project.findById(id);
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  if (!project.carousel_images || project.carousel_images.length === 0) {
    throw new AppError('No carousel images found for this project', 404);
  }

  const imageIndex = project.carousel_images.findIndex(
    (img) => img._id.toString() === imageId
  );

  if (imageIndex === -1) {
    throw new AppError('Image not found in project', 404);
  }

  const image = project.carousel_images[imageIndex];

  if (image.cloudinary_id) {
    await deleteFromCloudinary(image.cloudinary_id);
  }

  project.carousel_images.splice(imageIndex, 1);

  // Reorder
  project.carousel_images.forEach((img, index) => {
    img.display_order = index;
  });

  await project.save();

  res.json({
    success: true,
    message: 'Carousel image deleted successfully',
    data: project.carousel_images,
  });
});

const deleteSectionImage = asyncHandler(async (req, res) => {
  const { id, imageId } = req.params;

  const project = await Project.findById(id);
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  if (!project.section_images || project.section_images.length === 0) {
    throw new AppError('No section images found for this project', 404);
  }

  const imageIndex = project.section_images.findIndex(
    (img) => img._id.toString() === imageId
  );

  if (imageIndex === -1) {
    throw new AppError('Section image not found', 404);
  }

  const image = project.section_images[imageIndex];
  if (image.cloudinary_id) {
    try {
      await deleteFromCloudinary(image.cloudinary_id);
    } catch (error) {
      console.error('Error deleting section image from Cloudinary:', error);
    }
  }

  project.section_images.splice(imageIndex, 1);
  // Reorder remaining images
  project.section_images.forEach((img, idx) => {
    img.display_order = idx;
  });

  await project.save();

  res.json({
    success: true,
    message: 'Section image deleted successfully',
    data: project.section_images,
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
  uploadSectionImage,
  deleteSectionImage,
  uploadCarouselImage,
  deleteCarouselImage,
};
