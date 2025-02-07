import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generatedRefreshToken = async (user) => {
  const refreshToken = await jwt.sign(
    { id: user },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );

  await UserModel.findByIdAndUpdate(user, { refreshToken });

  return refreshToken;
};

export default generatedRefreshToken;
