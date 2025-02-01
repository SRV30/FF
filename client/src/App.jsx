import { Route, Routes } from "react-router-dom";
import Header from "./pages/components/Header";
import Home from "./pages/components/Home";
import { ToastContainer } from "react-toastify";
import Footer from "./pages/components/Footer";

import MyProfile from "./pages/my-profile/MyProfile";


import Products from "./pages/products/Products";
import SingleProduct from "./pages/products/SingleProduct";
import Review from "./pages/products/Review";
import Cart from "./pages/orders/Cart";
import MyOrders from "./pages/my-profile/MyOrders";
import UpdatePassword from "./pages/my-profile/UpdatePassword";
import UpdateProfile from "./pages/my-profile/UpdateProfile";
import SavedAddress from "./pages/my-profile/SavedAddress";

const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white dark:bg-black text-black dark:text-white">
      <ToastContainer position="top-center" />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/my-profile" element={<MyProfile/>} />
        <Route path="/my-orders" element={<MyOrders/>} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/saved-address" element={<SavedAddress/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/singleproduct" element={<SingleProduct />} />
        <Route path="/singleproduct" element={<Review />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>

      <Footer />
    </div>
  );
};

export default App;
