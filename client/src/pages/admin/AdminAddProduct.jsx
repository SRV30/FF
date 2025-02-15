import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { createProduct } from "@/store/product-slice/AdminProduct";
import MetaData from "../extras/MetaData";
import { XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminAddProduct = () => {
  const [images, setImages] = useState(Array(5).fill(null));
  const [imagesPreview, setImagesPreview] = useState(Array(5).fill(null));
  const [isFormValid, setIsFormValid] = useState(false);

  const categories = [
    "MEN",
    "WOMEN",
    "KIDS",
    "CLOTHING",
    "FOOTWEAR",
    "SEASONAL WEAR",
    "SPECIAL CATEGORIES",
  ];

  const subcategories = [
    "T-Shirts & Polos",
    "Shirts",
    "Hoodies & Sweatshirts",
    "Jackets & Coats",
    "Sweaters & Cardigans",
    "Pants & Trousers",
    "Jeans",
    "Shorts",
    "Ethnic Wear (Kurtas, Sarees, Lehengas, etc.)",
    "Innerwear & Loungewear",
    "Activewear",
    "Winter Wear (Thermals, Woolen Caps, Gloves, etc.)",
    "Summer Wear (Cotton Clothes, Sleeveless Tops, etc.)",
    "Rainwear (Raincoats, Waterproof Shoes)",
    "Party Wear",
    "Office/Formal Wear",
    "Streetwear",
    "Sportswear",
    "Luxury/Fashion Brands",
    "Sneakers",
    "Formal Shoes",
    "Casual Shoes",
    "Sandals & Slippers",
    "Boots",
    "Sports Shoes",
  ];

  const colors = [
    "Solid Colors",
    "Gradient Colors",
    "Patterned Colors",
    "Multi-Colored",
    "Customizable Colors",
    "Textured Colors",
    "Limited Edition Colors",
    "Neon Colors",
    "Neutral & Earthy Tones",
  ];

  const colorOptionss = [
    "Red",
    "Blue",
    "Green",
    "Black",
    "White",
    "Yellow",
    "Purple",
    "Pink",
    "Orange",
    "Rainbow",
    "Color Block (Red, Blue, Green)",
    "Neon Mix (Neon Green, Pink)",
    "Beige",
    "Grey",
    "Brown",
    "Olive",
    "Cream",
  ];

  const sizes = [
    "Standard Sizes",
    "Kids Sizes",
    "Footwear Sizes",
    "Plus Sizes",
    "Custom Sizes",
    "Tall & Petite Sizes",
    "Swimwear Sizes",
    "Sleepwear Sizes",
    "Maternity Sizes",
  ];

  const sizeOptionss = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL"];

  const [productData, setProductData] = useState({
    name: "",
    category: "MEN",
    subcategory: "T-Shirts & Polos",
    color: [],
    coloroptions: [],
    size: [],
    sizeoptions: [],
    stock: 0,
    price: 0,
    discount: 0,
    description: "",
  });

  const { loading } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFormValid(
      productData.name &&
        productData.description &&
        productData.price &&
        productData.stock >= 0 &&
        productData.category &&
        productData.subcategory &&
        productData.color?.length > 0 &&
        productData.coloroptions?.length > 0 &&
        productData.size?.length > 0 &&
        productData.sizeoptions?.length > 0 &&
        images.some((img) => img !== null)
    );
  }, [productData, images]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProductData((prevData) => {
      if (type === "checkbox") {
        return {
          ...prevData,
          [name]: checked
            ? [...(prevData[name] || []), value]
            : prevData[name].filter((item) => item !== value),
        };
      } else if (type === "select-multiple") {
        return {
          ...prevData,
          [name]: Array.from(
            e.target.selectedOptions,
            (option) => option.value
          ),
        };
      } else {
        return { ...prevData, [name]: value };
      }
    });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        const newPreview = [...imagesPreview];
        newPreview[index] = reader.result;
        setImagesPreview(newPreview);

        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageDelete = (index) => {
    const newImages = [...imagesPreview];
    newImages[index] = null;
    setImagesPreview(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.every((img) => img === null)) {
      toast.error("Please upload at least one product image");
      return;
    }

    if (
      !productData.name ||
      !productData.description ||
      !productData.price ||
      !images.length
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = { ...productData, images };

    try {
      await dispatch(createProduct(formData)).unwrap();
      toast.success("Product created successfully!");
      setProductData({
        name: "",
        price: "",
        description: "",
        category: "",
        subcategory: "",
        color: [],
        coloroptions: [],
        size: [],
        sizeoptions: [],
        discount: "",
        stock: "",
      });

      setImages(Array(5).fill(null));
      setImagesPreview(Array(5).fill(null));
    } catch (error) {
      toast.error(error || "An error occurred while creating the product.");
    }
  };

  const toggleOption = (field, option) => {
    setProductData((prevData) => {
      if (prevData[field].includes(option)) {
        return {
          ...prevData,
          [field]: prevData[field].filter((item) => item !== option),
        };
      } else {
        return {
          ...prevData,
          [field]: [...prevData[field], option],
        };
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-900 shadow-lg rounded-xl mt-5 mb-5">
      <MetaData title="Create New Product" />
      <Link to="/admin/dashboard">
        <button className="bg-yellow-500 dark:bg-red-600 text-white px-4 py-2 rounded-lg mb-6">
          Back to Dashboard
        </button>
      </Link>
      <h2 className="text-3xl font-semibold text-yellow-500 dark:text-red-500 mb-6">
        Create New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-500 transition ease-in-out duration-200"
            required
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-500 transition ease-in-out duration-200"
            required
            placeholder="Enter product price"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Description/ProductId
          </label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-500 transition ease-in-out duration-200"
            required
            placeholder="Enter product description"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-500 transition ease-in-out duration-200"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            SubCategory
          </label>
          <select
            id="subcategory"
            name="subcategory"
            value={productData.subcategory}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-500 transition ease-in-out duration-200"
            required
          >
            <option value="" disabled>
              Select SubCategory
            </option>
            {subcategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Colors
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {colors.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => toggleOption("color", category)}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 
            ${
              productData.color.includes(category)
                ? "bg-yellow-600 text-white border-yellow-600"
                : "bg-white text-gray-700 dark:bg-gray-800 dark:text-white border-gray-300"
            }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
            Selected: {productData.color.join(", ")}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Color Options
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {colorOptionss.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => toggleOption("coloroptions", option)}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  productData.coloroptions.includes(option)
                    ? "bg-yellow-600 text-white border-yellow-600"
                    : "bg-white text-gray-700 dark:bg-gray-800 dark:text-white border-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
            Selected: {productData.coloroptions.join(", ")}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Size
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {sizes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => toggleOption("size", option)}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  productData.size.includes(option)
                    ? "bg-yellow-600 text-white border-yellow-600"
                    : "bg-white text-gray-700 dark:bg-gray-800 dark:text-white border-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
            Selected: {productData.size.join(", ")}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Size Options
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {sizeOptionss.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => toggleOption("sizeoptions", option)}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  productData.sizeoptions.includes(option)
                    ? "bg-yellow-600 text-white border-yellow-600"
                    : "bg-white text-gray-700 dark:bg-gray-800 dark:text-white border-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
            Selected: {productData.sizeoptions.join(", ")}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Stock Quantity
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-500 transition ease-in-out duration-200"
            required
            placeholder="Enter the product quantity"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="discount"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Discount
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={productData.discount}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-500 transition ease-in-out duration-200"
            placeholder="Enter the product discount"
          />
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
          <label className="block text-lg font-semibold text-gray-800 dark:text-white">
            Upload Product Images
          </label>

          {[0, 1, 2, 3, 4].map((index) => (
            <div key={index} className="mt-3 flex flex-col items-center">
              <input
                type="file"
                onChange={(e) => handleImageChange(e, index)}
                className="block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-500 transition duration-200 file:cursor-pointer file:px-4 file:py-2 file:rounded-md file:border-none file:bg-yellow-500 file:text-white file:font-semibold hover:file:bg-yellow-600"
                accept="image/*"
                {...(index === 0 ? { required: true } : {})}
              />

              <AnimatePresence>
                {imagesPreview[index] && (
                  <motion.div
                    className="relative mt-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={imagesPreview[index]}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover rounded-lg shadow-md border border-gray-300"
                    />
                    <button
                      onClick={() => handleImageDelete(index)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow-md hover:bg-red-700 transition duration-200"
                    >
                      <XCircle size={18} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Preview Grid */}
          <div className="flex gap-4 mt-6 flex-wrap justify-center">
            <AnimatePresence>
              {imagesPreview.map(
                (image, index) =>
                  image && (
                    <motion.div
                      key={index}
                      className="relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={image}
                        alt={`Preview ${index}`}
                        className="w-24 h-24 object-cover rounded-lg shadow-md border border-gray-300"
                      />
                      <button
                        onClick={() => handleImageDelete(index)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow-md hover:bg-red-700 transition duration-200"
                      >
                        <XCircle size={18} />
                      </button>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 transition ease-in-out duration-200 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
