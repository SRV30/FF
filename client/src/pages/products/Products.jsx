import React, { useState } from 'react';
import { Search, ShoppingCart, User, X } from 'lucide-react';

const Products = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState('relevant');
  
  const products = [
    { id: 1, name: 'Kid Tapered Slim Fit Trouser', price: 38, category: 'kids', type: 'bottomwear', image: '/api/placeholder/300/400' },
    { id: 2, name: 'Men Round Neck Pure Cotton T-shirt', price: 64, category: 'men', type: 'topwear', image: '/api/placeholder/300/400' },
    { id: 3, name: 'Boy Round Neck Pure Cotton T-shirt', price: 60, category: 'kids', type: 'topwear', image: '/api/placeholder/300/400' },
    { id: 4, name: 'Women Zip-Front Relaxed Fit Jacket', price: 74, category: 'women', type: 'winterwear', image: '/api/placeholder/300/400' },
    { id: 5, name: 'Men Slim Fit Jeans', price: 45, category: 'men', type: 'bottomwear', image: '/api/placeholder/300/400' },
    { id: 6, name: 'Women Cotton Sweater', price: 55, category: 'women', type: 'winterwear', image: '/api/placeholder/300/400' },
    { id: 7, name: 'Kids Winter Jacket', price: 80, category: 'kids', type: 'winterwear', image: '/api/placeholder/300/400' },
    { id: 8, name: 'Women Summer Dress', price: 42, category: 'women', type: 'topwear', image: '/api/placeholder/300/400' }
  ];

  // Handle category changes
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // Handle type changes
  const handleTypeChange = (type) => {
    setSelectedTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  // Filter products based on all criteria
  let filteredProducts = products.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
    
    return matchesPrice && matchesSearch && matchesCategory && matchesType;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      default:
        return 0; // Keep original order for 'relevant'
    }
  });

  return (
    <div className="min-h-screen  bg-white text-black dark:bg-gray-900 dark:text-white">
      {/* Header */}
    

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8  bg-white text-black dark:bg-gray-900 dark:text-white">
        <div className="flex flex-row gap-8  bg-white text-black dark:bg-gray-900 dark:text-white">
          {/* Filters Sidebar */}
          <div className="w-64 shrink-0">
            <div className="bg-white p-4 rounded-lg shadow sticky top-4   text-black dark:bg-gray-900 dark:text-white">
              <h2 className="font-bold text-lg mb-4  bg-white text-black dark:bg-gray-900 dark:text-white">FILTERS</h2>
              
              {/* Price Range Filter */}
              <div className="mb-6  bg-white text-black dark:bg-gray-900 dark:text-white">
                <h3 className="font-semibold mb-2  bg-white text-black dark:bg-gray-900 dark:text-white">Price Range</h3>
                <div className="space-y-2  bg-white text-black dark:bg-gray-900 dark:text-white">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full  bg-white text-black dark:bg-gray-900 dark:text-white"
                  />
                  <div className="flex justify-between text-sm   bg-white text-black dark:bg-gray-900 dark:text-white">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6  bg-white text-black dark:bg-gray-900 dark:text-white">
                <h3 className="font-semibold mb-2  bg-white text-black dark:bg-gray-900 dark:text-white">Categories</h3>
                <div className="space-y-2  bg-white text-black dark:bg-gray-900 dark:text-white">
                  {['men', 'women', 'kids'].map(category => (
                    <label key={category} className="flex items-center space-x-2  bg-white text-black dark:bg-gray-900 dark:text-white">
                      <input 
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="rounded  bg-white text-black dark:bg-gray-900 dark:text-white"
                      />
                      <span className="capitalize  bg-white text-black dark:bg-gray-900 dark:text-white">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div className="mb-6  bg-white text-black dark:bg-gray-900 dark:text-white">
                <h3 className="font-semibold mb-2  bg-white text-black dark:bg-gray-900 dark:text-white">Type</h3>
                <div className="space-y-2 bg bg-white text-black dark:bg-gray-900 dark:text-white">
                  {['topwear', 'bottomwear', 'winterwear'].map(type => (
                    <label key={type} className="flex items-center space-x-2  bg-white text-black dark:bg-gray-900 dark:text-white">
                      <input 
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className="rounded  bg-white text-black dark:bg-gray-900 dark:text-white"
                      />
                      <span className="capitalize  bg-white text-black dark:bg-gray-900 dark:text-white">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1 min-w-0 bg-white text-black dark:bg-gray-900 dark:text-white">
            <div className="flex justify-between items-center mb-6 bg-white text-black dark:bg-gray-900 dark:text-white">
              <h2 className="text-xl font-semibold bg-white text-black dark:bg-gray-900 dark:text-white">ALL COLLECTIONS</h2>
              <select 
                className="p-2 border rounded-lg  bg-white text-black dark:bg-gray-900 dark:text-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevant bg-white text-black dark:bg-gray-900 dark:text-white">Sort by: Relevant</option>
                <option value="price-low-high bg-white text-black dark:bg-gray-900 dark:text-white">Price: Low to High</option>
                <option value="price-high-low bg-white text-black dark:bg-gray-900 dark:text-white">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white text-black dark:bg-gray-900 dark:text-white">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden  text-black dark:bg-gray-900 dark:text-white">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover bg-white text-black dark:bg-gray-900 dark:text-white"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 bg-white text-black dark:bg-gray-900 dark:text-white">{product.name}</h3>
                    <p className=" bg-white text-black dark:bg-gray-900 dark:text-white">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-8  bg-white text-black dark:bg-gray-900 dark:text-white">
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