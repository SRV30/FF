import express from "express";
import crypto from "crypto";
import OrderModel from "../models/orderModel.js";

const webhookRouter = express.Router();

webhookRouter.post("/razorpay-webhook", async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = req.headers["x-razorpay-signature"];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid webhook signature" });
  }

  const { event, payload } = req.body;

  if (event === "payment.captured") {
    const paymentId = payload.payment.entity.id;
    const orderId = payload.payment.entity.order_id;

    await OrderModel.findOneAndUpdate(
      { transactionId: orderId },
      { paymentStatus: "COMPLETED", transactionId: paymentId }
    );
  }

  res.status(200).json({ success: true });
});

export default webhookRouter;
