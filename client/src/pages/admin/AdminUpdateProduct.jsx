import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { updateProduct } from "@/store/product-slice/AdminProduct";
import { getProductDetails } from "@/store/product-slice/productDetails";

const ProductUpdatePage = () => {
  // Get productId from URL params
  const { id: productId } = useParams();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await dispatch(getProductDetails(productId)).unwrap();
        console.log("Fetched Product Data:", response); // Debugging
        setProductData({
          name: response.name || "",
          description: response.description || "",
          price: response.price || "",
          images: response.images || [],
        });
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [dispatch, productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProductData({ ...productData, images: e.target.files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData instance
    const formData = new FormData();

    // Loop through productData keys and append to formData
    Object.keys(productData).forEach((key) => {
      if (key === "images") {
        // If there are images, append each file to FormData
        if (productData.images && productData.images.length > 0) {
          Array.from(productData.images).forEach((file) =>
            formData.append("images", file)
          );
        }
      } else {
        formData.append(key, productData[key]);
      }
    });

    // Dispatch the updateProduct thunk with the FormData payload
    dispatch(updateProduct({ id: productId, productData: formData }))
      .then(() => navigate(`/admin/dashboard`))
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Update Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 dark:text-gray-300"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-gray-700 dark:text-gray-300"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label
            htmlFor="images"
            className="block text-gray-700 dark:text-gray-300"
          >
            Product Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleImageChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="flex justify-center">
          <motion.button
            type="submit"
            className="px-6 py-3 mt-6 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-800 dark:hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Update Product
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProductUpdatePage;
