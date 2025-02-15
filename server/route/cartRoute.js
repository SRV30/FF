import express from "express";
import auth from "../middleware/auth.js";
import {
  addToCartItemController,
  deleteCartItemQtyController,
  getCartItemController,
  updateCartItemQtyController,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/create", addToCartItemController);

cartRouter.get("/get", getCartItemController);

cartRouter.put("/update", updateCartItemQtyController);

cartRouter.delete("/delete", deleteCartItemQtyController);

export default cartRouter;
