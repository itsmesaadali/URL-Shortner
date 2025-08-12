import { nanoid } from "nanoid"
import jwt from 'jsonwebtoken'


export const generateNanoId = (length) => {
    return nanoid(length)
}

export const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'none',
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};



export const verifyToken = (token) => {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    return decodedToken?._id
}