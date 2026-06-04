import mongoose from "mongoose";
import dotenv from "dotenv";   
dotenv.config()

const dburl = process.env.MONGO_URI ;

export const connectDb = async () => {
    try {
        await mongoose.connect(dburl)
        console.log("Connected to MongoDB successfully");
    }
    catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}