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
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [randomSimilar, setRandomSimilar] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const [visibleReviews, setVisibleReviews] = useState([]);

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

  useEffect(() => {
    dispatch(getProductDetails(productId));
    dispatch(getProductReviews(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product?.gender) {
      dispatch(getSimilarProducts(product.gender));
    }
  }, [dispatch, product]);

  useEffect(() => {
    const combined = [...(similarProducts || []), ...(products || [])];
    setRandomSimilar(combined.sort(() => Math.random() - 0.5).slice(0, 6));
  }, [similarProducts, products]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MetaData
        title={product?.name}
        description={product?.description}
      />

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
            {/* Product Image Slider */}
            <motion.div variants={itemVariants} className="mb-12">
              <ImageSlider images={product?.images?.map((img) => img.url)} />
            </motion.div>

            {/* Product Info */}
            <motion.div
              variants={itemVariants}
              className="grid md:grid-cols-2 gap-8 mb-16"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-center">
                <motion.h1
                  initial={{ x: -50 }}
                  animate={{ x: 0 }}
                  className="text-4xl font-bold text-gray-800 dark:text-white mb-4 capitalize"
                >
                  {product?.name}
                </motion.h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {product?.description}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <div className="flex items-center justify-between mb-6">
                  <div className="gap-5">
                    <span className="text-3xl font-bold text-yellow-500 dark:text-red-600">
                      ₹
                      {(
                        product?.price -
                        product?.price * (product?.discount / 100)
                      ).toLocaleString()}
                    </span>

                    <span className="text-2xl font-bold text-gray-600 line-through">
                      ₹{product?.price?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center">
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
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    fullWidth
                    className="bg-yellow-500 dark:bg-red-600 text-white px-8 py-3 rounded-lg font-medium disabled:opacity-50 gap-5 flex items-center justify-center"
                  >
                    <ShoppingCartIcon className="text-yellow-500 dark:text-red-600 " />
                    <span className="font-semibold text-yellow-500 dark:text-red-600">
                      Add to Cart
                    </span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Reviews Section */}
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
                        {review?.createdAt ? (
                          <span className="ml-2 text-gray-500 dark:text-gray-300 text-sm">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="ml-2 text-gray-500 dark:text-gray-300 text-sm">
                            No date available
                          </span>
                        )}
                      </div>
                      {review ? (
                        <span className="ml-2 text-gray-500 dark:text-gray-300 text-sm">
                          {review.comment}
                        </span>
                      ) : (
                        <span className="ml-2 text-gray-500 dark:text-gray-300 text-sm">
                          No comment available
                        </span>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <p>No reviews available</p>
                )}

                {visibleReviews.length < reviews.length && (
                  <button
                    onClick={handleShowNext}
                    className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg shadow-md dark:bg-red-600 transition-all duration-300 flex items-center justify-center m-auto"
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
                    className="bg-yellow-500 dark:bg-red-600 text-white px-8 py-3 rounded-lg font-medium disabled:opacity-50 item-center justify-center m-auto flex"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {randomSimilar.map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ y: -5 }}
                    className="overflow-hidden"
                  >
                    <ProductCard product={product} />
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
