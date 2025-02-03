import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generatedRefreshToken = async (userId) => {
  const refreshToken = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );

  await UserModel.findByIdAndUpdate(userId, { refreshToken });

  return refreshToken;
};

export default generatedRefreshToken;
