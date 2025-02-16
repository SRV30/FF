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
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./pages/extras/ProtectedRoute";
import ScrollToTop from "./pages/extras/ScrollToTop";
import ProductDetails from "./pages/products/SingleProduct";
import SingleUser from "./pages/admin/AdminSingleUser";
import AdminUsers from "./pages/admin/AdminUsers";
import VerifyEmail from "./pages/auth-page/VerifyEmail";
import MyOrders from "./pages/my-profile/MyOrders";
import OrderDetails from "./pages/my-profile/OrderDetails";
import CreateOrder from "./pages/orders/Checkout";
import PaymentPage from "./pages/orders/OnlinePaymentPage";
import ProductUpdatePage from "./pages/admin/AdminUpdateProduct";
import { useEffect } from "react";
import { getCartItems } from "./store/add-to-cart/addToCart";
import { getWishListItems } from "./store/add-to-wishList/addToWishList";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
    dispatch(getWishListItems());
  }, [dispatch]);

  return (
    <div className="flex flex-col bg-white dark:bg-black text-black dark:text-white">
      <ToastContainer position="top-center" />
      {/* <DiscountHeader /> */}
      <Header />
      <WhatsAppButton />

      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />

        <Route path="/verify-email" element={<VerifyEmail />} />
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
          path="/order/:Id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CreateOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/online/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
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
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route path="/About" element={<About />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Review" element={<Review />} />

        <Route path="/signup" element={<SignUp />} />

        {/* Admin routes */}
        {isAuthenticated && user?.role === "ADMIN" && (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/create/product" element={<AdminAddProduct />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/users/:id" element={<SingleUser />} />
            <Route
              path="/admin/product/update/:id"
              element={<ProductUpdatePage />}
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
