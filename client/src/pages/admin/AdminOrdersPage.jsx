// src/components/AdminOrdersPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  deleteOrder,
  getAllOrders,
  updateOrderStatus,
} from "@/store/order-slice/AdminOrderSlice";

const AdminOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminOrders);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [notes, setNotes] = useState("");
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // Update Order Dialog handlers
  const handleUpdateClick = (order) => {
    setSelectedOrder(order);
    setUpdateStatus(order.orderStatus);
    setTrackingId(order.trackingId || "");
    setNotes("");
    setOpenUpdateDialog(true);
  };

  const handleUpdateSubmit = () => {
    if (selectedOrder) {
      dispatch(
        updateOrderStatus({
          orderId: selectedOrder._id,
          orderStatus: updateStatus,
          trackingId,
          notes,
        })
      ).then(() => setOpenUpdateDialog(false));
    }
  };

  // Delete Order Dialog handlers
  const handleDeleteClick = (orderId) => {
    setDeleteOrderId(orderId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteOrderId) {
      dispatch(deleteOrder(deleteOrderId)).then(() =>
        setOpenDeleteDialog(false)
      );
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto dark:bg-gray-900">
      <motion.h1
        className="text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Orders Dashboard
      </motion.h1>

      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No orders found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Payment</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {orders.map((order) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <td className="p-4 text-sm text-gray-700 dark:text-gray-300">
                      {order._id}
                    </td>
                    <td className="p-4 text-sm text-gray-700 dark:text-gray-300">
                      {order.user?.name} <br />
                      <span className="text-xs text-gray-500">
                        {order.user?.email}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-700 dark:text-gray-300">
                      {order.paymentMethod}
                    </td>
                    <td className="p-4 text-sm text-gray-700 dark:text-gray-300">
                      {new Date(order.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>

                    <td className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {order.orderStatus}
                    </td>
                    <td className="p-4 text-sm text-green-600 font-bold">
                      ₹{order.totalAmount.toFixed(2)}
                    </td>
                    <td className="p-4 text-center space-x-2">
                      <button
                        onClick={() => handleUpdateClick(order)}
                        className="text-blue-500 hover:underline"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteClick(order._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {/* Update Order Status Dialog */}
      <Dialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
      >
        <DialogTitle className="dark:text-white">
          Update Order Status
        </DialogTitle>
        <DialogContent className="dark:bg-gray-800 dark:text-gray-200">
          {selectedOrder && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Order Status
                </label>
                <select
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value)}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Tracking ID
                </label>
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ></textarea>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions className="dark:bg-gray-800">
          <Button onClick={() => setOpenUpdateDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle className="dark:text-white">Delete Order</DialogTitle>
        <DialogContent className="dark:bg-gray-800 dark:text-gray-300">
          <p>Are you sure you want to delete this order?</p>
        </DialogContent>
        <DialogActions className="dark:bg-gray-800">
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminOrdersPage;
