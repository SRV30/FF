import { Route, Routes } from "react-router-dom";
import Header from "./pages/components/Header";
import Home from "./pages/components/Home";
import { ToastContainer } from "react-toastify";
import Footer from "./pages/components/Footer";
import Login from "./pages/auth-page/Login";
import ForgotPassword from "./pages/auth-page/ForgotPassword";
import ResetPassword from "./pages/auth-page/ResetPassword";

const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white dark:bg-black text-black dark:text-white">
      <ToastContainer position="top-center" />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>  
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
