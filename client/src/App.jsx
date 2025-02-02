import { Route, Routes } from "react-router-dom";
import Header from "./pages/components/Header";
import Home from "./pages/components/Home";
import { ToastContainer } from "react-toastify";
import Footer from "./pages/components/Footer";
import Products from "./pages/products/Products";
import SingleProduct from "./pages/products/SingleProduct";
import Review from "./pages/products/Review";
import Cart from "./pages/orders/Cart";
import Wishlist from "./pages/orders/Wishlist";
import ProductPostForm from "./pages/admin/ProductPostForm";
import AdminDashboard from "./pages/admin/AdminDashboard";
const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white dark:bg-black text-black dark:text-white">
      <ToastContainer position="top-center" />
      <Header />

      <Routes>
        {/* Your other components go here */}

        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/singleproduct" element={<SingleProduct />} />
        <Route path="/singleproduct" element={<Review />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/productpostform" element={<ProductPostForm />} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
