import { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart, ChevronDown, Menu, X, Sun, Moon } from "lucide-react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle Dark Mode
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

  return (
    <header className="bg-[#e6b561] dark:bg-gray-900 flex items-center justify-between px-6 py-3">
      {/* Left Section: Logo */}
      <div className="flex items-center space-x-2">
        <div className="text-red-600 text-2xl font-bold">🟠</div>
        <span className="text-black dark:text-white text-lg font-semibold">Logo</span>
      </div>

      {/* Center Section: Navigation */}
      <nav className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300 text-sm">
        <a href="#" className="text-red-600 dark:text-red-400 font-semibold border-b-2 border-red-600 dark:border-red-400">Home</a>
        <a href="#" className="hover:text-black dark:hover:text-white">Collection</a>
        <a href="#" className="hover:text-black dark:hover:text-white">About</a>
        <a href="#" className="hover:text-black dark:hover:text-white">Contact Us</a>
      </nav>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-4 text-black dark:text-white">
        <Search className="w-5 h-5 cursor-pointer" />
        <Heart className="w-5 h-5 cursor-pointer" /> {/* Wishlist Icon */}
        <ShoppingCart className="w-5 h-5 cursor-pointer" />
        <button onClick={toggleDarkMode} className="w-6 h-6">
          {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
        </button>
        <div className="relative">
          <div className="w-8 h-8 bg-red-600 text-white flex items-center justify-center rounded-full cursor-pointer">
            A
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-[#e6b561] dark:bg-gray-900 md:hidden flex flex-col items-center space-y-4 py-4 shadow-md">
          <a href="#" className="text-red-600 dark:text-red-400 font-semibold">Home</a>
          <a href="#" className="hover:text-black dark:hover:text-white">Collection</a>
          <a href="#" className="hover:text-black dark:hover:text-white">About</a>
          <a href="#" className="hover:text-black dark:hover:text-white">Contact Us</a>
        </nav>
      )}
    </header>
  );
}
