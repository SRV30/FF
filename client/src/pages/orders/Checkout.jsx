import { getCartItems } from "@/store/add-to-cart/addToCart";
import { userAddress } from "@/store/address-slice/addressSlice";
import { getSingleDetail } from "@/store/auth-slice/user";
import { createOrder } from "@/store/order-slice/order";
import { getProducts } from "@/store/product-slice/productSlice";
import { CircularProgress } from "@mui/material";
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

  const calculateShipping = () => {
    return 0;
  };

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

      const formattedProducts = cartItems.map((item) => {
        const product = products.find((p) => p._id === item.productId._id);
        return {
          product: product._id,
          name: product.name,
          quantity: item.quantity,
          price: product.price,
          totalPrice: (
            product.price *
            item.quantity *
            (1 - product.discount / 100)
          ).toFixed(2),
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
        };
      });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderData.addressId) {
      toast.error("Please select an address!");
      return;
    }
    if (orderData.totalAmount <= 0) {
      toast.error("Invalid total amount. Please check the cart.");
      return;
    }
    dispatch(createOrder(orderData));
    toast.success("Order created successfully!");
    navigate("/order-success");
  };

  if (productLoading || orderLoading || authLoading || cartLoading) {
    return <CircularProgress className="mt-10 items-center justify-center" />;
  }

  const handleURLChange = (event) => {
    if (event.target.value === "Online") {
      navigate("/online/payment");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Order</h2>

      {error && (
        <p className="text-red-500">
          {typeof error === "object" ? error.message : error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="container mx-auto p-6">
          <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Select Address
          </label>

          {address.length === 0 ? (
            <>
              <p className="text-red-500">
                No addresses available. Please add an address to continue.
              </p>
              <Link to="/saved-address">
                <button className="bg-yellow-500 hover:bg-yellow-700 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                  Add Address
                </button>
              </Link>
            </>
          ) : (
            address.map((addr) => (
              <motion.div
                key={addr._id}
                className="flex items-center mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.03 }}
              >
                <input
                  type="radio"
                  name="addressId"
                  value={addr._id}
                  onChange={handleChange}
                  className="mr-4 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
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
            ))
          )}
        </div>

        <div className="container mx-auto p-6">
          <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Payment Method
          </label>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <select
              name="paymentMethod"
              value={orderData.paymentMethod}
              onChange={(e) => {
                handleChange(e);
                handleURLChange(e);
              }}
              className="w-full p-3 pl-4 pr-10 border rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-700 transition duration-300 ease-in-out"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Online">Online Payment through Razorpay</option>
            </select>
          </motion.div>
        </div>

        <div className="p-4">
          <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200">
            Your Items
          </label>

          <AnimatePresence>
            {cartItems?.length > 0 ? (
              cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 my-3"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <motion.img
                      src={item.productId.images[0]?.url || "/placeholder.jpg"}
                      alt={item.productId.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                      whileHover={{ scale: 1.1 }}
                    />

                    <div>
                      <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {item.productId.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Color: {item.selectedColor}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Size: {item.selectedSize}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
                    <div className="flex flex-col items-center">
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        ₹
                        {(
                          item.productId.price *
                          (1 - item.productId.discount / 100)
                        ).toFixed(2)}
                      </p>
                      {item.productId.discount > 0 && (
                        <p className="text-sm line-through text-gray-500 dark:text-gray-400">
                          ₹{item.productId.price}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500 dark:text-gray-400 mt-4 text-center"
              >
                No items.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="container mx-auto p-6">
          <label
            className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4"
            htmlFor="totalAmount"
          >
            Total Amount
          </label>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center border rounded-lg bg-white dark:bg-gray-800">
              <span className="text-xl text-gray-800 dark:text-gray-200 mx-3">
                ₹
              </span>
              <input
                id="totalAmount"
                type="number"
                name="totalAmount"
                value={orderData.totalAmount || 0}
                className="w-full p-3 pl-0 text-xl text-gray-800 dark:text-gray-200 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-700 transition duration-300 ease-in-out"
                readOnly
                aria-label="Total Amount"
              />
            </div>
          </motion.div>
        </div>

        <motion.button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-700 focus:outline-none transition-all duration-300 ease-in-out transform dark:bg-red-600 dark:hover:bg-red-700 dark:text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Place Order"
        >
          Place Order
        </motion.button>
      </form>
    </div>
  );
};

export default CreateOrder;
