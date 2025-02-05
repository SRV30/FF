import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductByCategory,
  getProductDetails,
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

productRouter.get("/get/category/:id", getProductByCategory);

productRouter.get("/get/:productId", getProductDetails);

productRouter.put(
  "/update",
  auth,
  upload.array("images", 5),
  updateProductDetails
);

productRouter.delete("/delete", auth, admin, deleteProduct);

productRouter.post("/search", searchProduct)

export default productRouter;
