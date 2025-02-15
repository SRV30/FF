import express from "express";
import auth from "../middleware/auth.js";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/razorpay/order", createOrder);
paymentRouter.post("/razorpay/verify", verifyPayment);

export default paymentRouter;
