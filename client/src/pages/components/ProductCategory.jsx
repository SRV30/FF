import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/store/product-slice/productSlice";

const ProductCategory = ({ title, items, onToggleWishlist }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(5);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(3);
      } else {
        setItemsPerView(2);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerView);

  const getVisibleItems = () => {
    const startIndex = currentIndex * itemsPerView;
    const endIndex = startIndex + itemsPerView;

    return items.slice(startIndex, endIndex);
  };

  const nextItems = () => {
    console.log("Next Button Clicked");
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevItems = () => {
    console.log("Previous Button Clicked");
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="mt-12 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6 px-4"
      >
        <h2 className=" lato lg:text-4xl text-3xl font-bold text-gray-600 dark:text-red-600  m-auto">
          <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString(title).pauseFor(1000).deleteAll().start();
            }}
            options={{
              loop: true,
              delay: 150,
            }}
          />
        </h2>
      </motion.div>

      <div className="relative flex items-center px-10">
        <button
          onClick={prevItems}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 shadow-md text-black dark:text-white z-10"
          aria-label="Previous items"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="overflow-hidden flex gap-6 px-4 w-full">
          {getVisibleItems().map((item) => (
            <motion.div
              key={item._id}
              className="flex-none w-64 bg-white rounded-xl transform transition hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <img
                  src={item.images[0]?.url}
                  alt={`Buy ${item.name} at the best price`}
                  className="w-full h-40 md:h-48 lg:h-64 object-fit rounded-t-xl"
                  // onClick={() => navigate(`/products/${item.id}`)}
                  onClick={() => navigate(`/product/:id`)}
                />
                <button
                  className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md cursor-pointer"
                  onClick={() => onToggleWishlist(item.id)}
                >
                  <Heart className="w-6 h-6 hover:scale-110 transition duration-300 ease-in-out" />
                </button>
                <button
                  onClick={""}
                  className="absolute top-15 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md cursor-pointer"
                >
                  <ShoppingCart className="w-6 h-6 hover:scale-110 transition duration-300 ease-in-out" />
                </button>
              </div>
              <div
                className="p-5 bg-white dark:bg-gray-800"
                onClick={() => navigate(`/product/:id`)}
              >
                <h3 className="fugaz-one-regular font-semibold text-lg mb-2 capitalize">
                  {item.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < item.ratings
                            ? "text-yellow-400 fill-current"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-200">
                    ({item.reviews.length} reviews)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ₹{item.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={nextItems}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 shadow-md text-black dark:text-white z-10"
          aria-label="Next items"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

ProductCategory.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      reviews: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onToggleWishlist: PropTypes.func.isRequired,
};

export default ProductCategory;
