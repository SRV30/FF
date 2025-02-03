import express from "express";
import {
  deleteUser,
  forgotPassword,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  resetPassword,
  updateUserDetails,
  uploadAvatar,
  verifyEmailController,
  verifyOtp,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginUser);
userRouter.get("/logout", auth, logoutUser);
userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);
userRouter.delete("/delete-user/:id", auth, deleteUser);
userRouter.put(
  "/update-user",
  auth,
  upload.single("avatar"),
  updateUserDetails
);
userRouter.put("/forgot-password", forgotPassword);
userRouter.put("/verify-otp", verifyOtp);
userRouter.put("/reset-password", resetPassword);
userRouter.put("/refresh-token", refreshToken);

export default userRouter;
