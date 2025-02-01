import React, { useState } from 'react';
import { X } from 'lucide-react';

const Cart = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems] = useState([
    {
      id: 1,
      name: 'Blue Shirt',
      code: '75205',
      price: 620.73,
      quantity: 1,
      image: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Stylish Shirt',
      code: '92701',
      price: 125.28,
      quantity: 1,
      image: '/api/placeholder/80/80'
    },
    {
      id: 3,
      name: 'Jeans',
      code: '75201',
      price: 327.71,
      quantity: 1,
      image: '/api/placeholder/80/80'
    }
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold">Logo</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-yellow-200">Home</a>
            <a href="#" className="hover:text-yellow-200">Collection</a>
            <a href="#" className="hover:text-yellow-200">About</a>
            <a href="#" className="hover:text-yellow-200">Contact Us</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-4 aspect-h-5">
              <img
                src="/api/placeholder/600/750"
                alt="Product"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">Men Slim Fit Relaxed Denim Jacket</h1>
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                  <span className="text-gray-400">★</span>
                  <span className="ml-2 text-gray-600">(122)</span>
                </div>
              </div>
              <div className="text-3xl font-bold">$79</div>
            </div>

            <p className="text-gray-600">
              A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
            </p>

            <div className="space-y-4">
              <h3 className="font-medium">Select Size</h3>
              <div className="flex space-x-4">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    className={`w-12 h-12 rounded-md border ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">
              ADD TO CART
            </button>

            <div className="space-y-2 text-sm text-gray-600">
              <p>100% Original product.</p>
              <p>Cash on delivery is available.</p>
              <p>Easy return and exchange policy.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Shopping Cart Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold text-yellow-600">Your cart</h2>
            <button onClick={() => setIsCartOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 mb-4 pb-4 border-b">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Code: {item.code}</p>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
                <div className="text-sm text-gray-500">x{item.quantity}</div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-gray-50">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>- ${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>Free</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="w-full border rounded-md py-2 px-3"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-500 text-white px-4 py-1 rounded">
                  Apply
                </button>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600">
                Continue to check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;