import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ShortUrl } from "../models/shorturl.model.js";
import { generateNanoId } from "../utils/helper.js";

const createShortUrl = asyncHandler(async (req, res) => {
    const { url } = req.body;

    if (!url) {
        throw new ApiError(400, 'URL is required');
    }

    const shortUrl = generateNanoId(7);

    await ShortUrl.create({
        full_url: url,
        short_url: shortUrl
    });

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


export { createShortUrl, redirectShortUrl };
