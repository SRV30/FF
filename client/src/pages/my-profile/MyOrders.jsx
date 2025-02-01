import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

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
  {
    id: "#578",
    number: "234-5678-901-2345",
    time: "04:00 AM",
    status: "New Order",
    shipping: true,
    amount: "$891",
  },
  {
    id: "#579",
    number: "958-4030-182-0187",
    time: "12:33 PM",
    status: "On Delivery",
    shipping: false,
    amount: "$165",
  },
  {
    id: "#580",
    number: "345-6789-012-3456",
    time: "02:02 AM",
    status: "On Delivery",
    shipping: false,
    amount: "$165",
  },
  {
    id: "#581",
    number: "456-7890-123-4567",
    time: "09:41 AM",
    status: "Cancelled",
    shipping: true,
    amount: "$891",
  },
  {
    id: "#582",
    number: "567-8901-234-5678",
    time: "12:50 PM",
    status: "Delivered",
    shipping: true,
    amount: "$687",
  },
  {
    id: "#583",
    number: "678-9012-345-6789",
    time: "04:26 PM",
    status: "New Order",
    shipping: false,
    amount: "$250",
  },
  {
    id: "#584",
    number: "789-0123-456-7890",
    time: "10:51 AM",
    status: "Delivered",
    shipping: false,
    amount: "$512",
  },
];

const MyOrders = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen p-4 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className=" shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 p-2 border rounded"
          />
          <button className="bg-yellow-500 dark:bg-yellow-800 hover:bg-yellow-600 text-white px-4 py-2 rounded">
            New Order
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-600">
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Order Number</th>
                <th className="p-2 border">Order Date</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Free Shipping</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {ordersData
                .filter((order) => order.id.includes(search))
                .map((order) => (
                  <tr key={order.id} className="text-center">
                    <td className="p-2 border">{order.id}</td>
                    <td className="p-2 border">{order.number}</td>
                    <td className="p-2 border">{order.time}</td>
                    <td
                      className={`p-2 border ${
                        order.status === "On Delivery"
                          ? "text-blue-600"
                          : order.status === "Cancelled"
                          ? "text-gray-600"
                          : order.status === "New Order"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="p-2 border">
                      <input
                        type="checkbox"
                        checked={order.shipping}
                        readOnly
                      />
                    </td>
                    <td className="p-2 border">{order.amount}</td>
                    <td className="p-2 border">
                      <button className="p-2 text-gray-500 hover:text-gray-700">
                        <FaEllipsisV className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
