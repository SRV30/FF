import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  Menu,
  X,
} from "lucide-react";
import AdminUsers from "./AdminUsers";
import { useNavigate } from "react-router-dom";
import AdminProducts from "./AdminProducts";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import AdminOrdersPage from "./AdminOrdersPage";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl shadow-lg text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
              👋 Welcome,{" "}
              <span className="bg-white text-blue-600 px-2 py-1 rounded-md shadow-sm">
                {user.name}
              </span>
            </h1>
          </motion.div>
        );

      case "Customers":
        return <AdminUsers />;
      case "Products":
        return <AdminProducts />;
      case "Orders":
        return <AdminOrdersPage />;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      <aside
        className={`fixed md:static z-30 h-full w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 md:translate-x-0 flex flex-col`}
      >
        <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 items-center justify-center flex m-auto">
            Admin Dashboard
          </h2>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {[
            { icon: LayoutDashboard, text: "Dashboard" },
            { icon: Users, text: "Customers", path: "/admin/users" },
            { icon: ShoppingBag, text: "Products" },
            { icon: Package, text: "Orders" },
          ].map((item) => (
            <button
              key={item.text}
              onClick={() => setActiveSection(item.text)}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-left space-x-3 text-gray-800 dark:text-gray-200
                ${
                  activeSection === item.text
                    ? "bg-blue-50 dark:bg-blue-800 text-blue-600 dark:text-blue-200"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span onClick={() => navigate(item.path)}>{item.text}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 md:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </header>

        <main className="flex-1 overflow-auto p-4 text-gray-900 dark:text-gray-200">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
