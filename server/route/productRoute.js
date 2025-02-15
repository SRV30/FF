import express from "express";
import {
  createProduct,
  deleteProduct,
  deleteProductReview,
  getProduct,
  getProductByFilter,
  getProductDetails,
  getProductReviews,
  getProductsByCategory,
  postProductReview,
  searchProduct,
  updateProductDetails,
} from "../controllers/productController.js";
import admin from "../middleware/Admin.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post("/new", upload.array("images", 5), createProduct);

productRouter.get("/get", getProduct);

productRouter.get("/get/filter", getProductByFilter);

// productRouter.get("/get/category/:id", getProductByCategory);

productRouter.get("/get/:productId", getProductDetails);

productRouter.put(
  "/update/:_id",
  upload.array("images", 5),
  updateProductDetails
);

productRouter.delete("/delete/:deleteId", deleteProduct);

productRouter.post("/search", searchProduct);

productRouter.get("/category/:category", getProductsByCategory);

productRouter.get("/reviews/:productId", getProductReviews);

productRouter.post("/review/:productId", postProductReview);

productRouter.delete(
  "/review/:productId/:reviewId",
  deleteProductReview
);

export default productRouter;
