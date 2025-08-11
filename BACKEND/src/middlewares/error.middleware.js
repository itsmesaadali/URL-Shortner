import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
  

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      data: err.data || null,
      message: err.message,
      success: err.success,
      errors: err.errors || []
    });
  }

  // Fallback for unexpected errors
  return res.status(500).json({
    statusCode: 500,
    data: null,
    message: err.message || "Internal Server Error",
    success: false,
    errors: []
  });
};
