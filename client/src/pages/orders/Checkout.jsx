import { getCartItems } from "@/store/add-to-cart/addToCart";
import { userAddress } from "@/store/address-slice/addressSlice";
import { getSingleDetail } from "@/store/auth-slice/user";
import { createOrder } from "@/store/order-slice/order";
import { getProducts } from "@/store/product-slice/productSlice";
import { Phone } from "lucide-react";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { address } = useSelector((state) => state.address);
  const { product: products = [], loading: productLoading } = useSelector((state) => state.product);
  const { cartItems, loading: cartLoading } = useSelector((state) => state.cart);
  const { loading: orderLoading, error, success } = useSelector((state) => state.order);

  const [orderData, setOrderData] = useState({
    
    userId: "",
    addressId: "",
    products: [],
    paymentMethod: "COD",
    shipping: 50,
    gst: 18,
    totalAmount: 0,
    
  });

  // Fetch user, addresses, products, and cart items
  useEffect(() => {
    dispatch(userAddress());
    dispatch(getProducts());
    dispatch(getSingleDetail());
    dispatch(getCartItems()); // Fetch cart items when component mounts
  }, [dispatch]);

  // Set userId when user data is available
  useEffect(() => {
    if (user?._id) {
      setOrderData((prevData) => ({
        ...prevData,
        userId: user._id,
      }));
    }
  }, [user]);

  // Populate order with cart items
  useEffect(() => {
    if (cartItems.length > 0 && products.length > 0) {
      const formattedProducts = cartItems.map((item) => {
        const productDetails = products.find((p) => p._id === item.productId._id);
        return {
          product: item.productId,
          name: productDetails ? productDetails.name : "Unknown",
          quantity: item.quantity,
          price: productDetails ? productDetails.price : 0, // Ensure price comes from products
          totalPrice: item.quantity * (productDetails ? productDetails.price : 0),
        };
      });

      const totalAmount = formattedProducts.reduce((sum, item) => sum + item.totalPrice, 0) + orderData.shipping + orderData.gst;

      setOrderData((prev) => ({
        ...prev,
        products: formattedProducts,
        totalAmount,
      }));
    }
  }, [cartItems, products]); // Now updates whenever cartItems OR products change

  // Navigate on successful order creation
  
  
  
  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderData.addressId) {
      toast.error("Please select an address!");
      return;
    }
    if (orderData.totalAmount <= 0) {
      toast.error("Invalid total amount. Please check the cart.");
      return;
    }
    dispatch(createOrder(orderData));
    toast.success("Order created successfully!");
  };

  if (productLoading || orderLoading || authLoading || cartLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Order</h2>

      {error && <p className="text-red-500">{typeof error === "object" ? error.message : error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Address Selection */}
        <div>
          <label className="block text-sm font-medium">Select Address</label>
          {address.length === 0 ? (
            <p className="text-red-500">No addresses available. Please add an address to continue.</p>
          ) : (
            address.map((addr) => (
              <div key={addr._id} className="flex items-center mt-2">
                <input type="radio" name="addressId" value={addr._id} onChange={handleChange} className="mr-2" required />
                <span>{`${addr.address_line}, ${addr.city}, ${addr.state}, ${addr.pincode},`}</span>
                <span > {addr.mobile}</span>
              </div>
            ))
          )}
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium">Payment Method</label>
          <select name="paymentMethod" value={orderData.paymentMethod} onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option value="COD">Cash on Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        {/* Shipping & GST */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Shipping</label>
            <input type="number" name="shipping" value={orderData.shipping} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium">GST</label>
            <input type="number" name="gst" value={orderData.gst} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
          </div>
        </div>

        {/* Total Amount */}
        <div>
          <label className="block text-sm font-medium">Total Amount</label>
          <input type="number" name="totalAmount" value={orderData.totalAmount} className="w-full p-2 border rounded-lg" readOnly />
        </div>

        {/* Products (Pre-filled from Cart) */}
        <div>
          <label className="block text-sm font-medium">Products</label>
          {orderData.products.length > 0 ? (
            orderData.products.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mt-2">
                <input type="text" value={item.name} className="p-2 border rounded-lg bg-gray-100" readOnly />
                <input type="number" value={item.quantity} className="p-2 border rounded-lg bg-gray-100" readOnly />
                <input type="text" value={`₹${item.price}`} className="p-2 border rounded-lg bg-gray-100" readOnly />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items in cart.</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
