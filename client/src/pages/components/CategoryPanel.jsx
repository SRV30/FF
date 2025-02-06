import { motion } from "framer-motion";

const CategoryPanel = () => {
  const categories = ["MENS", "WOMENS", "KIDS", "VIEW MORE PRODUCTS"];

  return (
    <div className="flex flex-wrap justify-center  border-b border-gray-300 dark:border-gray-400 text-black dark:text-white mt-6 px-4 py-3 gap-10  mx-5 md:mx-36">
      {categories.map((category, index) => (
        <motion.div
          key={category}
          className="relative flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-md shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-600"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          aria-label={`Category: ${category}`}
        >
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            {category}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryPanel;
