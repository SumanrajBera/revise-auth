import { Router } from "express";
import { userModel } from "../model/user.model.js";

export const authRouter = Router()

authRouter.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body

        const userExists = await userModel.findOne({
            $or: [
                { username }, { email }
            ]
        })

        if (userExists) {
            return res.status(409).json({
                message: "User with such email or username already exists"
            })
        }

        await userModel.create({ username, email, password });

        return res.status(201).json({
            message: "User registered successfully"
        })
    } catch (err) {
        console.error("Error occurred", err)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { identifier, password } = req.body

        if (!identifier || !password) {
            return res.status(400).json({
                message: "Identifier and password are required"
            });
        }

        const userInfo = await userModel.findOne({
            $or: [
                { username: identifier }, { email: identifier }
            ]
        }).select("+password")

        if (!userInfo) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        const isValid = await userInfo.comparePassword(password);

        if (!isValid) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        return res.status(200).json({
            message: "Log in successful"
        })
    } catch (err) {
        console.error("Error occurred", err)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})