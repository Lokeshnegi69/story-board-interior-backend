const logger = require('../config/logger');

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal server error';
    let isOperational = false;

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        isOperational = err.isOperational;
    }

    logger.error({
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        statusCode,
    });

    if (process.env.NODE_ENV === 'development') {
        res.status(statusCode).json({
            success: false,
            error: message,
            stack: err.stack,
            details: err,
        });
    } else {
        res.status(statusCode).json({
            success: false,
            error: isOperational ? message : err.message || 'Something went wrong',
            stack: err.stack,
            details: err,
        });
    }
};

const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        error: `Route ${req.originalUrl} not found`,
    });
};

const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = {
    AppError,
    errorHandler,
    notFoundHandler,
    asyncHandler,
};
