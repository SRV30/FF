import { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart, Menu, X, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice/user";
import { toast } from "react-toastify";
import DarkModeToggle from "../extras/DarkModeToggle";
import logoLight from "../../assets/logo-light.png";
import logo from "../../assets/logoLight.png";
import PropTypes from "prop-types";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const isActiveRoute = (route) => location.pathname === route;

  return (
    <header className="header bg-yellow-500 dark:bg-gray-900 flex items-center justify-between px-6 py-3 sticky top-0 z-50 shadow-md transition-all duration-300">
      <div className="flex items-center">
        <a href="/" className="hover:opacity-80 transition-opacity">
          <img
            src={darkMode ? logo : logoLight}
            alt="Faith AND Fast Logo"
            className="h-12 w-auto"
          />
        </a>
      </div>

      <nav className="hidden md:flex space-x-6 lg:space-x-10 font-semibold text-gray-700 dark:text-gray-300 lg:ml-50">
        {["/", "/products", "/about", "/contactus"].map((path, index) => {
          const label =
            path === "/"
              ? "Home"
              : path === "/products"
              ? "Products"
              : path === "/about"
              ? "About"
              : path === "/contactus"
              ? "Contact Us"
              : "";

          return (
            <a
              key={index}
              href={path}
              className={`relative group px-3 py-2 rounded-lg transition-all duration-300 ${
                isActiveRoute(path)
                  ? "text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400"
                  : "hover:text-red-600 dark:hover:text-white"
              }`}
            >
              {label}
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-600 dark:bg-red-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
          );
        })}
      </nav>

      <div className="flex items-center space-x-4 text-black dark:text-white">
        <a href="/products">
          <Search className="w-6 h-6 cursor-pointer hover:text-red-600 transition-colors" />
        </a>

        <a href="/wishlist">
          <Heart className="w-6 h-6 cursor-pointer hover:text-red-600 transition-colors" />
        </a>

        <a href="/cart">
          <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-red-600 transition-colors" />
        </a>

        <div onClick={toggleDarkMode} className="cursor-pointer text-white">
          <DarkModeToggle />
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 bg-red-600 text-white flex items-center justify-center rounded-full hover:scale-110 transition-transform"
          >
            <User className="w-5 h-5" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50 dropdown-content">
              {isAuthenticated ? (
                <>
                  {user.role === "ADMIN" && (
                    <DropdownLink
                      href="/admin/dashboard"
                      text="Admin Dashboard"
                    />
                  )}
                  <DropdownLink href="/my-profile" text="My Profile" />
                  <DropdownLink href="/my-orders" text="My Orders" />
                  <DropdownLink
                    href="/update-password"
                    text="Update Password"
                  />
                  <DropdownLink href="/update-profile" text="Edit Profile" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-gray-300 dark:border-gray-700 transition-all duration-200 ease-in-out"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <DropdownLink href="/login" text="Login" />
                  <DropdownLink href="/signup" text="Signup" />
                </>
              )}
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-yellow-500 dark:bg-gray-900 md:hidden flex flex-col items-center space-y-4 py-4 shadow-lg">
          {["/", "/products", "/about", "/contactus"].map((path, index) => {
            const label =
              path === "/"
                ? "Home"
                : path === "/products"
                ? "Products"
                : path === "/about"
                ? "About"
                : path === "/contactus"
                ? "Contact Us"
                : "";

            return (
              <a
                key={index}
                href={path}
                className={`text-lg font-bold transition-transform ${
                  isActiveRoute(path)
                    ? "text-red-600 dark:text-red-400"
                    : "hover:text-red-600 dark:hover:text-white"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}

const DropdownLink = ({ href, text }) => (
  <a
    href={href}
    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
  >
    {text}
  </a>
);

DropdownLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
