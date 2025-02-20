import { useEffect, useState } from "react";
import { Search, ShoppingCart, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useDispatch, useSelector } from "react-redux";
import { getProductByFilter } from "@/store/product-slice/productSlice";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addToWishList } from "@/store/add-to-wishList/addToWishList";
import { toast } from "react-toastify";
import categories from "./Categories";
import colors from "../extras/Colors";
import sizes from "../extras/Size";
import PropTypes from "prop-types";

const FilterSection = ({ title, items, selected, onSelect, children }) => (
  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
    <h3 className="font-semibold mb-3 text-lg text-gray-800 dark:text-gray-200">
      {title}
    </h3>
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <label className="flex items-center space-x-3 flex-1 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(item.title)}
              onChange={() => onSelect(item.title)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300 capitalize">
              {item.title}
            </span>
          </label>
          {children && children(item)}
        </div>
      ))}
    </div>
  </div>
);

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedColorOptions, setSelectedColorOptions] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedSizeOptions, setSelectedSizeOptions] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sortBy, setSortBy] = useState("relevant");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product = [], totalPages } = useSelector((state) => state.product);
  const [shuffledProducts, setShuffledProducts] = useState([]);

  const handleFilterChange = (setter, value) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const getActiveSubcategories = () => {
    const category = categories.find((c) =>
      selectedCategories.includes(c.title)
    );
    return category?.subcategories || [];
  };

  const getActiveColorOptions = () => {
    const color = colors.find((c) => selectedColors.includes(c.title));
    return color?.colorOptions || [];
  };

  const getActiveSizeOptions = () => {
    const size = sizes.find((s) => selectedSizes.includes(s.title));
    return size?.sizeOptions || [];
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(
        getProductByFilter({
          page,
          limit: 50,
          searchQuery,
          selectedCategories,
          selectedSubcategories,
          selectedColors,
          selectedColorOptions,
          selectedSizes,
          selectedSizeOptions,
          sortBy,
          priceRange,
        })
      );
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [
    dispatch,
    page,
    searchQuery,
    selectedCategories,
    selectedSubcategories,
    selectedColors,
    selectedColorOptions,
    selectedSizes,
    selectedSizeOptions,
    sortBy,
    priceRange,
  ]);

  useEffect(() => {
    if (product.length > 0) {
      setShuffledProducts([...product].sort(() => Math.random() - 0.5));
    }
  }, [product]);

  const handleAddCart = (item) => {
    navigate(`/product/${item._id}`);
    toast.info("Now you can add to cart");
  };
  const handleAddWishList = (item) => {
    dispatch(addToWishList(item._id));
    toast.success(`Successfully added to WishList!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
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
        <br />

        {/* Mobile Filters Button */}
        <div className="md:hidden mb-6 flex justify-between items-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFiltersOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 dark:bg-red-600 text-white rounded-lg cursor-pointer"
          >
            <Search className="w-4 h-4" />
            Filters
          </motion.button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filters Panel */}
          <AnimatePresence>
            {isFiltersOpen && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween" }}
                className="fixed inset-0 z-50 bg-white dark:bg-gray-800 overflow-y-auto p-4"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Filters</h2>
                  <button
                    onClick={() => setIsFiltersOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Price Filter */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <div className="px-4">
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([0, Number(e.target.value)])
                      }
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-gray-600 dark:text-gray-400 mt-2">
                      <span>₹0</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <FilterSection
                  title="Categories"
                  items={categories}
                  selected={selectedCategories}
                  onSelect={(cat) =>
                    handleFilterChange(setSelectedCategories, cat)
                  }
                />

                {getActiveSubcategories().length > 0 && (
                  <FilterSection
                    title="Subcategories"
                    items={getActiveSubcategories().map((sc) => ({
                      title: sc,
                    }))}
                    selected={selectedSubcategories}
                    onSelect={(sc) =>
                      handleFilterChange(setSelectedSubcategories, sc)
                    }
                  />
                )}

                <FilterSection
                  title="Colors"
                  items={colors}
                  selected={selectedColors}
                  onSelect={(col) => handleFilterChange(setSelectedColors, col)}
                />

                {getActiveColorOptions().length > 0 && (
                  <FilterSection
                    title="Color Options"
                    items={getActiveColorOptions().map((co) => ({ title: co }))}
                    selected={selectedColorOptions}
                    onSelect={(co) =>
                      handleFilterChange(setSelectedColorOptions, co)
                    }
                  />
                )}

                <FilterSection
                  title="Sizes"
                  items={sizes}
                  selected={selectedSizes}
                  onSelect={(sz) => handleFilterChange(setSelectedSizes, sz)}
                />

                {getActiveSizeOptions().length > 0 && (
                  <FilterSection
                    title="Size Options"
                    items={getActiveSizeOptions().map((so) => ({ title: so }))}
                    selected={selectedSizeOptions}
                    onSelect={(so) =>
                      handleFilterChange(setSelectedSizeOptions, so)
                    }
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Filters */}
          <div className="hidden md:block w-72 shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Filters</h2>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-gray-600 dark:text-gray-400 mt-2">
                    <span>₹0</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Filter Sections */}
              <FilterSection
                title="Categories"
                items={categories}
                selected={selectedCategories}
                onSelect={(cat) =>
                  handleFilterChange(setSelectedCategories, cat)
                }
              />

              {getActiveSubcategories().length > 0 && (
                <FilterSection
                  title="Subcategories"
                  items={getActiveSubcategories().map((sc) => ({ title: sc }))}
                  selected={selectedSubcategories}
                  onSelect={(sc) =>
                    handleFilterChange(setSelectedSubcategories, sc)
                  }
                />
              )}

              <FilterSection
                title="Colors"
                items={colors}
                selected={selectedColors}
                onSelect={(col) => handleFilterChange(setSelectedColors, col)}
              />

              {getActiveColorOptions().length > 0 && (
                <FilterSection
                  title="Color Options"
                  items={getActiveColorOptions().map((co) => ({ title: co }))}
                  selected={selectedColorOptions}
                  onSelect={(co) =>
                    handleFilterChange(setSelectedColorOptions, co)
                  }
                />
              )}

              <FilterSection
                title="Sizes"
                items={sizes}
                selected={selectedSizes}
                onSelect={(sz) => handleFilterChange(setSelectedSizes, sz)}
              />

              {getActiveSizeOptions().length > 0 && (
                <FilterSection
                  title="Size Options"
                  items={getActiveSizeOptions().map((so) => ({ title: so }))}
                  selected={selectedSizeOptions}
                  onSelect={(so) =>
                    handleFilterChange(setSelectedSizeOptions, so)
                  }
                />
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">All Products</h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>

            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {shuffledProducts.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden group"
                >
                  <div className="relative aspect-square">
                    <img
                      src={item.images[0]?.url}
                      alt={item.name}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => navigate(`/product/${item._id}`)}
                    />
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full shadow hover:bg-white dark:hover:bg-gray-600"
                        onClick={() => handleAddWishList(item)}
                      >
                        <Heart className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full shadow hover:bg-white dark:hover:bg-gray-600"
                        onClick={() => handleAddCart(item)}
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                          ₹
                          {(
                            item.price -
                            item.price * (item.discount / 100)
                          ).toFixed(2)}
                        </span>
                        {item.discount > 0 && (
                          <span className="text-sm line-through text-gray-500">
                            ₹{item.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 flex justify-center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                className="[&>.MuiPagination-ul]:gap-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  children: PropTypes.node,
};

FilterSection.defaultProps = {
  selected: "",
  children: null,
};

export default Products;
