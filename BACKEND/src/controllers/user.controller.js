import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ShortUrl } from "../models/shorturl.model.js";

/**
 * @desc Register a new user
 * @route POST /api/v1/auth/allUrls
 * @access Public
 */
export const getAllUserUrls = asyncHandler(async(req, res) => {
  const userId = req.user?._id;  
  if (!userId) {
    throw new ApiError(403, "You must be logged in to view your URLs");
  }

  const urls = await ShortUrl.find({ user: userId }); // Pass query object

  res.status(200).json(
    new ApiResponse(
      200,
      {urls, count:urls.length}, 
      "User URLs fetched successfully"
    )
  );
});