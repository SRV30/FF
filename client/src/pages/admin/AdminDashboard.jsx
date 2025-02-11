import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Tag,
  BadgeIndianRupee,
} from "lucide-react";
import AdminUsers from "./AdminUsers";
import { useNavigate } from "react-router-dom";
import AdminProducts from "./AdminProducts";
import AdminDiscount from "./AdminDiscount";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New order #123 received" },
    { id: 2, text: "Low stock alert: Blue Denim Jacket" },
    { id: 3, text: "Payment received for order #120" },
  ]);

  const stats = [
    {
      title: "Total Sales",
      value: "$24,890",
      trend: "+12%",
      icon: DollarSign,
      isPositive: true,
    },
    {
      title: "Total Orders",
      value: "456",
      trend: "+8%",
      icon: ShoppingCart,
      isPositive: true,
    },
    {
      title: "Average Order",
      value: "$112",
      trend: "-3%",
      icon: Tag,
      isPositive: false,
    },
    {
      title: "Total Customers",
      value: "2,345",
      trend: "+5%",
      icon: Users,
      isPositive: true,
    },
  ];

  const recentOrders = [
    {
      id: "#123",
      customer: "John Doe",
      product: "Blue Denim Jacket",
      status: "Delivered",
      amount: "$89.99",
    },
    {
      id: "#124",
      customer: "Jane Smith",
      product: "Black T-Shirt",
      status: "Processing",
      amount: "$29.99",
    },
    {
      id: "#125",
      customer: "Mike Johnson",
      product: "Leather Boots",
      status: "Pending",
      amount: "$159.99",
    },
    {
      id: "#126",
      customer: "Sarah Williams",
      product: "Summer Dress",
      status: "Shipped",
      amount: "$69.99",
    },
  ];

  const topProducts = [
    { name: "Denim Jacket", sales: 123, revenue: "$11,070" },
    { name: "Basic T-Shirt", sales: 89, revenue: "$2,670" },
    { name: "Leather Boots", sales: 65, revenue: "$10,400" },
    { name: "Summer Dress", sales: 54, revenue: "$3,780" },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const clearNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-4 lg:p-6 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-gray-500 text-sm">{stat.title}</p>
                      <h3 className="text-xl lg:text-2xl font-bold">
                        {stat.value}
                      </h3>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    {stat.isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        stat.isPositive ? "text-green-500" : "text-red-500"
                      }
                    >
                      {stat.trend}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      vs last month
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm overflow-hidden">
                <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Order ID</th>
                        <th className="text-left py-3 px-2">Customer</th>
                        <th className="text-left py-3 px-2">Product</th>
                        <th className="text-left py-3 px-2">Status</th>
                        <th className="text-right py-3 px-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="py-3 px-2 whitespace-nowrap">
                            {order.id}
                          </td>
                          <td className="py-3 px-2 whitespace-nowrap">
                            {order.customer}
                          </td>
                          <td className="py-3 px-2 whitespace-nowrap">
                            {order.product}
                          </td>
                          <td className="py-3 px-2 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 rounded-full text-xs
                              ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Processing"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right whitespace-nowrap">
                            {order.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Top Products</h2>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0"
                    >
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">
                          {product.sales} sales
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <p className="font-medium">{product.revenue}</p>
                        <div className="w-full sm:w-32 h-2 bg-gray-100 rounded-full mt-1">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${(product.sales / 123) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "Customers":
        return <AdminUsers />;
      case "Products":
        return <AdminProducts />;
      case "Orders":
        return (
          <div className="p-4 lg:p-6 bg-white rounded-lg">
            Orders section content
          </div>
        );
      case "Discount":
        return (
          <div className="p-4 lg:p-6 bg-white rounded-lg">
           <AdminDiscount />
          </div>
        );
      case "Settings":
        return (
          <div className="p-4 lg:p-6 bg-white rounded-lg">
            Settings section content
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <aside
        className={`fixed md:static z-30 h-full w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 md:translate-x-0 flex flex-col`}
      >
        <div className="h-14 flex items-center justify-between px-4 border-b">
          <h2 className="text-lg font-semibold">Fashion Admin</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {[
            { icon: LayoutDashboard, text: "Dashboard" },
            { icon: Users, text: "Customers", path: "/admin/users" },
            { icon: ShoppingBag, text: "Products" },
            { icon: Package, text: "Orders" },
            { icon: BadgeIndianRupee, text: "Discount" },
            { icon: Settings, text: "Settings" },
          ].map((item) => (
            <button
              key={item.text}
              onClick={() => setActiveSection(item.text)}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-left space-x-3
                ${
                  activeSection === item.text
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-50"
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span onClick={() => navigate(item.path)}>{item.text}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b flex items-center justify-between px-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-9 pr-4 py-1.5 border rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
          </div>
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="p-2 relative hover:bg-gray-50 rounded-lg"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border z-50">
                <div className="p-3">
                  <h3 className="text-sm font-semibold mb-2">Notifications</h3>
                  {notifications.length > 0 ? (
                    <div className="space-y-1">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="flex justify-between items-center p-2 hover:bg-gray-50 rounded text-sm"
                        >
                          <span className="mr-2">{notif.text}</span>
                          <button
                            onClick={() => clearNotification(notif.id)}
                            className="text-gray-500 hover:text-red-500 flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No new notifications
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
