const { Response  } = require('express');
const { asyncHandler  } = require('../utils/errorHandler');
const { AuthRequest  } = require('../middleware/auth');
const Project = require('../models/Project');
const Inquiry = require('../models/Inquiry');
const Testimonial = require('../models/Testimonial');
const Category = require('../models/Category');
const User = require('../models/User');

const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalProjects,
    publishedProjects,
    draftProjects,
    totalInquiries,
    newInquiries,
    totalTestimonials,
    publishedTestimonials,
    totalCategories,
    activeCategories,
    totalUsers,
    recentProjects,
    recentInquiries,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ status: 'published' }),
    Project.countDocuments({ status: 'draft' }),
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ status: 'new' }),
    Testimonial.countDocuments(),
    Testimonial.countDocuments({ is_published: true }),
    Category.countDocuments(),
    Category.countDocuments({ is_active: true }),
    User.countDocuments(),
    Project.find().select('_id title slug status createdAt').sort({ createdAt: -1 }).limit(5),
    Inquiry.find()
      .select('_id full_name email subject status createdAt')
      .sort({ createdAt: -1 })
      .limit(5),
  ]);

  res.json({
    success: true,
    data: {
      stats: {
        projects: {
          total: totalProjects,
          published: publishedProjects,
          draft: draftProjects,
        },
        inquiries: {
          total: totalInquiries,
          new: newInquiries,
        },
        testimonials: {
          total: totalTestimonials,
          published: publishedTestimonials,
        },
        categories: {
          total: totalCategories,
          active: activeCategories,
        },
        users: {
          total: totalUsers,
        },
      },
      recentProjects,
      recentInquiries,
    },
  });
});

const getProjectsByCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find().select('_id name slug');

  const projectsByCategory = await Promise.all(
    categories.map(async (category) => {
      const count = await Project.countDocuments({
        category_id: category._id,
        status: 'published',
      });

      return {
        category: category.name,
        count,
      };
    })
  );

  res.json({
    success: true,
    data: projectsByCategory,
  });
});

const getInquiriesByStatus = asyncHandler(async (req, res) => {
  const statuses = ['new', 'in_progress', 'resolved', 'closed'];

  const inquiriesByStatus = await Promise.all(
    statuses.map(async (status) => {
      const count = await Inquiry.countDocuments({ status });

      return {
        status,
        count,
      };
    })
  );

  res.json({
    success: true,
    data: inquiriesByStatus,
  });
});


module.exports = {
  getDashboardStats,
  getProjectsByCategory,
  getInquiriesByStatus,
};