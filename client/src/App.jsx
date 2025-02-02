import { Route, Routes } from "react-router-dom";
import Header from "./pages/components/Header";
import Home from "./pages/components/Home";
import { ToastContainer } from "react-toastify";
import Footer from "./pages/components/Footer";
import MyProfile from "./pages/my-profile/MyProfile";
import Products from "./pages/products/Products";
import About from "./pages/components/About"
import SingleProduct from "./pages/products/SingleProduct";
import Review from "./pages/products/Review";
import Cart from "./pages/orders/Cart";
import Wishlist from "./pages/orders/Wishlist";
import ProductPostForm from "./pages/admin/ProductPostForm";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MyOrders from "./pages/my-profile/MyOrders";
import UpdatePassword from "./pages/my-profile/UpdatePassword";
import UpdateProfile from "./pages/my-profile/UpdateProfile";
import SavedAddress from "./pages/my-profile/SavedAddress";
import ContactUs from "./pages/components/ContactUs";
import Login from "./pages/auth-page/Login";
import ForgotPassword from "./pages/auth-page/ForgotPassword";
import ResetPassword from "./pages/auth-page/ResetPassword";

const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white dark:bg-black text-black dark:text-white">
      <ToastContainer position="top-center" />
      <Header />

      <Routes>
        {/* Your other components go here */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>  
        <Route path="/my-profile" element={<MyProfile/>} />
        <Route path="/my-orders" element={<MyOrders/>} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/saved-address" element={<SavedAddress/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/singleproduct" element={<SingleProduct />} />
        <Route path="/singleproduct" element={<Review />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/productpostform" element={<ProductPostForm />} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        <Route path="/About" element={<About />} />
        <Route path="/ContactUs" element={<ContactUs />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
