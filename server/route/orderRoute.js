import express from "express";
import auth from "../middleware/auth.js";
import {
  cancelOrder,
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import admin from "../middleware/Admin.js";

const orderRouter = express.Router();

orderRouter.post("/create", createOrder);

orderRouter.get("/myorder", myOrders);

orderRouter.get("/get/admin", getAllOrders);

orderRouter.get("/get/:orderId", getSingleOrder);

orderRouter.put("/admin/update/:orderId", updateOrderStatus);

orderRouter.put("/cancel/:orderId", cancelOrder);

orderRouter.delete("/admin/delete/:orderId", deleteOrder);

export default orderRouter;
