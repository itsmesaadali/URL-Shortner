import { nanoid } from "nanoid"
import jwt from 'jsonwebtoken'


export const generateNanoId = (length) => {
    return nanoid(length)
}

export const options = {
    httpOnly: true,
    secure:true,
    sameSite:'None',
    maxAge: 1000 * 60 * 5    
}

export const verifyToken = (token) => {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    return decodedToken?._id
}