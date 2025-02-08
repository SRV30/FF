import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: [true, "Please Enter Your Password"] },
    avatar: { type: String, default: "" },
    mobile: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: "",
    },
    verifyEmail: {
      type: Boolean,
      default: false,
    },
    login_otp: {
      type: String,
      default: null,
    },
    login_expiry: {
      type: Date,
      default: null,
    },
    failedAttempts: { type: Number, default: 0 },
    lastLogin: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["Active", "Warning", "Suspended"],
      default: "Active",
    },
    addressDetails: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Address",
      },
    ],
    shoppingCart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "cartProduct",
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
      },
    ],
    forgot_password_otp: {
      type: String,
      default: null,
    },
    forgot_password_expiry: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
