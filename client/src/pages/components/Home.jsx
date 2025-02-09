import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BannerProduct from "./BannerProduct";
import CategoryPanel from "./CategoryPanel";
import ProductCategory from "./ProductCategory.jsx";
import { CircleArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ContactUs from "./ContactUs";
import MetaData from "../extras/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/store/product-slice/productSlice";
import { addToCart } from "@/store/add-to-cart/addToCart";

const Home = () => {
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {
    product = [],
    loadingCategory,
    error,
  } = useSelector((state) => state.product);
 const handleAddCart = (item) => {
    dispatch(addToCart(item._id));
    toast.success(`Successfully added to cart!`);
  };

  const { product = [] } = useSelector((state) => state.product);


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const categorizedProducts = product.reduce((acc, item) => {
    if (!acc[item.gender]) {
      acc[item.gender] = [];
    }
    acc[item.gender].push(item);
    return acc;
  }, {});

  const categories = Object.keys(categorizedProducts).map((category) => ({
    title: category.toUpperCase(),
    items: categorizedProducts[category],
  }));

  // Shuffle function to randomize the categories array
  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const shuffledCategories = shuffleArray(categories); // Get shuffled categories

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
        <MetaData title="Home | Faith AND Fast" />
        <BannerProduct />
        <CategoryPanel />
      </header>

      <main className="container mx-auto px-4 sm:px-6 mb-6">
        {shuffledCategories.length > 0 ? (
          shuffledCategories.map((category, index) => (
            <ProductCategory
              key={index}
              {...category}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />
          ))
        ) : (
          <p className="text-center text-lg text-gray-500 dark:text-gray-300">
            No products available.
          </p>
        )}
      </main>

      <button
        className="flex items-center justify-center bg-yellow-500 dark:bg-red-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-yellow-400 dark:hover:bg-red-500 transition-all duration-300 transform hover:scale-105 mb-5 mx-auto"
        onClick={() => navigate("/products")}
      >
        <span className="mr-2">View More Products</span>
        <CircleArrowRightIcon className="w-6 h-6" />
      </button>

      <ContactUs />
    </motion.div>
  );
};

export default Home;
