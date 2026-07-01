import dotenv from "dotenv";
dotenv.config()

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI not available in environment variables")
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not available in environment variables")
}

export const appConfig = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
}