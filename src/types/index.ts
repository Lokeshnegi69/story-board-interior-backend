export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'client';
  phone?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string;
  client_name?: string;
  location?: string;
  area_sqft?: number;
  completion_date?: string;
  category_id?: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  thumbnail_url?: string;
  display_order: number;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  cloudinary_id?: string;
  caption?: string;
  display_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface Inquiry {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  project_interest?: string;
  budget_range?: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  assigned_to?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_position?: string;
  client_company?: string;
  client_avatar?: string;
  rating: number;
  testimonial_text: string;
  project_id?: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: any;
  description?: string;
  updated_by?: string;
  updated_at: string;
}

export interface HeroSection {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  background_image?: string;
  cta_text?: string;
  cta_link?: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
