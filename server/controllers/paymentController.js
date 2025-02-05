import { razorpayInstance } from "../config/razorpayInstance.js";
import crypto from "crypto";
import OrderModel from "../models/orderModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

export const createOrder = catchAsyncErrors(async (req, res) => {
  try {
    const { totalAmount, orderId } = req.body;

    if (!totalAmount || !orderId) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    const newOrder = await OrderModel.create({
      user: userId,
      address,
      products,
      totalAmount,
      paymentStatus: "PENDING",
      paymentMethod: "ONLINE",
      orderStatus: "PENDING",
    });

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `order_${newOrder._id}`,
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    newOrder.transactionId = razorpayOrder.id;
    await newOrder.save();

    res.status(200).json({
      success: true,
      order: razorpayOrder,
      orderId: newOrder._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Razorpay error", error });
  }
});

export const verifyPayment = catchAsyncErrors(async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(razorpay_signature)
    );

    if (!isSignatureValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    await OrderModel.findByIdAndUpdate(orderId, {
      paymentStatus: "COMPLETED",
      transactionId: razorpay_payment_id,
    });

    res.status(200).json({ success: true, message: "Payment verified" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Verification failed", error });
  }
});
