import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import Product from "../models/productModel.js"; // Assuming you have a Product model

// Controller to upload image to Cloudinary
const uploadImageController = async (req, res) => {
    try {
        const file = req.file; // Assuming you're using multer for file uploads

        // Upload the image to Cloudinary
        const uploadResult = await uploadImage(file);

        // Respond with the image details after upload
        return res.json({
            message: "Image uploaded successfully",
            data: uploadResult,
            success: true,
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Image upload failed",
            error: true,
            success: false,
        });
    }
};

// Controller to delete image from Cloudinary
const deleteImageController = async (req, res) => {
    try {
        const { public_id } = req.body; // public_id should be sent in the request body

        if (!public_id) {
            return res.status(400).json({
                message: "public_id is required",
                error: true,
                success: false,
            });
        }

        // Delete the image from Cloudinary using the public_id
        const result = await deleteImage(public_id);

        if (result.result !== "ok") {
            return res.status(500).json({
                message: "Failed to delete image from Cloudinary",
                error: true,
                success: false,
            });
        }

        return res.json({
            message: "Image deleted successfully",
            success: true,
            error: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Image deletion failed",
            error: true,
            success: false,
        });
    }
};

// Controller to delete a product and its associated images from Cloudinary
// const deleteProductAndImagesController = async (req, res) => {
//     try {
//         const productId = req.params.id;

//         // Find the product
//         const product = await Product.findById(productId);

//         if (!product) {
//             return res.status(404).json({
//                 message: "Product not found",
//                 error: true,
//                 success: false,
//             });
//         }

//         for (const image of product.images) {
//             await deleteImage(image.public_id);
//         }

//         // Optionally, delete the product from the database as well
//         await Product.findByIdAndDelete(productId);

//         return res.json({
//             message: "Product and images deleted successfully",
//             success: true,
//             error: false,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message || "Something went wrong",
//             error: true,
//             success: false,
//         });
//     }
// };

export { uploadImageController, deleteImageController };
