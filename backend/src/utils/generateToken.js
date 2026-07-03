import jwt from 'jsonwebtoken'

export const generateAccessToken = function (userInfo) {
    const { _id } = userInfo;

    const token = jwt.sign({
        userId: _id
    }, appConfig.JWT_SECRET, {
        expiresIn: "5m"
    });

    return token
}

export const generateRefreshToken = function (userInfo) {
    const { _id } = userInfo;

    const token = jwt.sign({
        userId: _id
    }, appConfig.JWT_SECRET, {
        expiresIn: "1d"
    });

    return token
}

