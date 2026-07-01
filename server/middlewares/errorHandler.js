const ApiResponse = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Prisma known request errors
  if (err.code === 'P2002') {
    const target = err.meta?.target;
    let field = 'field';
    if (Array.isArray(target) && target.length > 0) {
      field = target[0];
    } else if (typeof target === 'string') {
      field = target;
    }
    return ApiResponse.error(res, `A record with this ${field} already exists.`, 409);
  }

  if (err.code === 'P2025') {
    return ApiResponse.error(res, 'Record not found.', 404);
  }

  if (err.code === 'P2003') {
    return ApiResponse.error(res, 'Related record not found. Foreign key constraint failed.', 400);
  }

  if (err.code === 'P2014') {
    return ApiResponse.error(res, 'The change you are trying to make would violate a required relation.', 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return ApiResponse.error(res, 'Invalid token.', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return ApiResponse.error(res, 'Token has expired.', 401);
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return ApiResponse.error(res, err.message, 400);
  }

  // Syntax errors (malformed JSON)
  if (err.type === 'entity.parse.failed') {
    return ApiResponse.error(res, 'Invalid JSON in request body.', 400);
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return ApiResponse.error(
    res,
    process.env.NODE_ENV === 'development' ? message : 'Internal Server Error',
    statusCode
  );
};

module.exports = errorHandler;
