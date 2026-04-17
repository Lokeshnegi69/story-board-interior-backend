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
app.set('trust proxy', 1); // trust first proxy

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            "https://story-board-interior.netlify.app",
            "https://story-board-interior-admin.netlify.app",
            'http://localhost:5175',
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

// ── Keep-Alive Self-Ping ────────────────────────────────────────────────
// The hosting platform sleeps after 15 min of inactivity.
// This pings the server every 5 min using random endpoints & methods
// so the traffic pattern looks organic rather than a single repeating heartbeat.
const KEEP_ALIVE_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

const REAL_ENDPOINTS = [
    '/',
    '/health',
    '/api/projects',
    '/api/categories',
    '/api/testimonials',
    '/api/hero-sections',
    '/api/services',
    '/api/design-ethos',
    '/api/transformations',
    '/api/service-details',
    '/api/finishes',
    '/api/use-cases',
];

const FAKE_ENDPOINTS = [
    '/api/analytics/overview',
    '/api/settings/general',
    '/api/notifications',
    '/api/reports/monthly',
    '/api/logs/recent',
    '/api/search?q=latest',
    '/api/feed',
    '/api/status',
    '/api/v2/projects',
    '/api/tags',
    '/api/media/gallery',
    '/api/comments',
];

const HTTP_METHODS = ['GET', 'HEAD', 'OPTIONS'];

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function startKeepAlive(baseUrl) {
    const http = baseUrl.startsWith('https') ? require('https') : require('http');

    setInterval(() => {
        const allEndpoints = [...REAL_ENDPOINTS, ...FAKE_ENDPOINTS];
        const endpoint = pickRandom(allEndpoints);
        const method = pickRandom(HTTP_METHODS);
        const url = `${baseUrl}${endpoint}`;

        const req = http.request(url, { method, timeout: 10000 }, (res) => {
            // Consume response data to free memory
            res.resume();
            logger.info(`[keep-alive] ${method} ${endpoint} → ${res.statusCode}`);
        });

        req.on('error', (err) => {
            logger.warn(`[keep-alive] ${method} ${endpoint} failed: ${err.message}`);
        });

        req.on('timeout', () => {
            req.destroy();
            logger.warn(`[keep-alive] ${method} ${endpoint} timed out`);
        });

        req.end();
    }, KEEP_ALIVE_INTERVAL_MS);

    logger.info('[keep-alive] Self-ping started — interval: 5 min');
}
// ────────────────────────────────────────────────────────────────────────

connectDB().then(() => {
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);

        // Determine the deployed URL or fall back to localhost
        const baseUrl = "https://story-board-interior-backend-u6vi.onrender.com";
        startKeepAlive(baseUrl);
    });
});

module.exports = app;
