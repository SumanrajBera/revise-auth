import { appConfig } from "../config/appConfig.js";
import { userModel } from "../model/user.model.js";
import { loginService, registerService } from "../services/auth.service.js";

export const registerController = async (req, res, next) => {
    try {
        await registerService(req.body)
        return res.status(201).json({
            message: "User registered successfully"
        })
    } catch (err) {
        next(err)
    }
}

export const loginController = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = await loginService(req.body)

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: appConfig.NODE_ENV === "production",
            sameSite: appConfig.NODE_ENV === "production" ? "strict": "lax",
            maxAge: 5 * 60 * 1000
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: appConfig.NODE_ENV === "production",
            sameSite: appConfig.NODE_ENV === "production" ? "strict": "lax",
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "Log in successful"
        })
    } catch (err) {
        next(err)
    }
}