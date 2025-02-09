import express from "express";
import {
  createProduct,
  deleteProduct,
  deleteProductReview,
  getProduct,
  getProductByCategory,
  getProductByFilter,
  getProductDetails,
  getProductReviews,
  getProductsByGender,
  postProductReview,
  searchProduct,
  updateProductDetails,
} from "../controllers/productController.js";
import { admin } from "../middleware/Admin.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/create",
  auth,
  admin,
  upload.array("images", 5),
  createProduct
);

productRouter.get("/get", getProduct);

productRouter.get("/get/filter", getProductByFilter);

productRouter.get("/get/category/:id", getProductByCategory);

productRouter.get("/get/:productId", getProductDetails);

productRouter.put(
  "/update",
  auth,
  upload.array("images", 5),
  updateProductDetails
);

productRouter.delete("/delete", auth, admin, deleteProduct);

productRouter.post("/search", searchProduct);

productRouter.get("/gender/:gender", getProductsByGender)

productRouter.get("/reviews/:productId", getProductReviews)

productRouter.post("/review/:productId", auth, postProductReview)

productRouter.delete("/review/:productId/:reviewId", auth, admin, deleteProductReview)

export default productRouter;
