import express from 'express'
import cors from 'cors'
import shortUrlRoute from './routes/shorturl.route.js'
import authRoutes from './routes/auth.route.js'
import { redirectShortUrl } from './controllers/shorturl.controller.js'

const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1', shortUrlRoute)
app.use('/api/v1/auth', authRoutes)

app.get('/:id',redirectShortUrl)





export {app}