import express from "express";

const router = express.Router();
import upload from "../middleware/multer";
import { deleteImageController, uploadImageController } from "../controllers/ImageController";


router.post("/upload", upload.single("image"), uploadImageController);

router.delete("/delete", deleteImageController);


export default router;