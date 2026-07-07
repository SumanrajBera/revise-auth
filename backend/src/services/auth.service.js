import { appConfig } from "../config/appConfig.js"
import { AppError } from "../error/appError.js"
import { userModel } from "../model/user.model.js"
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js"
import jwt from 'jsonwebtoken'

export const registerService = async (data) => {
    const { username, email, password } = data

    if (!username || !email || !password) throw new AppError("All fields are required", 400)

    const userExists = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })

    if (userExists) {
        throw new AppError("User with such email or username already exists", 409)
    }

    await userModel.create({ username, email, password });
}

export const loginService = async (data) => {
    const { identifier, password } = data

    if (!identifier || !password) {
        throw new AppError("Identifier and password are required", 400)
    }

    const userInfo = await userModel.findOne({
        $or: [
            { username: identifier }, { email: identifier }
        ]
    }).select("+password")

    if (!userInfo) throw new AppError("Invalid Credentials", 401)

    const isValid = await userInfo.comparePassword(password);

    if (!isValid) throw new AppError("Invalid Credentials", 401)

    const accessToken = generateAccessToken(userInfo);
    const refreshToken = generateRefreshToken(userInfo);

    return {
        accessToken, refreshToken
    }
}

export const refreshTokenService = async (data) => {
    const token = data;

    if (!token) throw new AppError("Please! Log in.", 409)

    const decoded = jwt.verify(token, appConfig.JWT_SECRET);

    if (!decoded) throw new AppError("Please! Log in.", 409)

    const accessToken = generateAccessToken(decoded.userId)
    
    return accessToken
}