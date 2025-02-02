import User from "../models/userModel";
import bcryptjs from "bcryptjs";
import sendEmail from "../config/sendEmail.js";

import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fulfill all details",
        error: true,
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        message: "Email already exist",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(15);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new User(payload);
    const save = await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Email Verification from Faith & Fast",
      html: verifyEmailTemplate({
        name,
        url: VerifyEmailUrl,
      }),
    });

    return res.json({
      message: "User register successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
