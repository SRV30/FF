import React from 'react';

const ProductReviews = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
      <h1 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">Reviews for Popular Clothing And Accessories</h1>
      
      {/* Product Cards Container */}
      <div className="space-y-6">
        {/* First Product */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Product Image */}
            <div className="w-full sm:w-48 lg:w-32">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROT4e8gZhEe3K_CbQWzWYIZ8D4fOSxmALANw&s" alt="Black Trouser" className="w-full object-cover" />
            </div>
            
            {/* Product Info Container */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              {/* Product Details */}
              <div className="w-full md:w-1/3">
                {/* Title and Rating */}
                <div className="mb-1">
                  <span className="text-gray-800 dark:text-gray-100">1. COMBRAIDED Slim Fit Men Bla...</span>
                </div>
                
                {/* Rating Badge */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-green-600 text-white text-xs px-1 py-0.5 rounded flex items-center">
                    3.9 ★
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">2,66,706 Ratings & 15,141 Reviews</span>
                </div>
                
                {/* Price */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-800 dark:text-gray-100">₹299</span>
                  <span className="text-gray-500 dark:text-gray-400">80% off</span>
                </div>
                
                {/* Product Info */}
                <div className="text-gray-500 dark:text-gray-400 text-sm space-y-0.5">
                  <div>Casual/Trouser</div>
                  <div>Pack of 1</div>
                  <div>Slim Fit</div>
                </div>
              </div>
              
              {/* Reviews Grid */}
              <div className="grid md:grid-cols-2 gap-4 w-full md:w-2/3">
                {/* Most Helpful Review */}
                <div className="w-full">
                  <div className="text-gray-500 dark:text-gray-400 text-xs mb-2">Most Helpful Review</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-green-600 text-white text-xs px-1 py-0.5 rounded">4 ★</span>
                      <span className="text-gray-800 dark:text-gray-100">Value-for-money</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">At this price it's good. But in the summer time,it boils your egg 😳</p>
                    <div className="flex flex-wrap items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                      <span>Vivek Bhat</span>
                      <span className="flex items-center gap-1">
                        <span className="bg-gray-100 dark:bg-gray-700 rounded-full p-0.5">✓</span>
                        Certified Buyer
                      </span>
                      <span>12 months ago</span>
                    </div>
                  </div>
                </div>
                
                {/* Recent Review */}
                <div className="w-full">
                  <div className="text-gray-500 dark:text-gray-400 text-xs mb-2">Recent Review</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-green-600 text-white text-xs px-1 py-0.5 rounded">4 ★</span>
                      <span className="text-gray-800 dark:text-gray-100">Just wow!</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">Nice 👍 better than expectations 🌹 thank you flipkart</p>
                    <div className="flex flex-wrap items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                      <span>Puneeth Puni</span>
                      <span className="flex items-center gap-1">
                        <span className="bg-gray-100 dark:bg-gray-700 rounded-full p-0.5">✓</span>
                        Certified Buyer
                      </span>
                      <span>Today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Product - Same structure as first product */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full sm:w-48 lg:w-32">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5XanTKEYMvyNm-hHVkYEiBp9n7kevGism_A&s" alt="Paris Beauty" className="w-full object-cover" />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="w-full md:w-1/3">
                <div className="mb-1">
                  <span className="text-gray-800 dark:text-gray-100">2. Groversons Paris Beauty Pri...</span>
                </div>
                
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-green-600 text-white text-xs px-1 py-0.5 rounded flex items-center">
                    4.1 ★
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">1,351 Ratings & 59 Reviews</span>
                </div>
                
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-800 dark:text-gray-100">₹145</span>
                  <span className="text-gray-500 dark:text-gray-400">43% off</span>
                </div>
                
                <div className="text-gray-500 dark:text-gray-400 text-sm space-y-0.5">
                  <div>Pack of: 2</div>
                  <div>Type: Printed</div>
                  <div>Material: Plastic</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 w-full md:w-2/3">
                <div className="w-full">
                  <div className="text-gray-500 dark:text-gray-400 text-xs mb-2">Most Helpful Review</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded">1 ★</span>
                      <span className="text-gray-800 dark:text-gray-100">Hated it!</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">Very thin.... totally bad quality<br/>Don't buy this product<br/>Return also not available</p>
                    <div className="flex flex-wrap items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                      <span>Flipkart Customer</span>
                      <span className="flex items-center gap-1">
                        <span className="bg-gray-100 dark:bg-gray-700 rounded-full p-0.5">✓</span>
                        Certified Buyer
                      </span>
                      <span>3 months ago</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full">
                  <div className="text-gray-500 dark:text-gray-400 text-xs mb-2">Recent Review</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded">1 ★</span>
                      <span className="text-gray-800 dark:text-gray-100">Hated it!</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">Very thin.... totally bad quality<br/>Don't buy this product<br/>Return also not available</p>
                    <div className="flex flex-wrap items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
                      <span>Flipkart Customer</span>
                      <span className="flex items-center gap-1">
                        <span className="bg-gray-100 dark:bg-gray-700 rounded-full p-0.5">✓</span>
                        Certified Buyer
                      </span>
                      <span>3 months ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;