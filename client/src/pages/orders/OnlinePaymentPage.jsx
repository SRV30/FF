import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  resetOrder,
  verifyPayment,
} from "@/store/order-slice/onlinePayment";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { address } = useSelector((state) => state.address);
  const { cartItems, finalTotal } = useSelector((state) => state.cart);
  const { order, orderId, loading, error, paymentSuccess } = useSelector(
    (state) => state.online
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => console.log("Razorpay SDK loaded successfully");
      script.onerror = () =>
        console.error("Failed to load Razorpay SDK. Check your connection.");
      document.body.appendChild(script);
    }
  }, []);

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  const handlePayment = async () => {
    if (!user || cartItems.length === 0 || !selectedAddress) {
      toast.error(
        "Please select an address and ensure your cart is not empty."
      );
      return;
    }

    const orderData = {
      userId: user.id,
      address: selectedAddress,
      products: cartItems.map((item) => ({
        product: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
        totalPrice: item.finalTotal,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })),
      totalAmount: finalTotal,
      deliveryDate: new Date().toISOString().split("T")[0],
    };

    console.log("Creating Order with data:", orderData);
    dispatch(createOrder(orderData));
  };

  useEffect(() => {
    if (order) {
      console.log("Received Razorpay order:", order);

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        console.error(
          "Razorpay Key ID is not defined in environment variables."
        );
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Faith AND Fast",
        description: "Online clothing Store",
        image:
          "https://res.cloudinary.com/dngcas6v3/image/upload/v1739307851/Faith___Fast__square_shape_pgoni3.png",
        order_id: order.id,
        handler: async (response) => {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId,
          };
          dispatch(verifyPayment(paymentData));
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || "",
        },
        theme: { color: "#ecc94b" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } else {
      console.log("Razorpay SDK failed to load. Please check your connection.");
    }
  }, [order, orderId, dispatch, user]);

  useEffect(() => {
    if (paymentSuccess) {
      toast.success("Payment Successful!");
      dispatch(resetOrder());
      navigate("/order-success");
    }
  }, [paymentSuccess, dispatch, navigate]);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="container mx-auto p-6">
        <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Select Address
        </label>

        {address.length === 0 ? (
          <p className="text-red-500">
            No addresses available. Please add an address to continue.
          </p>
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
                onChange={handleAddressChange}
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

      <h2 className="text-2xl font-bold">Pay with Razorpay</h2>
      {error && <p className="text-red-500">{error.message}</p>}
      <button
        onClick={handlePayment}
        className="mt-4 px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
        disabled={loading}
      >
        {loading ? "Processing..." : `Pay ₹${finalTotal}`}
      </button>
    </div>
  );
};

export default PaymentPage;
