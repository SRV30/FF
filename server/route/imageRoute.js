import express from "express";

const router = express.Router();
import upload from "../middleware/multer";
import { deleteImageController, uploadImageController } from "../controllers/ImageController";


router.post("/upload", upload.single("image"), uploadImageController);

// Route to delete image from Cloudinary
router.delete("/delete", deleteImageController);

// Route to delete product and its images from Cloudinary
// router.delete("/product/:id", deleteProductAndImagesController);

export default router;