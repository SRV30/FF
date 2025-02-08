import { Route, Routes } from "react-router-dom";
import Header from "./pages/components/Header";
import Home from "./pages/components/Home";
import { ToastContainer } from "react-toastify";
import Footer from "./pages/components/Footer";
import MyProfile from "./pages/my-profile/MyProfile";
import Products from "./pages/products/Products";
import About from "./pages/components/About";
import Review from "./pages/products/Review";
import Cart from "./pages/orders/Cart";
import Wishlist from "./pages/orders/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MyOrders from "./pages/my-profile/MyOrders";
import UpdatePassword from "./pages/my-profile/UpdatePassword";
import UpdateProfile from "./pages/my-profile/UpdateProfile";
import SavedAddress from "./pages/my-profile/SavedAddress";
import ContactUs from "./pages/components/ContactUs";
import OrderSuccess from "./pages/orders/OrderSuccess";
import Login from "./pages/auth-page/Login";
import ForgotPassword from "./pages/auth-page/ForgotPassword";
import ResetPassword from "./pages/auth-page/ResetPassword";
import SignUp from "./pages/auth-page/Signup";
import WhatsAppButton from "./pages/extras/Whatsapp";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import { useSelector } from "react-redux";
import ProtectedRoute from "./pages/extras/ProtectedRoute";
import ScrollToTop from "./pages/extras/ScrollToTop";
import ProductDetails from "./pages/products/SingleProduct";
import SingleUser from "./pages/admin/AdminSingleUser";
import AdminUsers from "./pages/admin/AdminUsers";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col bg-white dark:bg-black text-black dark:text-white">
      <ToastContainer position="top-center" />
      <Header />
      <WhatsAppButton />

      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-password"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-profile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-address"
          element={
            <ProtectedRoute>
              <SavedAddress />
            </ProtectedRoute>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/About" element={<About />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Review" element={<Review />} />
        <Route
          path="/OrderSuccess"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin routes */}
        {isAuthenticated && user?.role === "ADMIN" && (
          <>
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/create/product"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AdminAddProduct />
                </ProtectedRoute>
              }
            />
             <Route
              path="/admin/users"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
             <Route
              path="/admin/users/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <SingleUser />
                </ProtectedRoute>
              }
            />
          </>
        )}

        {/* 404, Restricted */}
      </Routes>

        <ScrollToTop />
      <Footer />
    </div>
  );
};

export default App;
