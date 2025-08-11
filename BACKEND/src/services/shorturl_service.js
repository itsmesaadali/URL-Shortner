import { generateNanoId } from "../utils/helper.js";
import { ApiError } from "../utils/ApiError.js";
import { ShortUrl } from "../models/shorturl.model.js";

export const createShortUrlWithoutUser = async(url) => {
    const shortUrl = generateNanoId(7)
    if(!shortUrl) {
        throw new ApiError(400, 'Short Url not generated')
    }

    await ShortUrl.create({
        full_url:url,
        short_url:shortUrl
    })

    return shortUrl
}

export const createShortUrlWithUser = async (url, userId, slug = null) => {
  const shortUrl = slug || generateNanoId(7);
  if (!shortUrl) {
    throw new ApiError(400, "Short URL not generated");
  }

  await ShortUrl.create({
    full_url: url,
    short_url: shortUrl,
    user: userId,
  });

  return shortUrl;
};
