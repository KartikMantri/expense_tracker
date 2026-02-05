// ERROR HANDLING MIDDLEWARE
// This middleware catches all errors from any route and formats them consistently

const errorHandler = (err, req, res, next) => {
    // Log the error for debugging
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);

    // Determine status code
    // If the error already has a statusCode, use it. Otherwise, use 500 (Server Error)
    const statusCode = err.statusCode || 500;

    // Send error response
    res.status(statusCode).json({
        success: false,
        error: err.message || 'Server Error',
        // Only show stack trace in development mode
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
