export class AppError extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

export const errorHandler = (err, req, res, next) => {
    console.error("Error Occured", err)

    const { message = "Internal Server Error", status = 500 } = err

    res.status(status).json({
        message
    })
}