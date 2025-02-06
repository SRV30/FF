import React, { useState } from "react";
import { Search, ShoppingCart, User, X, Heart } from "lucide-react";

const Products = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState("relevant");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Kid Tapered Slim Fit Trouser",
      price: 38,
      category: "kids",
      type: "bottomwear",
      image: "/api/placeholder/300/400",
    },
    {
      id: 2,
      name: "Men Round Neck Pure Cotton T-shirt",
      price: 64,
      category: "men",
      type: "topwear",
      image: "/api/placeholder/300/400",
    },
    {
      id: 3,
      name: "Boy Round Neck Pure Cotton T-shirt",
      price: 60,
      category: "kids",
      type: "topwear",
      image: "/api/placeholder/300/400",
    },
    {
      id: 4,
      name: "Women Zip-Front Relaxed Fit Jacket",
      price: 74,
      category: "women",
      type: "winterwear",
      image: "/api/placeholder/300/400",
    },
    {
      id: 5,
      name: "Men Slim Fit Jeans",
      price: 45,
      category: "men",
      type: "bottomwear",
      image: "/api/placeholder/300/400",
    },
    {
      id: 6,
      name: "Women Cotton Sweater",
      price: 55,
      category: "women",
      type: "winterwear",
      image: "/api/placeholder/300/400",
    },
    {
      id: 7,
      name: "Kids Winter Jacket",
      price: 80,
      category: "kids",
      type: "winterwear",
      image: "/api/placeholder/300/400",
    },
    {
      id: 8,
      name: "Women Summer Dress",
      price: 42,
      category: "women",
      type: "topwear",
      image: "/api/placeholder/300/400",
    },
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const addToCart = (productId) => {
    setCart((prev) => [...prev, productId]);
  };

  let filteredProducts = products.filter((product) => {
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(product.type);

    return matchesPrice && matchesSearch && matchesCategory && matchesType;
  });

  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filters Toggle */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Filters
          </button>
          <select
            className="p-2 border rounded-lg bg-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`${
              isFiltersOpen
                ? "fixed inset-0 z-50 bg-white overflow-y-auto"
                : "hidden"
            } md:block md:static md:z-auto md:w-64 md:shrink-0`}
          >
            <div className="bg-white p-4 rounded-lg shadow md:sticky md:top-4">
              {/* Mobile Filter Header */}
              <div className="flex justify-between items-center mb-4 md:hidden">
                <h2 className="font-bold text-lg">Filters</h2>
                <button onClick={() => setIsFiltersOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Desktop Filter Header */}
              <div className="hidden md:block mb-4">
                <h2 className="font-bold text-lg">FILTERS</h2>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Categories</h3>
                <div className="space-y-2">
                  {["men", "women", "kids"].map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="rounded"
                      />
                      <span className="capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Type</h3>
                <div className="space-y-2">
                  {["topwear", "bottomwear", "winterwear"].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className="rounded"
                      />
                      <span className="capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Apply Filters Button */}
              <div className="mt-6 md:hidden">
                <button
                  onClick={() => setIsFiltersOpen(false)}
                  className="w-full py-2 bg-black text-white rounded-lg"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1 min-w-0">
            {/* Desktop Sort */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">ALL COLLECTIONS</h2>
              <select
                className="p-2 border rounded-lg bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          wishlist.includes(product.id)
                            ? "fill-red-500 stroke-red-500"
                            : "stroke-gray-600"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600">${product.price}</p>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="hidden sm:inline">Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No products match your selected filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
