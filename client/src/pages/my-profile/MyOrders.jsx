import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { motion } from "framer-motion";

const ordersData = [
  {
    id: "#576",
    number: "228-3844-931-7689",
    time: "02:26 PM",
    status: "On Delivery",
    shipping: false,
    amount: "$250",
  },
  {
    id: "#577",
    number: "123-4567-890-1234",
    time: "10:27 PM",
    status: "Cancelled",
    shipping: true,
    amount: "$687",
  },
];

const MyOrders = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen p-4 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="shadow-lg rounded-lg p-6 bg-white dark:bg-gray-800"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 p-3 border rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 dark:bg-red-600 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-all"
          >
            New Order
          </motion.button>
        </div>

        <div className="overflow-x-auto">
          <motion.table
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full border-collapse border border-gray-200 rounded-lg shadow-md"
          >
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Order Number</th>
                <th className="p-3 border">Order Date</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Free Shipping</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {ordersData
                .filter((order) => order.id.includes(search))
                .map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <td className="p-3 border">{order.id}</td>
                    <td className="p-3 border">{order.number}</td>
                    <td className="p-3 border">{order.time}</td>
                    <td
                      className={`p-3 border font-semibold ${
                        order.status === "On Delivery"
                          ? "text-blue-600 dark:text-blue-400"
                          : order.status === "Cancelled"
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="p-3 border">
                      <input
                        type="checkbox"
                        checked={order.shipping}
                        readOnly
                        className="w-5 h-5 accent-yellow-500"
                      />
                    </td>
                    <td className="p-3 border">{order.amount}</td>
                    <td className="p-3 border">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <FaEllipsisV className="w-5 h-5" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </motion.table>
        </div>
      </motion.div>
    </div>
  );
};

export default MyOrders;
