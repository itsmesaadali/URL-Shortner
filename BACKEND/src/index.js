import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        app.on('error', (error) => {
            console.log('Server in not running => ', error)
        })

        app.listen(process.env.PORT, () => {
            console.log(`server is running => ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log('MongoDb connection failid', error)
    })

