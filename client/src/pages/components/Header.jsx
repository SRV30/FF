import { useState, useEffect } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  User,
} from "lucide-react";
import { useLocation } from "react-router-dom"; // Import useLocation to check the current route

// Import the logo images from the assets folder
import logoLight from "../../assets/logo-light.png"; // Adjust the path as needed
import logoDark from "../../assets/logo-dark.png"; // Adjust the path as needed

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownTimeoutId, setDropdownTimeoutId] = useState(null); // Store the timeout ID
  const location = useLocation(); // Get the current route location

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Function to check if the current route matches the navigation link
  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  // Function to handle dropdown open/close
  const handleDropdownToggle = () => {
    if (dropdownOpen) {
      // If dropdown is already open, close it and clear the timeout
      setDropdownOpen(false);
      if (dropdownTimeoutId) {
        clearTimeout(dropdownTimeoutId);
        setDropdownTimeoutId(null);
      }
    } else {
      // If dropdown is closed, open it and set a timeout to close it after 15 seconds
      setDropdownOpen(true);
      const timeoutId = setTimeout(() => {
        setDropdownOpen(false);
        setDropdownTimeoutId(null);
      }, 5000); // 5 seconds
      setDropdownTimeoutId(timeoutId);
    }
  };

  return (
    <header className="bg-yellow-500 dark:bg-gray-900 flex items-center justify-between px-6 py-3 sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <a href="/">
          {/* Use the imported logo images */}
          <img
            src={darkMode ? logoLight : logoLight}
            alt="Logo"
            className="h-10"
          />
        </a>
      </div>

      <nav className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300 text-sm font-bold">
        <a
          href="/"
          className={`${
            isActiveRoute("/")
              ? "text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400"
              : "hover:text-red-600 dark:hover:text-white"
          }`}
        >
          Home
        </a>
        <a
          href="/products"
          className={`${
            isActiveRoute("/products")
              ? "text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400"
              : "hover:text-red-600 dark:hover:text-white"
          }`}
        >
          Collection
        </a>
        <a
          href="/About"
          className={`${
            isActiveRoute("/About")
              ? "text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400"
              : "hover:text-red-600 dark:hover:text-white"
          }`}
        >
          About
        </a>
        <a
          href="/ContactUs"
          className={`${
            isActiveRoute("/ContactUs")
              ? "text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400"
              : "hover:text-red-600 dark:hover:text-white"
          }`}
        >
          Contact Us
        </a>
      </nav>

      <div className="flex items-center space-x-4 text-black dark:text-white">
        <a href="/search">
          <Search className="w-5 h-5 cursor-pointer" /> {/* Added Search Icon */}
        </a>
        <a href="/wishlist">
          <Heart className="w-5 h-5 cursor-pointer" />
        </a>
        <a href="/Cart">
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
        </a>
        
        <button onClick={toggleDarkMode} className="w-6 h-6">
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={handleDropdownToggle} // Use the new handler
            className="w-8 h-8 bg-red-600 text-white flex items-center justify-center rounded-full"
          >
            <User className="w-5 h-5" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-md py-2">
              <a
                href="/update-profile"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Edit Profile
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Settings & Privacy
              </a>
              <a
                href="/support"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Help & Support
              </a>
              <a
                href="/display"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Display & Accessibility
              </a>
              <a
                href="/logout"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </a>
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-[#e6b561] dark:bg-gray-900 md:hidden flex flex-col items-center space-y-4 py-4 shadow-md font-bold">
          <a
            href="/"
            className={`${
              isActiveRoute("/")
                ? "text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400"
                : "hover:text-red-600 dark:hover:text-white"
            }`}
          >
            Home
          </a>
          <a
            href="/products"
            className={`${
              isActiveRoute("/products")
                ? "text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400"
                : "hover:text-red-600 dark:hover:text-white"
            }`}
          >
            Collection
          </a>
          <a
            href="/About"
            className={`${
              isActiveRoute("/About")
                ? "text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400"
                : "hover:text-red-600 dark:hover:text-white"
            }`}
          >
            About
          </a>
          <a
            href="/ContactUs"
            className={`${
              isActiveRoute("/ContactUs")
                ? "text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400"
                : "hover:text-red-600 dark:hover:text-white"
            }`}
          >
            Contact Us
          </a>
        </nav>
      )}
    </header>
  );
}