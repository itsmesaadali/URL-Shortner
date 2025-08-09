import express from 'express'
import shortUrlRoute from './routes/shorturl.route.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1', shortUrlRoute)





export {app}