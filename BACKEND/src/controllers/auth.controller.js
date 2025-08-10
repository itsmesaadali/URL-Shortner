import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { generateAccessAndRefreshTokens } from "../utils/jwtToken.js";
import { options } from "../utils/helper.js";


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if ([email, name, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, 'All fields are required');
    }

    // Check if user already exists
    const existedUser = await User.findOne({email});

    if(existedUser) {
        throw new ApiError(409, 'User with email already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const {accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const createdUser = await User.findById(user._id).select('-password -refreshToken')

    if(!createdUser) {
        throw new ApiError(500, 'Falied to register user')
    }

    return res
    .status(201)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
        new ApiResponse(201,{
            user:createdUser,
            accessToken,
            refreshToken,
            
        },'User registered successfully')
    )
})


const loginUser = asyncHandler(async (req, res) => {

    const {email, password } = req.body;

    if(!email && !password) {
        throw new ApiError(400, 'email or password is required')
    }

    const user = await User.findOne({email})

    if(!user) {
        throw new ApiError(400, 'user does not exist')
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid) {
        throw new ApiError(401, 'Invalid user credentials')
    }

    const {accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken')

    return res
    .status(201)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
        new ApiResponse(201,{
            user:loggedInUser,
            accessToken,
            refreshToken,
            
        },'User logged in successfully')
    )
})
export { registerUser, loginUser }