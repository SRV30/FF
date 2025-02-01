import React from 'react'
import  { useState } from 'react';
import { Search, ShoppingCart, User, X } from 'lucide-react';
const Header = () => {  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div> <header className="bg-amber-200 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-xl font-bold">Logo</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-red-600">Home</a>
            <a href="#" className="text-red-600">Collection</a>
            <a href="#" className="hover:text-red-600">About</a>
            <a href="#" className="hover:text-red-600">Contact Us</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5" />
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                2
              </span>
            </div>
            <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto p-4">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 pl-4 pr-10 rounded-lg border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchQuery('')}
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </div>
</div>
  )
}

export default Header