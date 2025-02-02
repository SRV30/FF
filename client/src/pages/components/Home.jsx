import React from "react";
// import DarkModeToggle from "../extras/DarkModeToggle";

import { useState } from "react";
import {
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import DarkModeToggle from "../extras/DarkModeToggle";

const JewelryCategory = ({ title, items, onToggleWishlist, wishlist }) => (
  <div className="my-8">
    <h2 className="text-2xl font-semibold mb-4 px-4 text-black dark:text-yellow-400">
      {title}
    </h2>
    <div className="flex overflow-x-auto gap-4 px-4 pb-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex-none w-64 bg-white rounded-lg shadow-md"
        >
          <div className="relative">
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
          <div className="p-4">
            <h3 className="font-medium text-lg mb-2">{item.name}</h3>
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < item.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({item.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold">₹{item.price}</span>
              <button
                onClick={() => alert(`Added ${item.name} to cart!`)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  const banners = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=400&fit=crop",
      title: "Elegant Collection",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&h=400&fit=crop",
      title: "Wedding Season",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=1200&h=400&fit=crop",
      title: "Festival Special",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=400&fit=crop",
      title: "New Arrivals",
    },
  ];

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
    {
      title: "Rings",
      items: [
        {
          id: "r1",
          name: "Diamond Solitaire",
          price: 1999.99,
          rating: 5,
          reviews: 187,
          image:
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
        },
        {
          id: "r2",
          name: "Gold Band",
          price: 499.99,
          rating: 4,
          reviews: 94,
          image:
            "https://images.unsplash.com/photo-1602751584564-6ccb1f5c4b1e?w=400&h=400&fit=crop",
        },
        {
          id: "r3",
          name: "Pearl Ring",
          price: 299.99,
          rating: 4,
          reviews: 67,
          image:
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop",
        },
        {
          id: "r4",
          name: "Sapphire Ring",
          price: 899.99,
          rating: 5,
          reviews: 116,
          image:
            "https://images.unsplash.com/photo-1605100804606-40247e8dec38?w=400&h=400&fit=crop",
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
      title: "Bangles",
      items: [
        {
          id: "b1",
          name: "Gold Bangle Set",
          price: 1499.99,
          rating: 5,
          reviews: 112,
          image:
            "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=400&fit=crop",
        },
        {
          id: "b2",
          name: "Diamond Bangles",
          price: 2499.99,
          rating: 5,
          reviews: 94,
          image:
            "https://images.unsplash.com/photo-1602751584564-6ccb1f5c4b1e?w=400&h=400&fit=crop",
        },
        {
          id: "b3",
          name: "Pearl Bangles",
          price: 999.99,
          rating: 4,
          reviews: 78,
          image:
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop",
        },
        {
          id: "b4",
          name: "Ruby Bangles",
          price: 1799.99,
          rating: 5,
          reviews: 86,
          image:
            "https://images.unsplash.com/photo-1605100804606-40247e8dec38?w=400&h=400&fit=crop",
        },
        {
          id: "b5",
          name: "Emerald Bangles",
          price: 1999.99,
          rating: 4,
          reviews: 92,
          image:
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
        },
      ],
    },
    {
      title: "Bracelets",
      items: [
        {
          id: "br1",
          name: "Tennis Bracelet",
          price: 1499.99,
          rating: 5,
          reviews: 164,
          image:
            "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
        },
        {
          id: "br2",
          name: "Charm Bracelet",
          price: 399.99,
          rating: 4,
          reviews: 83,
          image:
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
        },
        {
          id: "br3",
          name: "Pearl String",
          price: 299.99,
          rating: 4,
          reviews: 57,
          image:
            "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&h=400&fit=crop",
        },
        {
          id: "br4",
          name: "Diamond Chain",
          price: 899.99,
          rating: 5,
          reviews: 129,
          image:
            "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&h=400&fit=crop",
        },
        {
          id: "br5",
          name: "Gold Link",
          price: 699.99,
          rating: 4,
          reviews: 91,
          image:
            "https://images.unsplash.com/photo-1602752250015-517a06dd43e9?w=400&h=400&fit=crop",
        },
      ],
    },
    {
      title: "Mangalsutra",
      items: [
        {
          id: "m1",
          name: "Traditional Design",
          price: 899.99,
          rating: 5,
          reviews: 143,
          image:
            "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&h=400&fit=crop",
        },
        {
          id: "m2",
          name: "Modern Pattern",
          price: 799.99,
          rating: 4,
          reviews: 98,
          image:
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
        },
        {
          id: "m3",
          name: "Diamond Collection",
          price: 1299.99,
          rating: 5,
          reviews: 156,
          image:
            "https://images.unsplash.com/photo-1599459183200-59c7687a0c70?w=400&h=400&fit=crop",
        },
        {
          id: "m4",
          name: "Gold Classic",
          price: 999.99,
          rating: 4,
          reviews: 112,
          image:
            "https://images.unsplash.com/photo-1599459183663-250638e17d6b?w=400&h=400&fit=crop",
        },
        {
          id: "m5",
          name: "Pearl Design",
          price: 899.99,
          rating: 4,
          reviews: 89,
          image:
            "https://images.unsplash.com/photo-1599459183737-ec9c6371b31c?w=400&h=400&fit=crop",
        },
      ],
    },
    {
      title: "Pendants",
      items: [
        {
          id: "p1",
          name: "Diamond Solitaire",
          price: 1999.99,
          rating: 5,
          reviews: 187,
          image:
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
        },
        {
          id: "p2",
          name: "Gold Cross",
          price: 499.99,
          rating: 4,
          reviews: 94,
          image:
            "https://images.unsplash.com/photo-1602751584564-6ccb1f5c4b1e?w=400&h=400&fit=crop",
        },
        {
          id: "p3",
          name: "Pearl Drop",
          price: 299.99,
          rating: 4,
          reviews: 67,
          image:
            "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop",
        },
        {
          id: "p4",
          name: "Sapphire Heart",
          price: 899.99,
          rating: 5,
          reviews: 116,
          image:
            "https://images.unsplash.com/photo-1605100804606-40247e8dec38?w=400&h=400&fit=crop",
        },
        {
          id: "p5",
          name: "Ruby Oval",
          price: 799.99,
          rating: 4,
          reviews: 93,
          image:
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
        },
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleToggleWishlist = (itemId) => {
    setWishlist((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      {/* Header Banner Slider */}
      <DarkModeToggle />
      <div className="relative w-full h-[400px] overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="w-full flex-shrink-0">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold">
                  {banner.title}
                </h1>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Category Sections */}
      <div className="container mx-auto px-4 ml-13 ">
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
