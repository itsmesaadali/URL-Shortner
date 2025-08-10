import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/helper.js";

export const verifyJWT = asyncHandler( async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '')

        if(!token) return next

        const userId = verifyToken(token)
        const user = await User.findById(userId).select('-password -refreshToken')

        if(!user) {
            throw new ApiError(401, 'Invalid Access Token')
        }

        req.user = user;
        next()
        
    } catch (error) {
        throw new ApiError(401, error?.message || 'Invalid Access Token')
    }
})

export const optionalVerifyJWT = async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return next(); // No token — allow request to continue as anonymous

        const userId = verifyToken(token); // returns _id
        const user = await User.findById(userId).select('-password -refreshToken');
        if (user) req.user = user;
    } catch {
        // Ignore errors here — request just won't have req.user
    }
    next();
};