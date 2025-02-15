import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { createProduct } from "@/store/product-slice/AdminProduct";
import MetaData from "../extras/MetaData";

const AdminAddProduct = () => {
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
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
    color: "Solid Colors",
    coloroptions: "Red",
    size: "Standard Sizes",
    sizeoptions: "XS",
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
        productData.color &&
        productData.coloroptions &&
        productData.size &&
        productData.sizeoptions &&
        images.length > 0
    );
  }, [productData, images]);

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        color: "",
        coloroptions: "",
        size: "",
        sizeoptions: "",
        discount: "",
        stock: "",
      });
      setImages([]);
      setImagesPreview([]);
    } catch (error) {
      toast.error(error || "An error occurred while creating the product.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-5 mb-5">
      <MetaData title="Create New Product" />
      <Link to="/admin/dashboard">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6">
          Back to Dashboard
        </button>
      </Link>
      <h2 className="text-3xl font-semibold text-blue-500 mb-6">
        Create New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            required
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            required
            placeholder="Enter product price"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description/ProductId
          </label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            required
            placeholder="Enter product description"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
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
            className="block text-sm font-medium text-gray-700"
          >
            SubCategory
          </label>
          <select
            id="subcategory"
            name="subcategory"
            value={productData.subcategory}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
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
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Colors
          </label>
          <select
            id="colors"
            name="color"
            value={productData.color}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            required
          >
            <option value="" disabled>
              Select Color
            </option>
            {colors.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Color Options
          </label>
          <select
            id="colorOptions"
            name="colorOptions"
            value={productData.coloroptions}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            required
          >
            <option value="" disabled>
              Select Color Options
            </option>
            {colorOptionss.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="size"
            className="block text-sm font-medium text-gray-700"
          >
            Size
          </label>
          <select
            id="size"
            name="size"
            value={productData.size}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            required
          >
            <option value="" disabled>
              Select Size
            </option>
            {sizes.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="sizeOptions"
            className="block text-sm font-medium text-gray-700"
          >
            Size Options
          </label>
          <select
            id="sizeOptions"
            name="sizeOptions"
            value={productData.sizeoptions}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            required
          >
            <option value="" disabled>
              Select Size Option
            </option>
            {sizeOptionss.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Stock Quantity
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            required
            placeholder="Enter the product quantity"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="discount"
            className="block text-sm font-medium text-gray-700"
          >
            Discount
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={productData.discount}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            placeholder="Enter the product discount"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Product Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleImageChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            accept="image/*"
            required
          />
        </div>

        <div className="flex gap-4 mb-6">
          {imagesPreview.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Preview ${index}`}
              className="w-24 h-24 object-cover rounded-lg shadow-md"
            />
          ))}
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
