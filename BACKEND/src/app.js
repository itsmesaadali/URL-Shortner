import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import shortUrlRoute from './routes/shorturl.route.js'
import authRoutes from './routes/auth.route.js'
import urlRoutes from './routes/url.route.js'
import { redirectShortUrl } from './controllers/shorturl.controller.js'
import { errorHandler } from './middlewares/error.middleware.js'

const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use('/api/v1', shortUrlRoute)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/auth', urlRoutes)

app.get('/:id',redirectShortUrl)

app.use(errorHandler);




export {app}