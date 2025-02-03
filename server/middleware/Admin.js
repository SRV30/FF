import UserModel from "../models/userModel.js";

export const admin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        message: "User not found in request",
        error: true,
        success: false,
      });
    }

    const { role } = req.user;

    if (role !== "ADMIN") {
      return res.status(403).json({
        message: "Permission denied. Admins only.",
        error: true,
        success: false,
      });
    }

    next();
  } catch (error) {
    return response.status(500).json({
      message: "Server error while verifying admin permissions",
      error: true,
      success: false,
    });
  }
};
