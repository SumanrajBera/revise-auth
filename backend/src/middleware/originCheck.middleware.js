import { appConfig } from "../config/appConfig";
import { AppError } from "../error/appError";

// 
export const verifyOrigin = (req, res, next) => {
    const { origin } = req.headers;
    if (appConfig.NODE_ENV !== "production") return next()
    if (!origin || !appConfig.ALLOWED_ORIGINS.includes(origin)) {
        throw new AppError("Request from this origin is not allowed", 403);
    }
    next()
}