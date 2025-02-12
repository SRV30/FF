import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ProductModel from "../models/productModel.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";

// Admin
export const createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, category, stock, price, discount, description } = req.body;

    if (!name || !category || !price || !description) {
      return res.status(400).json({
        message:
          "Please enter all required fields (name, category, price, description)",
        error: true,
        success: false,
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Please upload at least one image.",
        error: true,
        success: false,
      });
    }

    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadImage(file);
        return {
          public_id: result.public_id,
          url: result.secure_url,
        };
      })
    );

    const product = new ProductModel({
      name,
      description,
      price,
      category,
      stock: stock || 0,
      discount: discount || 0,
      images: uploadedImages,
      user: req.user.id,
    });

    const savedProduct = await product.save();

    return res.status(201).json({
      message: "Product Created Successfully",
      data: savedProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
});

export const getProduct = catchAsyncErrors(async (req, res) => {
  try {
    let { page, limit, search } = req.query;

    page = page ? parseInt(page, 10) : 1;
    limit = limit ? parseInt(limit, 10) : 10;

    const query = search ? { $text: { $search: search } } : {};

    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category"),
      ProductModel.countDocuments(query),
    ]);

    return res.json({
      message: "Product data",
      error: false,
      success: true,
      totalCount,
      totalNoPage: Math.ceil(totalCount / limit),
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

// export const getProductByCategory = catchAsyncErrors(async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({
//         message: "Provide category id",
//         error: true,
//         success: false,
//       });
//     }

//     const products = await ProductModel.find({ category: id }).limit(15);

//     return res.json({
//       message: "Category product list",
//       data: products,
//       error: false,
//       success: true,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// });

export const getProductDetails = catchAsyncErrors(async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        error: true,
        success: false,
      });
    }

    const product = await ProductModel.findById(productId).populate("category");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "Product details",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

// Admin
export const updateProductDetails = catchAsyncErrors(async (req, res) => {
  try {
    const { images } = req.body;
    const { _id } = req.params;

    if (!_id) {
      return res.status(400).json({
        message: "Provide product _id",
        error: true,
        success: false,
      });
    }

    const existingProduct = await ProductModel.findById(_id);
    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    let newImages = existingProduct.images; // Start with existing images if no new ones are uploaded.

    if (images && images.length > 0) {
      // Delete old images from cloud (if any)
      if (existingProduct.images.length > 0) {
        await Promise.all(
          existingProduct.images.map((img) => deleteImage(img.public_id))
        );
      }

      // Upload new images
      newImages = await Promise.all(
        images.map(async (file) => {
          const result = await uploadImage(file);
          return { public_id: result.public_id, url: result.secure_url };
        })
      );
    }

    const updateData = {
      ...req.body,
      images: newImages, // Only update the images field
      _id: undefined,
      createdAt: undefined,
    };

    // Update product details
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      _id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.json({
      message: "Product updated successfully",
      data: updatedProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

// Admin
export const deleteProduct = catchAsyncErrors(async (req, res) => {
  try {
    const { deleteId } = req.params;

    if (!deleteId) {
      return res.status(400).json({
        message: "provide deleteId ",
        error: true,
        success: false,
      });
    }

    const product = await ProductModel.findByIdAndDelete(deleteId, {
      returnDocument: "before",
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
        error: true,
        success: false,
      });
    }

    if (product.images && product.images.length > 0) {
      await Promise.all(
        product.images.map((img) => deleteImage(img.public_id))
      );
    }

    return res.json({
      message: "Product deleted successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

export const searchProduct = catchAsyncErrors(async (req, res) => {
  try {
    let { search = "", page = 1, limit = 10 } = req.query;

    page = Math.max(1, parseInt(page));
    limit = Math.max(1, parseInt(limit));

    const skip = (page - 1) * limit;
    const query = search ? { $text: { $search: search } } : {};

    const [data, dataCount] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category"),
      ProductModel.countDocuments(query),
    ]);

    return res.json({
      message: "Product data fetched successfully.",
      error: false,
      success: true,
      data: data,
      totalCount: dataCount,
      totalPage: Math.ceil(dataCount / limit),
      page: page,
      limit: limit,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

export const getProductByFilter = catchAsyncErrors(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      category = "",
      sortBy = "relevant",
      minPrice = 0,
      maxPrice = 100000,
    } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    query.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };

    let sortQuery = {};
    if (sortBy === "price-low-high") {
      sortQuery.price = 1;
    } else if (sortBy === "price-high-low") {
      sortQuery.price = -1;
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const products = await ProductModel.find(query)
      .sort(sortQuery)
      .limit(limitNumber)
      .skip((pageNumber - 1) * limitNumber)
      .exec();

    const count = await ProductModel.countDocuments(query);

    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

export const getProductsByCategory = catchAsyncErrors(async (req, res) => {
  try {
    const { category } = req.params;

    const validCategory = ["MEN", "WOMEN", "KIDS"];
    if (!validCategory.includes(category.toUpperCase())) {
      return next(new ErrorHandler("Invalid category specified", 400));
    }

    const products = await ProductModel.find({
      category: category.toUpperCase(),
      publish: true,
    })
      .populate("category", "name")
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      products,
      count: products.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

export const getProductReviews = catchAsyncErrors(async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await ProductModel.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json({ reviews: product.reviews });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

export const postProductReview = catchAsyncErrors(async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment, name } = req.body;

    const product = await ProductModel.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const review = {
      user: req.user._id,
      name,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;

    product.ratings =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review posted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

export const deleteProductReview = catchAsyncErrors(async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const product = await ProductModel.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const reviewIndex = product.reviews.findIndex(
      (review) => review._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    product.reviews.splice(reviewIndex, 1);
    product.numOfReviews = product.reviews.length;

    if (product.reviews.length > 0) {
      product.ratings =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length;
    } else {
      product.ratings = 0;
    }

    await product.save();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});
