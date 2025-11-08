# Interior Design Portfolio Backend API

A comprehensive, production-ready backend API for an interior design portfolio website with separate user and admin panels.

## Technology Stack

- **Framework**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **File Storage**: Cloudinary for image management
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston

## Features

- Complete authentication system with JWT
- Role-based access control (Admin/Client)
- CRUD operations for all resources
- Image upload and management with Cloudinary
- Input validation and error handling
- API rate limiting
- Comprehensive logging
- RESTful API design

## Database Schema

### Models

1. **User** - User authentication and profiles
2. **Category** - Project categories
3. **Project** - Portfolio projects with embedded images
4. **Inquiry** - Client contact forms
5. **Testimonial** - Client testimonials
6. **HeroSection** - Homepage hero content
7. **SiteSetting** - Site configuration

All models have:
- Automated timestamps (createdAt, updatedAt)
- Proper indexes for performance
- Data validation
- Reference relationships

## Installation

1. Install MongoDB:
```bash
# macOS
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Or use MongoDB Atlas (cloud)
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the following variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Generate a strong secret key
     - `JWT_REFRESH_SECRET`: Generate another strong secret key
     - `CLOUDINARY_*`: Get from Cloudinary dashboard

4. Start MongoDB (if local):
```bash
mongod
```

5. Start the development server:
```bash
npm run dev
```

6. Build for production:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Projects
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/:id` - Get project by ID
- `GET /api/projects/slug/:slug` - Get project by slug
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)
- `POST /api/projects/images` - Upload project image (admin)
- `DELETE /api/projects/:projectId/images/:imageId` - Delete project image (admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `GET /api/categories/slug/:slug` - Get category by slug
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Inquiries
- `GET /api/inquiries` - Get all inquiries (admin)
- `GET /api/inquiries/stats` - Get inquiry statistics (admin)
- `GET /api/inquiries/:id` - Get inquiry by ID (admin)
- `POST /api/inquiries` - Create inquiry (public)
- `PUT /api/inquiries/:id` - Update inquiry (admin)
- `DELETE /api/inquiries/:id` - Delete inquiry (admin)

### Testimonials
- `GET /api/testimonials` - Get all testimonials (public)
- `GET /api/testimonials/:id` - Get testimonial by ID
- `POST /api/testimonials` - Create testimonial (admin)
- `PUT /api/testimonials/:id` - Update testimonial (admin)
- `DELETE /api/testimonials/:id` - Delete testimonial (admin)

### Hero Sections
- `GET /api/hero-sections` - Get all hero sections
- `GET /api/hero-sections/:id` - Get hero section by ID
- `POST /api/hero-sections` - Create hero section (admin)
- `PUT /api/hero-sections/:id` - Update hero section (admin)
- `DELETE /api/hero-sections/:id` - Delete hero section (admin)

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/stats` - Get user statistics
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Dashboard (Admin Only)
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/projects-by-category` - Get projects grouped by category
- `GET /api/dashboard/inquiries-by-status` - Get inquiries grouped by status

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the access token in the Authorization header:

```
Authorization: Bearer <access_token>
```

Access tokens expire after 7 days. Use the refresh token endpoint to get a new access token.

## Role-Based Access Control

Two user roles are supported:
- **admin**: Full access to all endpoints
- **client**: Limited read access

Admin-only endpoints are protected by the `authorize('admin')` middleware.

## Security Features

- Helmet for security headers
- CORS configuration
- Rate limiting (100 requests per 15 minutes)
- Input validation with Joi
- JWT token authentication
- Password hashing with bcrypt
- MongoDB injection prevention (Mongoose)

## Environment Variables

Required variables:
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for access tokens
- `JWT_REFRESH_SECRET`: Secret for refresh tokens
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `CORS_ORIGIN`: Allowed origins (comma-separated)

## MongoDB Connection Strings

### Local MongoDB
```
MONGODB_URI=mongodb://localhost:27017/interior-design
```

### MongoDB Atlas (Cloud)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interior-design?retryWrites=true&w=majority
```

## Data Models

### User
- email, password (hashed)
- full_name, phone, avatar_url
- role (admin/client)
- is_active

### Project
- title, slug, description
- client_name, location, area_sqft
- completion_date
- category_id (ref: Category)
- status (draft/published/archived)
- featured, thumbnail_url
- images (embedded array)
- display_order

### Category
- name, slug, description
- image_url
- is_active, display_order

### Inquiry
- full_name, email, phone
- subject, message
- project_interest, budget_range
- status (new/in_progress/resolved/closed)
- assigned_to (ref: User)
- notes

### Testimonial
- client_name, client_position, client_company
- client_avatar, rating (1-5)
- testimonial_text
- project_id (ref: Project)
- is_featured, is_published
- display_order

## Development

Run the development server with hot reload:
```bash
npm run dev
```

Run linting:
```bash
npm run lint
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Update all secret keys and tokens
3. Configure proper CORS origins
4. Set up a reverse proxy (nginx/Apache)
5. Use a process manager (PM2)
6. Enable HTTPS
7. Set up monitoring and logging
8. Configure MongoDB Atlas for cloud database

## Logging

Winston logger is configured to:
- Log errors to `logs/error.log`
- Log all requests to `logs/combined.log`
- Display colored logs in console during development
