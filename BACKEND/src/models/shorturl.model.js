import mongoose from 'mongoose'

const shorturlSchema = new mongoose.Schema(
    {
        full_url:{
            type:String,
            required:true
        },
        short_url:{
            type:String,
            required:true
        },
        clicks:{
            type:Number,
            required:true,
            default:0
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    },{timeseries:true}
)

export const ShortUrl = mongoose.model('ShortUrl', shorturlSchema)