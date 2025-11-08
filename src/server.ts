import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { errorHandler, notFoundHandler } from './utils/errorHandler';
import logger from './config/logger';
import connectDB from './config/database';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import categoryRoutes from './routes/categoryRoutes';
import inquiryRoutes from './routes/inquiryRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import heroRoutes from './routes/heroRoutes';
import userRoutes from './routes/userRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }}
));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(limiter);

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      process.env.ADMIN_URL || 'http://localhost:3001',
      'http://localhost:5175', // Vite default
      'http://localhost:5176'
    ];
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};


app.use(cors(corsOptions));


app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Interior Design Portfolio API',
    version: '1.0.0',
  });
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/hero-sections', heroRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
});

export default app;
