import express from "express";
import auth from "../middleware/auth.js";
import {
  addToWishListItemController,
  deleteWishListItemQtyController,
  getWishListItemController,
  updateWishListItemQtyController,
} from "../controllers/wishListController.js";

const wishListRouter = express.Router();

wishListRouter.post("/create", addToWishListItemController);

wishListRouter.get("/get", getWishListItemController);

wishListRouter.put("/update", updateWishListItemQtyController);

wishListRouter.delete("/delete", deleteWishListItemQtyController);

export default wishListRouter;
