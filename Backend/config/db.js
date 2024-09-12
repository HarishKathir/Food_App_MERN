import mongoose from "mongoose"
import {} from 'dotenv/config'

export const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_ATLAS_URL).then(() => console.log("Database Connected"))
}