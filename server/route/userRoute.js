import express from "express";
import {
  deleteUser,
  loginUser,
  logoutUser,
  registerUser,
  uploadAvatar,
  verifyEmailController,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginUser);
userRouter.get("/logout", auth, logoutUser);
userRouter.put("/upload-avatar", auth, upload.single("avatar"),uploadAvatar);
userRouter.delete("/delete-user/:id", auth, deleteUser);

export default userRouter;
