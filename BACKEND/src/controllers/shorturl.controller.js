import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ShortUrl } from "../models/shorturl.model.js";
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/shorturl_service.js";

const createShortUrl = asyncHandler(async (req, res) => {
    const { url } = req.body;

    const userId = req.user ? req.user._id : null

    if (!url) {
        throw new ApiError(400, 'URL is required');
    }

    const shortUrl = userId
    
    ? await createShortUrlWithUser(url, userId)
    : await createShortUrlWithoutUser(url)

    res.status(201).json(
        new ApiResponse(201, { short_url: process.env.APP_URL+ shortUrl }, 'Short URL created successfully')
    );
});

const redirectShortUrl = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, 'Short URL ID is required');
    }

    const url = await ShortUrl.findOneAndUpdate(
        { short_url: id },
        { $inc: { clicks: 1 } },
        { new: true }
    );

    if (!url) {
        throw new ApiError(404, 'Not Found' )
    }

    res.redirect(301, url.full_url);
});

const createCustomShortUrl = asyncHandler(async(req,res) => {
    const {url, slug} = req.body

    const userId = req.user ? req.user._id : null;

    if(!userId) {
        throw new ApiError(403, 'you must be logged in to create a custom URL')
    }

    if (!url) {
        throw new ApiError(400, 'URL is required')
    }

    if(!slug) {
        throw new ApiError(400, 'Custom slug is required')
    }

    const existing = await ShortUrl.findOne({short_url:slug})

    if (existing) {
        throw new ApiError(400, 'This custom slug is already taken')
    }

    const shortUrl = await createShortUrlWithUser(url, userId, slug)

    res.status(201).json(
        new ApiResponse(
            201,
            { short_url: process.env.APP_URL + shortUrl },
            "Custom short URL created successfully"
        )
    );
})


export { createShortUrl, redirectShortUrl, createCustomShortUrl };
