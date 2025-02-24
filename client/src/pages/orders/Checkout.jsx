import { deleteCartItem, getCartItems } from "@/store/add-to-cart/addToCart";
import { userAddress } from "@/store/address-slice/addressSlice";
import { getSingleDetail } from "@/store/auth-slice/user";
import { createOrder } from "@/store/order-slice/order";
import { getProducts } from "@/store/product-slice/productSlice";
import { Button, CircularProgress } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { discountValue } = useSelector((state) => state.discount);
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { address } = useSelector((state) => state.address);
  const { product: products = [], loading: productLoading } = useSelector(
    (state) => state.product
  );
  const { cartItems = [], loading: cartLoading } = useSelector(
    (state) => state.cart
  );
  const { loading: orderLoading, error } = useSelector((state) => state.order);

  const [orderData, setOrderData] = useState({
    userId: "",
    addressId: "",
    products: [],
    paymentMethod: "COD",
    totalAmount: 0,
  });

  const calculateShipping = () => 0;

  useEffect(() => {
    dispatch(userAddress());
    dispatch(getProducts());
    dispatch(getSingleDetail());
    dispatch(getCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (user?._id) {
      setOrderData((prevData) => ({
        ...prevData,
        userId: user._id,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (cartItems.length > 0 && products.length > 0) {
      const productTotal = cartItems.reduce((acc, item) => {
        const product = products.find((p) => p._id === item.productId._id);
        return (
          acc + product.price * item.quantity * (1 - product.discount / 100)
        );
      }, 0);

      const shippingCost = calculateShipping(productTotal);
      const subtotal = productTotal + shippingCost;

      const finalAmount = discountValue
        ? subtotal * (1 - discountValue / 100)
        : subtotal;

      const formattedProducts = cartItems
        .map((item) => {
          const product = products.find((p) => p._id === item.productId._id);
          return product
            ? {
                product: product._id,
                name: product.name,
                quantity: item.quantity,
                price: product.price,
                totalPrice: (
                  product.price *
                  item.quantity *
                  (1 - (product.discount || 0) / 100)
                ).toFixed(2),
                selectedColor: item.selectedColor,
                selectedSize: item.selectedSize,
              }
            : null;
        })
        .filter(Boolean);

      setOrderData((prev) => ({
        ...prev,
        products: formattedProducts,
        totalAmount: finalAmount.toFixed(2),
      }));
    }
  }, [cartItems, products, discountValue]);

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderData.addressId) {
      toast.error("Please select an address!");
      return;
    }
    if (orderData.totalAmount <= 0 || !orderData.products.length) {
      toast.error("Invalid order. Please check your cart.");
      return;
    }
    try {
      const result = await dispatch(createOrder(orderData)).unwrap();
      if (result) {
        toast.success("Order created successfully!");
        cartItems.forEach((item) => {
          dispatch(deleteCartItem(item._id));
        });
        dispatch(getCartItems());
        navigate("/order-success");
      }
    } catch (err) {
      toast.error(
        "Failed to create order: " + (err.message || "Unknown error")
      );
    }
  };

  const handleURLChange = (event) => {
    if (event.target.value === "Online") {
      navigate("/online/payment");
    }
  };

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

  if (productLoading || orderLoading || authLoading || cartLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen"
      >
        <CircularProgress sx={{ color: "#f59e0b" }} size={60} />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100"
        >
          Checkout
        </motion.h2>

        {error && (
          <motion.p
            variants={itemVariants}
            className="text-red-500 text-center mb-6 bg-red-100 dark:bg-red-900 rounded-lg p-2 shadow-md"
          >
            {typeof error === "object" ? error.message : error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Address Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200">
              Select Address
            </label>
            {address.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center bg-red-100 dark:bg-red-900 rounded-lg p-4 shadow-md"
              >
                <p className="text-red-500 dark:text-red-400 mb-4">
                  No addresses available. Please add an address to continue.
                </p>
                <Link to="/saved-address">
                  <Button
                    sx={{
                      background: "linear-gradient(to right, #f59e0b, #f97316)",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "9999px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      "&:hover": {
                        background:
                          "linear-gradient(to right, #d97706, #ea580c)",
                      },
                    }}
                  >
                    Add Address
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {address.map((addr) => (
                    <motion.div
                      key={addr._id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <input
                        type="radio"
                        name="addressId"
                        value={addr._id}
                        onChange={handleChange}
                        className="mr-4 w-5 h-5 text-yellow-500 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 transition duration-200"
                        required
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {`${addr.address_line}, ${addr.city}, ${addr.state}, ${addr.pincode}`}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {addr.mobile}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Payment Method Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200">
              Payment Method
            </label>
            <motion.div
              variants={itemVariants}
              className="relative bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md"
            >
              <select
                name="paymentMethod"
                value={orderData.paymentMethod}
                onChange={(e) => {
                  handleChange(e);
                  handleURLChange(e);
                }}
                className="w-full p-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              >
                <option value="COD">Cash on Delivery</option>
                <option value="Online">Online Payment (Razorpay)</option>
              </select>
            </motion.div>
          </motion.div>

          {/* Cart Items Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200">
              Your Items
            </label>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md">
              <AnimatePresence>
                {cartItems?.length > 0 ? (
                  cartItems.map((item) => (
                    <motion.div
                      key={item._id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-3"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <motion.img
                          src={
                            item.productId.images[0]?.url || "/placeholder.jpg"
                          }
                          alt={item.productId.name}
                          className="w-20 h-20 object-cover rounded-lg shadow-sm"
                          whileHover={{ scale: 1.05 }}
                        />
                        <div>
                          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {item.productId.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Quantity: {item.quantity}
                          </p>
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
                      <div className="flex flex-col items-center mt-4 sm:mt-0">
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                          ₹
                          {(
                            item.productId.price *
                            item.quantity *
                            (1 - (item.productId.discount || 0) / 100)
                          ).toFixed(2)}
                        </p>
                        {item.productId.discount > 0 && (
                          <p className="text-sm line-through text-gray-500 dark:text-gray-400">
                            ₹{(item.productId.price * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.p
                    variants={itemVariants}
                    className="text-gray-500 dark:text-gray-400 text-center"
                  >
                    No items in your cart.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Total Amount Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200">
              Total Amount
            </label>
            <motion.div
              variants={itemVariants}
              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md flex items-center justify-between"
            >
              <span className="text-xl text-gray-800 dark:text-gray-200">
                ₹
              </span>
              <input
                id="totalAmount"
                type="number"
                name="totalAmount"
                value={orderData.totalAmount || 0}
                className="w-full p-3 text-xl text-gray-800 dark:text-gray-200 bg-transparent focus:outline-none"
                readOnly
                aria-label="Total Amount"
              />
            </motion.div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-red-600 dark:to-red-700 text-white py-3 rounded-full font-semibold shadow-md hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
            aria-label="Place Order"
          >
            Place Order
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateOrder;
