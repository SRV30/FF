import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUserDetails,
  updateUserRole,
  updateUserStatus,
  uploadAvatar,
  verifyEmailOtp,
  verifyOtp,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import admin from "../middleware/Admin.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/verify-email", verifyEmailOtp);

userRouter.post("/resend-otp", verifyEmailOtp);

userRouter.post("/login", loginUser);

userRouter.get("/logout", logoutUser);

userRouter.put("/upload-avatar", upload.single("avatar"), uploadAvatar);

userRouter.put("/forgot-password", forgotPassword);

userRouter.put("/verify-otp", verifyOtp);

userRouter.put("/reset-password", resetPassword);

userRouter.get("/me", getUserDetails);

userRouter.put(
  "/update-user",

  upload.single("avatar"),
  updateUserDetails
);

userRouter.get("/admin/get", getAllUsers);

userRouter.get("/admin/get/:id", getSingleUser);

userRouter.put("/admin/update", updateUserRole);

userRouter.delete("/admin/delete/:id", deleteUser);

userRouter.patch("/admin/:id/status", updateUserStatus);

export default userRouter;
