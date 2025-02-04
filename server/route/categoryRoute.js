import express from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/Admin.js";
import upload from "../middleware/multer.js";
import { AddCategory, deleteCategory, getCategory, updateCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post(
  "/create",
  auth,
  admin,
  upload.single("image"),
  AddCategory
);

categoryRouter.get('/get',getCategory)

categoryRouter.put('/update',auth, admin,updateCategory)

categoryRouter.delete("/delete",auth, admin,deleteCategory)

export default categoryRouter;
