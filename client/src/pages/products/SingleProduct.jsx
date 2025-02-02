import React, { useState } from 'react';
import { Star, ShoppingCart, X, Minus, Plus, Heart } from 'lucide-react';
import Review from './Review';

const SingleProduct = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Move product data inside component
  const product = {
    id: 1,
    name: 'Men Slim Fit Relaxed Denim Jacket',
    price: 79,
    rating: 4,
    reviews: 122,
    description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/api/placeholder/600/800',
      '/api/placeholder/600/800',
      '/api/placeholder/600/800',
      '/api/placeholder/600/800',
      '/api/placeholder/600/800'
    ],
    features: [
      '100% Original product.',
      'Cash on delivery is available on this product.',
      'Easy return and exchange policy within 7 days.'
    ]
  };

  // Toggle wishlist
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Cart Functions
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to cart');
      return;
    }

    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id && item.size === selectedSize
    );

    if (existingItemIndex > -1) {
      const updatedCart = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          size: selectedSize,
          quantity: 1
        }
      ]);
    }
  };

  // Rest of the functions
  const updateQuantity = (itemId, size, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      (item.id === itemId && item.size === size) 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  const removeFromCart = (itemId, size) => {
    setCartItems(cartItems.filter(item => 
      !(item.id === itemId && item.size === size)
    ));
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const total = subtotal - discount;

  const applyCoupon = () => {
    alert(`Applying coupon: ${couponCode}`);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'fill-red-500 text-red-500' : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  // Image Modal Component
  const ImageModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="relative max-w-4xl w-full">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={product.images[selectedImage]}
            alt={`${product.name} - View ${selectedImage + 1}`}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    );
  };

  // Cart Sidebar Component
  const CartSidebar = () => {
    if (!isCartOpen) return null;

    return (
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg z-50">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4 mb-4 pb-4 border-b">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="font-medium">${item.price}</p>
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="p-1 border rounded-l"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-1 border-t border-b">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="p-1 border rounded-r"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="ml-4 text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-gray-50">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Coupon Code"
                  className="w-full border rounded-lg py-2 px-3"
                />
                <button 
                  onClick={applyCoupon}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-1 rounded"
                >
                  Apply
                </button>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Cart Toggle Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed top-4 right-4 z-40 bg-black text-white p-2 rounded-full"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="flex flex-col md:flex-row lg:flex-col gap-4 w-full lg:w-24">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border-2 rounded-lg overflow-hidden transition-all hover:opacity-80 ${
                  selectedImage === index ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 relative">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-auto"
              />
            </button>
            {/* Wishlist button */}
            <button
              onClick={toggleWishlist}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
            >
              <Heart
                className={`w-6 h-6 ${
                  isWishlisted ? 'fill-red-500 stroke-red-500' : 'stroke-gray-400'
                }`}
              />
            </button>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/3">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {renderStars(product.rating)}
              </div>
              <span className="text-gray-500">({product.reviews})</span>
            </div>

            <div className="text-3xl font-bold mb-6">${product.price}</div>

            <p className="text-gray-600 mb-6">
              {product.description}
            </p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Select Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center rounded-lg border transition-colors ${
                      selectedSize === size
                        ? 'border-red-500 text-red-500'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              ADD TO CART
            </button>

            <div className="mt-6 space-y-2">
              {product.features.map((feature, index) => (
                <p key={index} className="text-gray-600 text-sm">
                  {feature}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ImageModal />
      <CartSidebar />
      <Review/>
    </div>
  );
};

export default SingleProduct;