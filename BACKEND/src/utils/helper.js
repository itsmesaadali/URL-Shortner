import { nanoid } from "nanoid"

export const generateNanoId = (length) => {
    return nanoid(length)
}

export const options = {
    httpOnly: true,
    secure:true,
    sameSite:'None'
}