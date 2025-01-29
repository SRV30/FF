import { Route, Routes } from "react-router-dom";
import Header from "./pages/components/Header";
import Home from "./pages/components/Home";
import { ToastContainer } from "react-toastify";
import Footer from "./pages/components/Footer";
import MyProfile from "./pages/my-profile/MyProfile";

const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white dark:bg-black text-black dark:text-white">
      <ToastContainer position="top-center" />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myprofile" element={<MyProfile/>} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
