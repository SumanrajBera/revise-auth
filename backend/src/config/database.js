import mongoose from "mongoose";
import { appConfig } from "./appConfig";

export const connectToDB = async () => {
    try {
        await mongoose.connect(appConfig.MONGO_URI);
        console.log("Connected To DB")
    } catch (err) {
        console.log("DB ConnectionError", err)
        throw new Error("Error while connecting to DB")
    }
}