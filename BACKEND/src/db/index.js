import mongoose from 'mongoose'


const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log(`\n MongoDb connected !! DB Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error('MongoDb not connect =>', error)
        process.exit(1)
    }
}

export default connectDB