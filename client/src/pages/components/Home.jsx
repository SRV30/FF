import { useState } from "react";
import { motion } from "framer-motion";
import BannerProduct from "./BannerProduct";
import CategoryPanel from "./CategoryPanel";
import JewelryCategory from "./JewelryCategory";
import { CircleArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const categories = [
    {
      title: "MEN",
      items: [
        {
          id: "n1",
          name: "Diamond Pendant",
          price: 999.99,
          rating: 4,
          reviews: 128,
          image:
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
        },
        {
          id: "n2",
          name: "Pearl Chain",
          price: 599.99,
          rating: 5,
          reviews: 85,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7ChUUk-mMLUSvbvTNEF7ypEq0fvkXPHrEw&s",
        },
        {
          id: "n3",
          name: "Gold Choker",
          price: 799.99,
          rating: 4,
          reviews: 92,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7ChUUk-mMLUSvbvTNEF7ypEq0fvkXPHrEw&s",
        },
        {
          id: "n4",
          name: "Crystal Necklace",
          price: 449.99,
          rating: 4,
          reviews: 76,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7ChUUk-mMLUSvbvTNEF7ypEq0fvkXPHrEw&s",
        },
        {
          id: "br1",
          name: "Tennis Bracelet",
          price: 1499.99,
          rating: 5,
          reviews: 164,
          image:
            "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
        },
      ],
    },
    {
      title: "WOMEN",
      items: [
        {
          id: "e1",
          name: "Diamond Studs",
          price: 499.99,
          rating: 5,
          reviews: 156,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7ChUUk-mMLUSvbvTNEF7ypEq0fvkXPHrEw&s",
        },
        {
          id: "e2",
          name: "Gold Hoops",
          price: 299.99,
          rating: 4,
          reviews: 94,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7ChUUk-mMLUSvbvTNEF7ypEq0fvkXPHrEw&s",
        },
        {
          id: "e3",
          name: "Pearl Drops",
          price: 249.99,
          rating: 4,
          reviews: 67,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7ChUUk-mMLUSvbvTNEF7ypEq0fvkXPHrEw&s",
        },
        {
          id: "br1",
          name: "Tennis Bracelet",
          price: 1499.99,
          rating: 5,
          reviews: 164,
          image:
            "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
        },
        {
          id: "br1",
          name: "Tennis Bracelet",
          price: 1499.99,
          rating: 5,
          reviews: 164,
          image:
            "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
        },
      ],
    },
  ];

  const handleToggleWishlist = (itemId) => {
    setWishlist((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white"
    >
      <header>
        <BannerProduct />
        <CategoryPanel />
      </header>

      <main className="container mx-auto px-4 sm:px-6 mb-6">
        {categories.map((category, index) => (
          <JewelryCategory
            key={index}
            {...category}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        ))}
      </main>

      <button
        className="flex items-center justify-center bg-yellow-500 dark:bg-red-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-yellow-400 dark:hover:bg-red-500 transition-all duration-300 transform hover:scale-105 mb-5 mx-auto"
        onClick={() => navigate("/products")}
      >
        <span className="mr-2">View More Products</span>
        <CircleArrowRightIcon className="w-6 h-6" />
      </button>
    </motion.div>
  );
};

export default Home;
