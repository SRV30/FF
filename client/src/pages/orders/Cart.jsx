import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import {
  deleteCartItem,
  getCartItems,
  updateCartItemQty,
} from "@/store/add-to-cart/addToCart";
import { Helmet } from "react-helmet";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch, cartItems, loading, error]);

  
  const handleUpdateQty = (id, qty) => {
    if (qty > 0) {
      dispatch(updateCartItemQty({ _id: id, qty }));
    }
  };

  
  const handleDeleteItem = (id) => {
    dispatch(deleteCartItem(id));
  };

  
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>Shopping Cart - Your Store</title>
        <meta
          name="description"
          content="View and manage your shopping cart. Add, remove, or update items before checkout."
        />
        <meta name="keywords" content="shopping cart, ecommerce, online store" />
      </Helmet>

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h1>

      
        {error && (
          <p className="text-red-500 text-center py-10">{error}</p>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
            <Link
              to="/products"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Product Image and Details */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={item.productId.images[0]?.url}
                      alt={item.productId.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <Link
                        to={`/product/${item.productId._id}`}
                        className="text-lg font-semibold text-gray-800 hover:text-blue-500"
                      >
                        {item.productId.name}
                      </Link>
                      <p className="text-gray-500">
                        ₹{item.productId.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Stock: {item.productId.stock}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <div className="flex items-center gap-2">
                      <button
                        className={`p-2 border rounded-lg ${
                          item.quantity <= 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-100"
                        } transition-colors`}
                        onClick={() => handleUpdateQty(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-medium">{item.quantity}</span>
                      <button
                        className={`p-2 border rounded-lg ${
                          item.quantity >= item.productId.stock
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-100"
                        } transition-colors`}
                        onClick={() => handleUpdateQty(item._id, item.quantity + 1)}
                        disabled={item.quantity >= item.productId.stock}
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      className="p-2 border rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-gray-800 font-medium">
                    ₹{totalPrice.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p className="text-gray-800 font-medium">Free</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Discount</p>
                  <p className="text-gray-800 font-medium">₹0.00</p>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <p className="text-lg font-bold text-gray-800">Total</p>
                    <p className="text-lg font-bold text-gray-800">
                      ₹{totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full bg-blue-500 text-white py-3 rounded-lg mt-6 hover:bg-blue-600 transition-colors"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;