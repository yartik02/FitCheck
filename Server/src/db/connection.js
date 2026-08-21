import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const URI = process.env.MONGODB_URI;
        
        if (!URI) {
            throw new Error("MONGODB_URI is not defined in the .env file.");
        }
        await mongoose.connect(URI);
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Database connection failed!", error.message);
        process.exit(1);
    }
}

export { connectDB };