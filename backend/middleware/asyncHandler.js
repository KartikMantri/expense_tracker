// ASYNC HANDLER WRAPPER
// This wrapper function eliminates the need for try-catch blocks in async routes
// It automatically catches any errors and passes them to the error handling middleware

const asyncHandler = (fn) => (req, res, next) => {
    // Execute the async function and catch any errors
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
