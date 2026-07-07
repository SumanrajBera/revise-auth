import { Router } from "express";
import { loginController, registerController } from "../controller/auth.controller.js";

export const authRouter = Router()

authRouter.post("/register", registerController)

authRouter.post("/login", loginController)

authRouter.get("/refresh-token", refreshTokenController)