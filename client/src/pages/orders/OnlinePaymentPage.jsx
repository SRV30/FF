import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  resetOrder,
  verifyPayment,
} from "@/store/order-slice/onlinePayment";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value); // Store selected address ID
  };

  const handlePayment = async () => {
    if (!user || cartItems.length === 0 || !selectedAddress) {
      alert("Please select an address and ensure your cart is not empty.");
      return;
    }

    const orderData = {
      userId: user._id,
      address: selectedAddress,
      products: cartItems.map((item) => ({
        product: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
        totalPrice: item.finalTotal,
      })),
      totalAmount: finalTotal,
      deliveryDate: new Date().toISOString().split("T")[0],
    };

    dispatch(createOrder(orderData));
    navigate("/order-success");
  };

  useEffect(() => {
    if (order) {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.finalTotal * 100, // Convert to paisa
        currency: "INR",
        name: "Faith & Fast",
        description: "Purchase",
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
    }
  }, [order, orderId, dispatch, user]);

  useEffect(() => {
    if (paymentSuccess) {
      alert("Payment Successful!");
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
                onChange={handleAddressChange} // Use the correct handler
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
