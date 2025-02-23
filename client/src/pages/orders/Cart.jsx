import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import {
  deleteCartItem,
  getCartItems,
  updateCartItemQty,
} from "@/store/add-to-cart/addToCart";
import MetaData from "../extras/MetaData";
import { Button, IconButton, Skeleton } from "@mui/material";
import { ShoppingCartCheckout } from "@mui/icons-material";

const Cart = () => {
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems = [], loading, error } = useSelector((state) => state.cart);
  const { discounts } = useSelector((state) => state.discount);

  useEffect(() => {
    setAppliedCoupon(null);
  }, []);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center h-screen"
      >
        <Skeleton
          variant="rectangular"
          width="80%"
          height={400}
          className="rounded-2xl shadow-lg"
          sx={{ bgcolor: "grey.200" }}
        />
      </motion.div>
    );
  }

  const handleUpdateQty = (id, qty) => {
    if (qty > 0) {
      dispatch(updateCartItemQty({ _id: id, qty })).then(() => {
        dispatch(getCartItems());
      });
    }
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteCartItem(id)).then(() => {
      dispatch(getCartItems());
    });
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.productId?.price || 0) * item.quantity,
    0
  );

  const totalDiscount = cartItems.reduce(
    (total, item) =>
      total +
      ((item.productId?.price * (item.productId?.discount || 0)) / 100) *
        item.quantity,
    0
  );

  const shipping = () => 0;

  const finalTotal = () => {
    const finalTotalPrice = totalPrice - totalDiscount;
    return finalTotalPrice + shipping();
  };

  const appliedCouponAmount = () => {
    const total = finalTotal();
    if (discounts?.discountValue) {
      return Math.max(total * (1 - discounts.discountValue / 100), 0);
    }
    return total;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <MetaData title="Cart | Faith & Fast" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center"
        >
          Shopping Cart
        </motion.h1>

        {error && (
          <motion.p
            variants={itemVariants}
            className="text-red-500 text-center py-10 bg-red-100 dark:bg-red-900 rounded-2xl shadow-md"
          >
            {error}
          </motion.p>
        )}

        {cartItems.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
          >
            <p className="text-xl mb-6 text-gray-600 dark:text-gray-300">
              Your cart is empty.
            </p>
            <Link to="/products">
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(to right, #f59e0b, #f97316)",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "9999px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "linear-gradient(to right, #d97706, #ea580c)",
                  },
                }}
              >
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-6 flex-1">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={item.productId.images[0].url}
                      alt={item.productId.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-sm"
                    />
                    <div className="space-y-2">
                      <Link
                        to={`/product/${item.productId._id}`}
                        className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-yellow-500 transition-colors duration-200"
                      >
                        {item.productId.name}
                      </Link>
                      <p className="text-gray-600 dark:text-gray-400">
                        ₹{item.productId.price.toFixed(2)}
                      </p>
                      <div className="flex justify-between">
                        <p className="text-gray-600 dark:text-gray-400">
                          Discount
                        </p>
                        <p className="text-red-500 font-medium">
                          -₹
                          {(
                            item.productId.price *
                            (item.productId.discount / 100)
                          ).toFixed(2)}
                        </p>
                      </div>
                      <div className="mt-2">
                        {item.selectedColor && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Color: {item.selectedColor}
                          </p>
                        )}
                        {item.selectedSize && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Size: {item.selectedSize}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                      <motion.div whileTap={{ scale: 0.9 }}>
                        <IconButton
                          onClick={() =>
                            handleUpdateQty(item._id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          sx={{
                            color: "gray",
                            "&:hover": { color: "#f59e0b" },
                          }}
                        >
                          <FiMinus />
                        </IconButton>
                      </motion.div>
                      <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
                        {item.quantity}
                      </span>
                      <motion.div whileTap={{ scale: 0.9 }}>
                        <IconButton
                          onClick={() =>
                            handleUpdateQty(item._id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.productId.stock}
                          sx={{
                            color: "gray",
                            "&:hover": { color: "#f59e0b" },
                          }}
                        >
                          <FiPlus />
                        </IconButton>
                      </motion.div>
                    </div>

                    <motion.div whileTap={{ scale: 0.9 }}>
                      <IconButton
                        onClick={() => handleDeleteItem(item._id)}
                        sx={{
                          color: "#ef4444",
                          "&:hover": { color: "#b91c1c" },
                        }}
                      >
                        <FiTrash2 />
                      </IconButton>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Order Summary
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="font-medium">₹{totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Discount</p>
                  <p className="text-red-500 font-medium">
                    -₹{totalDiscount.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p className="font-medium">Free Shipping</p>
                </div>
                <div className="flex justify-between border-t pt-4 text-lg font-bold text-gray-800 dark:text-gray-100">
                  <p>Total</p>
                  <p>₹{appliedCouponAmount().toFixed(2)}</p>
                </div>
              </div>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-red-600 dark:to-red-700 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-md hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
              >
                <ShoppingCartCheckout />
                Proceed to Checkout
              </motion.button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;