import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getSingleOrder } from "@/store/order-slice/order";
import MetaData from "../extras/MetaData";
import { Alert, CircularProgress } from "@mui/material";

const OrderDetails = () => {
  const { Id } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getSingleOrder(Id));
  }, [dispatch, Id]);

  const handleStatus = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100 px-2 py-1 rounded-md font-semibold";
      case "PENDING":
        return "bg-orange-200 dark:bg-orange-800 text-orange-900 dark:text-orange-100 px-2 py-1 rounded-md font-semibold";
      case "SHIPPED":
        return "bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 px-2 py-1 rounded-md font-semibold";
      case "CANCELLED":
        return "bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100 px-2 py-1 rounded-md font-semibold";
      default:
        return "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 rounded-md font-semibold";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <MetaData title="Order Details" />
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold mb-4 text-center"
      >
        Order Details
      </motion.h2>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : order ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-xl p-6 space-y-4 max-w-4xl mx-auto"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
            <span
              className={`px-3 py-1 rounded-lg text-sm font-semibold ${handleStatus(
                order.orderStatus
              )}`}
            >
              {order.orderStatus}
            </span>
          </div>

          <p className="text-gray-700">
            <strong>Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            <strong>Total Amount:</strong> ₹{order.totalAmount}
          </p>
          <p className="text-gray-700">
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
          >
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              Shipping Address
            </h4>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm text-gray-600">
                  Address:
                </span>
                <p className="text-sm">{order.address.address_line}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm text-gray-600">
                  City:
                </span>
                <p className="text-sm">{order.address.city}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm text-gray-600">
                  State:
                </span>
                <p className="text-sm">{order.address.state}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm text-gray-600">
                  Pincode:
                </span>
                <p className="text-sm">{order.address.pincode}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm text-gray-600">
                  Country:
                </span>
                <p className="text-sm">{order.address.country}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm text-gray-600">
                  Mobile:
                </span>
                <p className="text-sm">{order.address.mobile}</p>
              </div>
            </div>
          </motion.div>

          <h4 className="font-semibold mt-4">Items Ordered</h4>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="divide-y"
          >
            {order?.products && order.products.length > 0 ? (
              order.products.map((item, index) => (
                <div key={index} className="py-2 flex items-center space-x-4">
                  <img
                    src={
                      item?.product?.images?.[0]?.url || "/default-image.jpg"
                    }
                    alt={item?.product?.name || "Product Image"}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h5 className="font-semibold">
                      {item?.product?.name || "Product Name"}
                    </h5>
                    <p className="text-sm text-gray-600">
                      Quantity: {item?.quantity || 0}
                    </p>
                    <div className="mt-1 text-sm text-gray-600">
                      {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                      {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No products available</p>
            )}
          </motion.div>
        </motion.div>
      ) : (
        <Alert variant="info">Order not found.</Alert>
      )}
    </div>
  );
};

export default OrderDetails;
