import React, { useState } from "react";
import { Trash2, ShoppingCart } from "lucide-react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 29.99,
      image: "/api/placeholder/160/200",
      description: "100% Cotton casual fit t-shirt",
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: 89.99,
      image: "/api/placeholder/160/200",
      description: "Vintage wash denim jacket",
    },
    {
      id: 3,
      name: "Black Jeans",
      price: 59.99,
      image: "/api/placeholder/160/200",
      description: "Slim fit stretch denim jeans",
    },
  ]);

  const [cartItems, setCartItems] = useState([]);

  const removeFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    removeFromWishlist(item.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Your wishlist is empty
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-2">
                <div className="mb-2 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-40 h-48 object-cover mx-auto"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {item.description}
                  </p>
                  <div className="text-sm font-bold mb-2">${item.price}</div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 bg-blue-600 text-white px-2 py-3 rounded text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-3 py-1.5 rounded text-sm shadow-lg">
          {cartItems.length} item(s) added to cart
        </div>
      )}
    </div>
  );
};

export default Wishlist;
