import React, { useEffect, useState } from "react";
import { Trash2, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishListItem, getWishListItems } from "@/store/add-to-wishList/addToWishList";

import { toast } from "react-toastify";
import { addToCart } from "@/store/add-to-cart/addToCart";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { WishListItems, loading, error } = useSelector((state) => state.wishList);

  useEffect(() => {
    dispatch(getWishListItems());
  }, [dispatch]);

  const removeFromWishlist = (itemId) => {
    dispatch(deleteWishListItem(itemId));
  };

  const handleAddCart = (item) => {
    dispatch(addToCart(item.productId));
    dispatch(deleteWishListItem(item._id));
    toast.success("Successfully added to cart!");
  };

  if (loading) {
    return <div className="text-center text-gray-500 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      {WishListItems.length === 0 ? (
        <div className="text-center text-gray-500 py-8">Your wishlist is empty</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {WishListItems.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-2">
                <div className="mb-2 relative">
                  <img
                    src={item.productId.images[0]?.url}
                    alt={item.productId.name}
                    className="w-40 h-48 object-cover mx-auto"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium mb-1">{item.productId.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{item.productId.description}</p>
                  <div className="text-sm font-bold mb-2">
                    <p className="text-gray-500">₹{item.productId.price.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleAddCart(item)}
                      className="flex-1 bg-blue-600 text-white px-2 py-3 rounded text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item._id)}
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
    </div>
  );
};

export default Wishlist;