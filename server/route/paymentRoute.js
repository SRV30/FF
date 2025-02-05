import express from "express";
import auth from "../middleware/auth.js";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/razorpay/order", auth, createOrder);
paymentRouter.post("/razorpay/verify", auth, verifyPayment);

export default paymentRouter;
