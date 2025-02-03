import cloudinary from "cloudinary";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        let images = [];

        // Handle single image case
        if (!req.body.images) {
            return next(new ErrorHandler("No images provided", 400));
        }

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            try {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "ff",
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            } catch (error) {
                return next(new ErrorHandler(`Image upload failed: ${error.message}`, 500));
            }
        }

        req.body.images = imagesLinks;
        req.body.user = req.user?.id || null;

        if (!req.body.user) {
            return next(new ErrorHandler("User authentication required", 401));
        }

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});
