import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { myOrders } from "@/store/order-slice/order";
import { Alert, CircularProgress } from "@mui/material";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

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
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{typeof error === "string" ? error : "No Orders Available"}</Alert>
      ) : Array.isArray(orders) && orders.length === 0 ? (
        <Alert severity="info">No orders found</Alert>
      ) : Array.isArray(orders) ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Order ID</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Total</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="py-2 px-4 border">{order._id}</td>
                  <td className="py-2 px-4 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">₹{order.totalAmount}</td>
                  <td className="py-2 px-4 border">
                    <span
                      className={`px-2 py-1 text-xs font-semibold ${handleStatus(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    <Link
                      to={`/order/${order._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Alert severity="error">
          {orders?.message || "Something went wrong"}
        </Alert>
      )}
    </div>
  );
};

export default MyOrders;
