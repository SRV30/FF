import { useState } from "react";
import BannerProduct from "./BannerProduct";
import {
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";

const JewelryCategory = ({ title, items, onToggleWishlist, wishlist }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 2;
  const totalPages = Math.ceil(items.length / itemsPerView);

  const nextItems = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevItems = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4 px-4 ">
        <h2 className="text-2xl font-semibold text-black dark:text-yellow-400">
          {title}
        </h2>
      </div>

      <div className="hidden sm:flex overflow-x-auto gap-4 px-4 pb-4 ">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-none w-64 bg-white rounded-lg shadow-md "
          >
            <div className="relative ">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm"
                onClick={() => onToggleWishlist(item.id)}
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlist.includes(item.id)
                      ? "text-red-500 fill-current"
                      : "text-gray-600"
                  }`}
                />
              </button>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800">
              <h3 className="font-medium text-lg mb-2">{item.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex ">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-100"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  ({item.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">₹{item.price}</span>
                <button
                  onClick={() => alert(`Added ${item.name} to cart!`)}
                  className="bg-red-400 text-white px-2 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sm:hidden relative px-4">
        <div className="relative overflow-hidden">
          <div
            className="flex gap-3 transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="w-full flex-none flex gap-3">
                {items
                  .slice(
                    pageIndex * itemsPerView,
                    (pageIndex + 1) * itemsPerView
                  )
                  .map((item) => (
                    <div
                      key={item.id}
                      className="w-1/2 bg-white rounded-lg shadow-md"
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <button
                          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm"
                          onClick={() => onToggleWishlist(item.id)}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              wishlist.includes(item.id)
                                ? "text-red-500 fill-current"
                                : "text-gray-600"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="p-2">
                        <h3 className="font-medium text-sm mb-1 line-clamp-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center mb-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < item.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-1 text-xs text-gray-600">
                            ({item.reviews})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">
                            ₹{item.price}
                          </span>
                          <button
                            onClick={() => alert(`Added ${item.name} to cart!`)}
                            className="bg-red-400 text-white px-2 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-xs"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 px-2 flex justify-between items-center">
          <button
            onClick={prevItems}
            className="p-2 rounded-full bg-white/80 shadow-md dark:bg-black  text-black dark:text-white"
            aria-label="Previous items"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextItems}
            className="p-2 rounded-full bg-white/80 shadow-md dark:bg-black  text-black dark:text-white"
            aria-label="Next items"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [autoRotate, setAutoRotate] = useState(true);

  const categories = [
    {
      title: "Necklaces",
      items: [
        {
          id: "n1",
          name: "Diamond Pendant",
          price: 999.99,
          rating: 4,
          reviews: 128,
          image:
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
        },
        {
          id: "n2",
          name: "Pearl Chain",
          price: 599.99,
          rating: 5,
          reviews: 85,
          image:
            "https://images.unsplash.com/photo-1599459183200-59c7687a0c70?w=400&h=400&fit=crop",
        },
        {
          id: "n3",
          name: "Gold Choker",
          price: 799.99,
          rating: 4,
          reviews: 92,
          image:
            "https://images.unsplash.com/photo-1599459183663-250638e17d6b?w=400&h=400&fit=crop",
        },
        {
          id: "n4",
          name: "Crystal Necklace",
          price: 449.99,
          rating: 4,
          reviews: 76,
          image:
            "https://images.unsplash.com/photo-1599459183737-ec9c6371b31c?w=400&h=400&fit=crop",
        },
        {
          id: "br1",
          name: "Tennis Bracelet",
          price: 1499.99,
          rating: 5,
          reviews: 164,
          image:
            "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
        },
      ],
    },
    {
      title: "Earrings",
      items: [
        {
          id: "e1",
          name: "Diamond Studs",
          price: 499.99,
          rating: 5,
          reviews: 156,
          image:
            "https://images.unsplash.com/photo-1535632787350-4e68ef2ac3c7?w=400&h=400&fit=crop",
        },
        {
          id: "e2",
          name: "Gold Hoops",
          price: 299.99,
          rating: 4,
          reviews: 94,
          image:
            "https://images.unsplash.com/photo-1589128777073-263566ae5e4c?w=400&h=400&fit=crop",
        },
        {
          id: "e3",
          name: "Pearl Drops",
          price: 249.99,
          rating: 4,
          reviews: 67,
          image:
            "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=400&h=400&fit=crop",
        },
        {
          id: "e4",
          name: "Ruby Studs",
          price: 399.99,
          rating: 5,
          reviews: 103,
          image:
            "https://images.unsplash.com/photo-1602752250015-517a06dd43e9?w=400&h=400&fit=crop",
        },
        {
          id: "br1",
          name: "Tennis Bracelet",
          price: 1499.99,
          rating: 5,
          reviews: 164,
          image:
            "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
        },
      ],
    },
  ];

  const handleToggleWishlist = (itemId) => {
    setWishlist((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <BannerProduct />
      <div className="container mx-auto px-4 sm:px-6 lg:ml-11">
        {categories.map((category, index) => (
          <JewelryCategory
            key={index}
            {...category}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
