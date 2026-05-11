/**
 * Async handler wrapper for Express 5.
 * Express 5 route handlers only receive (req, res) — no `next`.
 * This wrapper catches any thrown errors and sends a 500 JSON response.
 */
const asyncHandler = (fn) => (req, res) => {
  Promise.resolve(fn(req, res)).catch((error) => {
    console.error('❌ Unhandled route error:', error.message);

    // Mongoose duplicate key
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0] || 'field';
      return res.status(400).json({
        success: false,
        message: `Duplicate value for '${field}'. This ${field} is already registered.`,
      });
    }

    // Mongoose validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join('. '),
      });
    }

    // Default
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  });
};

module.exports = asyncHandler;
