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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
    

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 shrink-0">
            <div className="bg-white p-4 rounded-lg shadow sticky top-4">
              <h2 className="font-bold text-lg mb-4">FILTERS</h2>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Categories</h3>
                <div className="space-y-2">
                  {['men', 'women', 'kids'].map(category => (
                    <label key={category} className="flex items-center space-x-2">
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

              {/* Type */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Type</h3>
                <div className="space-y-2">
                  {['topwear', 'bottomwear', 'winterwear'].map(type => (
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
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-6">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600">${product.price}</p>
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