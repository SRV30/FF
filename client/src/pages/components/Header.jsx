import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="bg-yellow-500 dark:bg-gray-900 p-4 shadow-md flex justify-between items-center transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="bg-red-600 w-6 h-6 rounded-full"></div>
        <h1 className="text-xl font-bold text-black dark:text-white">Logo</h1>
      </div>

      {/* Navigation */}
      <nav className="flex space-x-6 text-gray-700 dark:text-gray-300">
        <a href="#" className="text-red-700 dark:text-red-400 font-bold border-b-2 border-red-700 dark:border-red-400">
          Home
        </a>
        <a href="#" className="hover:text-red-700 dark:hover:text-red-400">Collection</a>
        <a href="#" className="hover:text-red-700 dark:hover:text-red-400">About</a>
        <a href="#" className="hover:text-red-700 dark:hover:text-red-400">Contact Us</a>
      </nav>

      {/* Right-side Icons & Dark Mode Toggle */}
      <div className="flex items-center space-x-4 text-gray-800 dark:text-gray-300">
        <FaSearch className="cursor-pointer hover:text-red-700 dark:hover:text-red-400" />
        <div className="relative">
          <FavoriteBorderIcon />
          <span className="absolute -top-2 -right-2 bg-red-700 text-white dark:bg-red-500 text-xs rounded-full px-1">2</span>
        </div>
        <FaShoppingCart className="cursor-pointer hover:text-red-700 dark:hover:text-red-400" />

        {/* Dark Mode Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition"
        >
          {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
        </button>

        <div className="w-8 h-8 rounded-full bg-red-700 dark:bg-red-500 flex items-center justify-center text-white font-bold">
          <NavLink to="/my-profile"> A</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;

