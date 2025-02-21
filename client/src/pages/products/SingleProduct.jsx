import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  getProductDetails,
  getProductReviews,
  postReview,
  getSimilarProducts,
} from "@/store/product-slice/productDetails";
import ImageSlider from "./ImageSlider";
import ProductCard from "./ProductCard";
import MetaData from "../extras/MetaData";
import { Button, Rating } from "@mui/material";
import { ShoppingCartIcon } from "lucide-react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { addToCart } from "@/store/add-to-cart/addToCart";

const ProductDetails = ({ products }) => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const {
    product,
    reviews = [],
    similarProducts,
    loading,
    error,
    reviewPosting,
  } = useSelector((state) => state.productDetails);
  const { user } = useSelector((state) => state.auth);

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [randomSimilar, setRandomSimilar] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [visibleReviews, setVisibleReviews] = useState([]);

  // Animation variants for container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Fetch random reviews to display
  const getRandomReviews = useCallback(
    (count) => {
      if (!reviews || reviews.length === 0) return [];
      const shuffledReviews = [...reviews].sort(() => 0.5 - Math.random());
      return shuffledReviews.slice(0, count);
    },
    [reviews]
  );

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      setVisibleReviews(getRandomReviews(3));
    }
  }, [reviews, getRandomReviews]);

  const handleShowNext = () => {
    setVisibleReviews((prevReviews) => {
      const nextReviews = getRandomReviews(3);
      return [...prevReviews, ...nextReviews];
    });
  };

  // Fetch product details and reviews on load
  useEffect(() => {
    dispatch(getProductDetails(productId));
    dispatch(getProductReviews(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product?.category) {
      dispatch(getSimilarProducts(product.category));
    }
  }, [dispatch, product]);

  // Merge similar products from store with passed in products prop and randomize
  useEffect(() => {
    const combined = [...(similarProducts || []), ...(products || [])];
    setRandomSimilar(combined.sort(() => Math.random() - 0.5).slice(0, 6));
  }, [similarProducts, products]);

  // Set initial selections for color and size
  useEffect(() => {
    if (product) {
      if (product.coloroptions) {
        if (Array.isArray(product.coloroptions)) {
          if (
            product.coloroptions.length === 1 &&
            product.coloroptions[0].includes(",")
          ) {
            setSelectedColor(product.coloroptions[0].split(",")[0].trim());
          } else {
            setSelectedColor(product.coloroptions[0]);
          }
        } else if (typeof product.coloroptions === "string") {
          setSelectedColor(product.coloroptions.split(",")[0].trim());
        }
      }
      if (product.sizeoptions) {
        if (Array.isArray(product.sizeoptions)) {
          if (
            product.sizeoptions.length === 1 &&
            product.sizeoptions[0].includes(",")
          ) {
            setSelectedSize(product.sizeoptions[0].split(",")[0].trim());
          } else {
            setSelectedSize(product.sizeoptions[0]);
          }
        } else if (typeof product.sizeoptions === "string") {
          setSelectedSize(product.sizeoptions.split(",")[0].trim());
        }
      }
    }
  }, [product]);

  let sizeOptions = [];
  if (product?.sizeoptions) {
    if (Array.isArray(product.sizeoptions)) {
      if (product.sizeoptions.length > 0) {
        if (
          product.sizeoptions.length === 1 &&
          product.sizeoptions[0] &&
          product.sizeoptions[0].includes(",")
        ) {
          sizeOptions = product.sizeoptions[0].split(",").map((s) => s.trim());
        } else {
          sizeOptions = product.sizeoptions;
        }
      }
    } else if (typeof product.sizeoptions === "string") {
      sizeOptions = product.sizeoptions.split(",").map((s) => s.trim());
    }
  }

  let colorOptions = [];
  if (product?.coloroptions) {
    if (Array.isArray(product.coloroptions)) {
      if (product.coloroptions.length > 0) {
        if (
          product.coloroptions.length === 1 &&
          product.coloroptions[0] &&
          product.coloroptions[0].includes(",")
        ) {
          colorOptions = product.coloroptions[0]
            .split(",")
            .map((c) => c.trim());
        } else {
          colorOptions = product.coloroptions;
        }
      }
    } else if (typeof product.coloroptions === "string") {
      colorOptions = product.coloroptions.split(",").map((c) => c.trim());
    }
  }

  const handleReviewSubmit = () => {
    if (!user) {
      return toast.error("Please login to post a review");
    }
    if (!rating) {
      return toast.error("Please select a rating");
    }
    if (!reviewText) {
      return toast.error("Please enter a review");
    }
    dispatch(
      postReview({
        productId,
        reviewData: { rating, comment: reviewText, name: user.name },
      })
    );
    toast.success("Review posted successfully");
    window.location.reload();
    setReviewText("");
    setRating(0);
  };

  const handleAddCart = (item) => {
    if (!item) {
      toast.error("Error: Item not found!");
      return;
    }
    dispatch(addToCart({ productId: item._id, selectedColor, selectedSize }));
    toast.success(`"${item.name}" added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MetaData title={product?.name} description={product?.description} />
      <AnimatePresence>
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-96"
          >
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-yellow-500"></div>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8 bg-red-100 rounded-lg"
          >
            <h2 className="text-2xl text-red-600">{error}</h2>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="grid md:grid-cols-2 gap-8 mb-16 items-center"
            >
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <ImageSlider images={product?.images?.map((img) => img.url)} />
              </div>
              <div className="space-y-6">
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl font-bold text-gray-800 dark:text-white capitalize"
                >
                  {product?.name}
                </motion.h1>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-yellow-500 dark:text-red-600">
                    ₹
                    {(
                      product?.price -
                      product?.price * (product?.discount / 100)
                    ).toLocaleString()}
                  </span>
                  {product?.discount > 0 && (
                    <span className="text-lg font-bold text-gray-500 dark:text-gray-300 line-through">
                      ₹{product?.price}
                    </span>
                  )}
                  {product?.discount > 0 && (
                    <span className="text-lg font-bold text-red-500">
                      ({product?.discount}% off)
                    </span>
                  )}
                </div>
                {product?.reviews?.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Rating
                      value={product?.ratings}
                      readOnly
                      precision={0.5}
                      className="mr-2 text-yellow-400"
                    />
                    <span className="text-gray-500 dark:text-gray-300">
                      ({reviews.length} reviews)
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold mb-2">Select Color</h3>
                  <div className="flex gap-2 flex-wrap">
                    {colorOptions.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded ${
                          selectedColor === color
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        } transition-colors duration-200`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Select Size</h3>
                  <div className="flex gap-2 flex-wrap">
                    {sizeOptions.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded ${
                          selectedSize === size
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        } transition-colors duration-200`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4"
                >
                  <Button
                    fullWidth
                    className="bg-yellow-500 dark:bg-red-600 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-3 disabled:opacity-50"
                    onClick={() => handleAddCart(product)}
                  >
                    <ShoppingCartIcon className="text-yellow-500 dark:text-red-600" />
                    <span className="font-semibold text-yellow-500 dark:text-red-600">
                      Add to Cart
                    </span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mb-16 bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8"
            >
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 border-b-2 pb-2">
                Product Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                    Product ID:
                  </span>
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-400">
                    F-{product?._id.slice(0, 15)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                    Category:
                  </span>
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-400">
                    {product?.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                    Collection:
                  </span>
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-400">
                    {product?.subcategory}
                  </span>
                </div>
                {Array.isArray(product?.coloroptions) &&
                  product.coloroptions.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                        Available Colors:
                      </span>
                      <div className="flex gap-2">
                        {product.coloroptions.map((clr, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200 font-semibold shadow-md"
                          >
                            {clr}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                {product?.size?.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                      All Sizes:
                    </span>
                    <div className="flex gap-2">
                      {product.size.map((sz, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 font-semibold shadow-md"
                        >
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {product?.sizeoptions?.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                      Available Sizes:
                    </span>
                    <div className="flex gap-2">
                      {product.sizeoptions.map((sz, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200 font-semibold shadow-md"
                        >
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.section
              variants={itemVariants}
              className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Customer Reviews
              </h2>
              <div className="space-y-8 mb-12">
                {visibleReviews && visibleReviews.length > 0 ? (
                  visibleReviews.map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg"
                    >
                      <div className="flex items-center mb-4">
                        <Rating
                          value={review?.rating || 0}
                          readOnly
                          size="small"
                        />
                        <span className="ml-2 text-gray-500 dark:text-gray-300 text-sm">
                          {review?.createdAt
                            ? new Date(review.createdAt).toLocaleDateString()
                            : "No date available"}
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-300 text-sm">
                        {review?.comment || "No comment available"}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    No reviews available
                  </p>
                )}
                {visibleReviews.length < reviews.length && (
                  <button
                    onClick={handleShowNext}
                    className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg shadow-md dark:bg-red-600 transition-all duration-300 flex items-center justify-center mx-auto"
                  >
                    Show Next Reviews
                  </button>
                )}
              </div>
              <div className="border-t pt-8">
                <h3 className="text-xl font-semibold mb-6 dark:text-white">
                  Write a Review
                </h3>
                <div className="space-y-4">
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience..."
                    className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    rows="4"
                    name="comment"
                  />
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600 dark:text-gray-300">
                      Rating:
                    </span>
                    <Rating
                      value={rating}
                      onChange={(e, newValue) => setRating(newValue)}
                      size="large"
                      sx={{
                        color: "#FFD700",
                        "& .MuiRating-iconEmpty": {
                          color: "rgba(189, 189, 189, 0.5)",
                        },
                      }}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReviewSubmit}
                    disabled={reviewPosting}
                    className="bg-yellow-500 dark:bg-red-600 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 mx-auto"
                  >
                    {reviewPosting ? "Submitting..." : "Submit Review"}
                  </motion.button>
                </div>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {randomSimilar.map((prod) => (
                  <motion.div
                    key={prod._id}
                    whileHover={{ y: -5 }}
                    className="overflow-hidden"
                  >
                    <ProductCard product={prod} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

ProductDetails.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ),
};

export default ProductDetails;
