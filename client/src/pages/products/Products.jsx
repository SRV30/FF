import { useEffect, useRef, useState } from "react";
import { Search, ShoppingCart, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useDispatch, useSelector } from "react-redux";

import {
  getProductByFilter,
  getProducts,
} from "@/store/product-slice/productSlice";
// Import addToCart action
import { Pagination } from "@mui/material";
import { toast } from "react-toastify";
import { addToCart } from "@/store/add-to-cart/addToCart";
import { addToWishList } from "@/store/add-to-wishList/addToWishList";


import { getProductByFilter } from "@/store/product-slice/productSlice";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Products = () => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("relevant");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);


  const { cartItems, loading } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product = [], totalPages } = useSelector((state) => state.product);

  const [shuffledProducts, setShuffledProducts] = useState([]);
  const hasShuffled = useRef(false);


  const handleAddCart = (item) => {
    dispatch(addToCart(item._id));
    toast.success(`Successfully added to cart!`);
  };
  const handleAddWishList = (item) => {
    dispatch(addToWishList(item._id));
    toast.success(`Successfully added to WishList!`);
  };

  const {
    product = [],
    loadingCategory,
    error,
    totalPages,
    currentPage,
  } = useSelector((state) => state.product);

  useEffect(() => {
    if (product.length > 0) {
      if (!hasShuffled.current) {
        const shuffled = [...product].sort(() => Math.random() - 0.5);
        setShuffledProducts(shuffled);
        hasShuffled.current = true;
      } else {
        setShuffledProducts(product);
      }
    }
  }, [product]);


  useEffect(() => {
    dispatch(
      getProductByFilter({
        page,
        limit: 10,
        searchQuery,
        selectedCategories,
        sortBy,
        priceRange,
      })
    );
  }, [dispatch, searchQuery, selectedCategories, sortBy, priceRange, page]);

  const handlePageChange = (value) => {
    setPage(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );

    dispatch(
      getProductByFilter({
        page: 1,
        limit: 10,
        searchQuery,
        selectedCategories: selectedCategories.includes(category)
          ? selectedCategories.filter((c) => c !== category)
          : [...selectedCategories, category],
        sortBy,
        priceRange,
      })
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-2"
          >
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ml-2 bg-transparent focus:outline-none text-black dark:text-white"
            />
            <div className="absolute pointer-events-none ml-8">
              {!searchQuery && (
                <Typewriter
                  options={{
                    strings: [
                      "Search for products...",
                      "Find your favorite items...",
                      "Explore the collection...",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                  }}
                />
              )}
            </div>
          </motion.div>
        </div>

        <div className="hidden md:flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">ALL COLLECTIONS</h2>
          <select
            className="p-2 border rounded-lg bg-white dark:bg-black"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4"
        >
          {product.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-black rounded-lg shadow overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={item.images[0]?.url}
                  alt={item.name}
                  className="w-full h-48 sm:h-56 lg:h-64 object-fit"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-2 right-2 p-2 bg-white dark:bg-black rounded-full shadow hover:bg-gray-100 transition-colors"
                  onClick={() => handleAddWishList(item)}
                >
                  <Heart className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-14 right-2 p-2 bg-white dark:bg-black rounded-full shadow hover:bg-gray-100 transition-colors"
                  onClick={() => handleAddCart(item)}
                >
                  <ShoppingCart className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">
                  {item.name}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold  bg-white dark:bg-gray-900 text-black dark:text-white">
                    ₹
                    {(
                      item.price -
                      item.price * (item.discount / 100)
                    ).toFixed(2)}
                    {item.discount > 0 && (
                      <span className="text-sm  line-through ml-2 bg-white dark:bg-gray-900 text-black dark:text-white">
                        ₹{item.price.toFixed(2)}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {product.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8 text-gray-500 dark:text-gray-100"
            >

              No products match your selected filters.
            </motion.div>
          )}
        </AnimatePresence>

        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          className="mt-6"
          color="yellow"
        />

              {shuffledProducts.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-black rounded-lg shadow overflow-hidden group hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={item.images[0]?.url}
                      alt={item.name}
                      className="w-full h-48 sm:h-56 lg:h-64 object-fit cursor-pointer"
                      onClick={() => navigate(`/product/${item._id}`)}
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-2 right-2 p-2 bg-white dark:bg-black rounded-full shadow hover:bg-gray-100 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-14 right-2 p-2 bg-white dark:bg-black rounded-full shadow hover:bg-gray-100 transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => navigate(`/product/${item._id}`)}
                  >
                    <h3 className="font-semibold mb-2 line-clamp-2 capitalize">
                      {item.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold bg-white dark:bg-gray-900 text-black dark:text-white">
                        ₹
                        {(
                          item.price -
                          item.price * (item.discount / 100)
                        ).toFixed(2)}
                        {item.discount > 0 && (
                          <span className="text-sm line-through ml-2 bg-white dark:bg-gray-900 text-black dark:text-white">
                            ₹{item.price.toFixed(2)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <AnimatePresence>
              {product.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-8 text-gray-500 dark:text-gray-100"
                >
                  No products match your selected filters.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center mt-6">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="yellow"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Products;
