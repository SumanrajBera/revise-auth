import { AppError } from "../error/appError"
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken"

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