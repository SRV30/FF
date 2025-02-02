import express from "express";
import { registerUser, verifyEmailController } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify-email", verifyEmailController);

export default userRouter;
