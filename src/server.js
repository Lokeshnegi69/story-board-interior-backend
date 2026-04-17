const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const { errorHandler, notFoundHandler } = require('./utils/errorHandler');
const logger = require('./config/logger');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const heroRoutes = require('./routes/heroRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const designEthosRoutes = require('./routes/designEthosRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const serviceDetailRoutes = require('./routes/serviceDetailRoutes');
const transformationRoutes = require('./routes/transformationRoutes');
const finishRoutes = require('./routes/finishRoutes');
const useCaseRoutes = require('./routes/useCaseRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(limiter);
app.set('trust proxy', true);

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            "https://www.storyboardinterior.com",
            "https://storyboardinterior.com",
            'http://localhost:5174', // Vite default
            'http://localhost:5173'
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
app.use('/api/design-ethos', designEthosRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/transformations', transformationRoutes);
app.use('/api/service-details', serviceDetailRoutes);
app.use('/api/finishes', finishRoutes);
app.use('/api/use-cases', useCaseRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

connectDB().then(() => {
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
});

module.exports = app;
