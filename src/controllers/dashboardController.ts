import { Response } from 'express';
import { AppError, asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../middleware/auth';
import Project from '../models/Project';
import Inquiry from '../models/Inquiry';
import Testimonial from '../models/Testimonial';
import Category from '../models/Category';
import User from '../models/User';

export const getDashboardStats = asyncHandler(async (req: AuthRequest, res: Response) => {
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

export const getProjectsByCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
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

export const getInquiriesByStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
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
